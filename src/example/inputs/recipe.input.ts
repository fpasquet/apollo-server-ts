

import { InputType, Field } from 'type-graphql';
import { MaxLength, Length } from 'class-validator';
import { Recipe } from '../types/recipe.type';

@InputType()
export class RecipeInput implements Partial<Recipe> {
    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @Length(30, 255)
    description?: string;

    @Field(type => [String])
    ingredients: string[];
}