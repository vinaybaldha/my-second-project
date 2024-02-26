import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)],
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
      const ingredient =
        state.ingredients[
          (action.payload as { index: number; ingredient: Ingredient }).index
        ];
      const updatedIngredient = {
        ...ingredient,
        ...(action.payload as { index: number; ingredient: Ingredient })
          .ingredient,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[
        (action.payload as { index: number; ingredient: Ingredient }).index
      ] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== (action.payload as { index: number }).index;
        }),
      };
    default:
      return {
        ...state,
      };
  }
}
