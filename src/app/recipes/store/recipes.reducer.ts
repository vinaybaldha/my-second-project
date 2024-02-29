import { Recipe } from '../recipe.model';
import * as fromRecipeActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: null,
};

export function RecipesReducer(
  state = initialState,
  action: fromRecipeActions.RecipeActions
): State {
  switch (action.type) {
    case fromRecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
}
