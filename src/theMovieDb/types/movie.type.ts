import { ObjectType, Field, ID, Int, Float, Authorized } from 'type-graphql';

@ObjectType({ description: 'Object representing movie' })
export class Movie {
    @Field(type => ID)
    id: number;

    @Field()
    releaseDate: Date;

    @Field()
    slug: string;

    @Field()
    title: string;

    @Field(type => String, { nullable: true, deprecationReason: 'Use `summary` field instead' })
    get overview(): string | undefined {
        return this.summary;
    }

    @Field({ nullable: true, description: 'The movie summary' })
    summary?: string;

    @Field(type => String, { nullable: true })
    posterPath?: string;

    @Field(type => [Int])
    ratings: number[];

    @Field(type => Int)
    ratingsCount: number;

    @Field(type => Float, { nullable: true })
    get averageRating(): number | null {
        const ratingsCount = this.ratings.length;
        if (ratingsCount === 0) {
            return null;
        }
        const ratingsSum = this.ratings.reduce((a, b) => a + b, 0);
        return ratingsSum / ratingsCount;
    }
}