import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FATCH_RECIPES = '[Recipes] Fatch Recipes';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FatchRecipes implements Action {
  readonly type: string = FATCH_RECIPES;
}

export type RecipeActions = SetRecipes;
