
import { InputType, Field } from 'type-graphql';
import { MaxLength, Length } from 'class-validator';
import { Movie } from '../types/movie.type';

@InputType()
export class MovieInput implements Partial<Movie> {
    @Field()
    releaseDate: Date;

    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @Length(30, 255)
    summary?: string;

    @Field(type => String)
    posterPath: string;
}