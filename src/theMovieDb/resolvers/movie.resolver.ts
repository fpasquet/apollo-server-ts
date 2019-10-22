import { Resolver, Query, ResolverInterface, FieldResolver, Root, Arg, Int, Mutation, Ctx } from 'type-graphql';

import { Movie } from '../types/movie.type';
import { MovieInput } from '../inputs/movie.input';

import { GraphQLContext } from '../../graphql.context';

@Resolver(of => Movie)
export class MovieResolver implements ResolverInterface<Movie> {

    @Query(returns => Movie, { nullable: true })
    movie(
        @Arg('slug') slug: string,
        @Ctx() { dataSources: { movieMockDataSource } }: GraphQLContext
    ): Promise<Movie> {
        return movieMockDataSource.findOneBySlug(slug);
    }

    @Query(returns => [Movie], {
        description: 'Get all the movies from around the world'
    })
    movies(@Ctx() { dataSources: { movieMockDataSource } }: GraphQLContext): Promise<Movie[]> {
        return movieMockDataSource.getMovies();
    }

    @Mutation(returns => Movie)
    addMovie(
        @Arg('movie') movieInput: MovieInput,
        @Ctx() { dataSources: { movieMockDataSource } }: GraphQLContext
    ): Promise<Movie> {
        return movieMockDataSource.addMovie(movieInput);
    }

    @FieldResolver()
    posterPath(@Root() movie: Movie) {
        return `https://image.tmdb.org/t/p/w185${movie.posterPath}`;
    }

    @FieldResolver()
    ratingsCount(
        @Root() movie: Movie,
        @Arg('minRate', type => Int, { defaultValue: 0.0 }) minRate: number
    ): number {
        return movie.ratings.filter(rating => rating >= minRate).length;
    }

}