import { Resolver, Query, Arg } from 'type-graphql';

@Resolver()
export class ExampleResolver {
    @Query(returns => String)
    hello(@Arg('name', { nullable: true }) name: string = 'world'): string {
        return `Hello ${name}!`;
    }
}
