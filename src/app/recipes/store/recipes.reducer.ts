import { Recipe } from '../recipe.model';
import * as fromRecipeActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function RecipesReducer(
  state = initialState,
  action: fromRecipeActions.RecipeActions
): State {
  switch (action.type) {
    case fromRecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: (action as fromRecipeActions.SetRecipes).payload,
      };

    case fromRecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes,
          (action as fromRecipeActions.AddRecipe).payload,
        ],
      };

    case fromRecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[
          (action as fromRecipeActions.UpdateRecipe).payload.index
        ],
        ...(action as fromRecipeActions.UpdateRecipe).payload.recipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[(action as fromRecipeActions.UpdateRecipe).payload.index] =
        updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes,
      };

    case fromRecipeActions.DELETE_RECIPE:
      const deleteIndex = (action as fromRecipeActions.DeleteRecipe).payload;
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== deleteIndex;
        }),
      };
    default:
      return state;
  }
}
