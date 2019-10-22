import { DataSource } from 'apollo-datasource';
import { plainToClass } from 'class-transformer';
import kebabCase from 'lodash/kebabCase';

import { Movie } from '../types/movie.type';
import { moviesMock } from '../mocks/movie.mock';

export class MovieMockDataSource extends DataSource {
    private readonly movies: any[] = moviesMock;

    resolve<TResult = any>(data): Promise<TResult> {
        data = plainToClass(Movie, data);
        console.log(data);
        return new Promise(resolve => resolve(data));
    }

    getMovies(): Promise<Movie[]> {
        return this.resolve(this.movies);
    }

    findOneBySlug(slug: string): Promise<Movie | undefined> {
        return this.resolve(this.movies.find(item => item.slug === slug));
    }

    addMovie(movie: any): Promise<Movie> {
        if (!movie.id) {
            movie.id = this.movies[this.movies.length - 1].id + 1;
        }
        movie.slug = kebabCase(movie.title);
        movie.ratings = [];

        return this.resolve(movie);
    }
}
