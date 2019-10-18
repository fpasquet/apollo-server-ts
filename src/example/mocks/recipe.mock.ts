import { plainToClass } from 'class-transformer';

import { Recipe } from '../types/recipe.type';

export const recipeMocks = plainToClass(Recipe, [
    {
        slug: 'recipe-1',
        creationDate: new Date('2018-04-11'),
        title: 'Recipe 1',
        description: 'Desc 1',
        ratings: [0, 3, 1],
        ingredients: ['one', 'two', 'three'],
    },
    {
        slug: 'recipe-2',
        creationDate: new Date('2018-04-15'),
        title: 'Recipe 2',
        description: 'Desc 2',
        ratings: [4, 2, 3, 1],
        ingredients: ['four', 'five', 'six'],
    },
    {
        slug: 'recipe-3',
        creationDate: new Date(),
        title: 'Recipe 3',
        description: 'Desc 3',
        ratings: [5, 4],
        ingredients: ['seven', 'eight', 'nine'],
    },
]);