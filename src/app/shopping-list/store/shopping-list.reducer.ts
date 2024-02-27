import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIndex: number;
}
export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIndex: -1,
};
export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...(action.payload as Ingredient[]),
        ],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIndex];
      const updatedIngredient = {
        ...ingredient,
        ...(action.payload as Ingredient),
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIndex: -1,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== state.editedIndex;
        }),
        editedIngredient: null,
        editedIndex: -1,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIndex: action.payload,
        editedIngredient: {
          ...state.ingredients[action.payload as number],
        },
      };
    case ShoppingListActions.END_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIndex: -1,
      };
    default:
      return {
        ...state,
      };
  }
}
