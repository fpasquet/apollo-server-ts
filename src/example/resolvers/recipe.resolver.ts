import { Resolver, Query, ResolverInterface, FieldResolver, Root, Arg, Int, Mutation } from 'type-graphql';
import { plainToClass } from 'class-transformer';
import { kebabCase as slugify } from 'lodash';

import { Recipe } from '../types/recipe.type';
import { RecipeInput } from '../inputs/recipe.input';
import { recipeMocks } from '../mocks/recipe.mock';

@Resolver(of => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
    private readonly items: Recipe[] = recipeMocks;

    @Query(returns => Recipe, { nullable: true })
    recipe(@Arg('slug') slug: string): Recipe | undefined {
        return this.items.find(recipe => recipe.slug === slug);
    }

    @Query(returns => [Recipe], { description: 'Get all the recipes from around the world ' })
    recipes(): Recipe[] {
        return this.items;
    }

    @Mutation(returns => Recipe)
    addRecipe(@Arg('recipe') recipeInput: RecipeInput): Recipe {
        const recipe = plainToClass(Recipe, {
            creationDate: new Date(),
            slug: slugify(recipeInput.title),
            title: recipeInput.title,
            description: recipeInput.description,
            ingredients: recipeInput.ingredients,
            ratings: [],
        });

        this.items.push(recipe);

        return recipe;
    }

    @FieldResolver()
    ratingsCount(
        @Root() recipe: Recipe,
        @Arg('minRate', type => Int, { defaultValue: 0.0 }) minRate: number,
    ): number {
        return recipe.ratings.filter(rating => rating >= minRate).length;
    }
}