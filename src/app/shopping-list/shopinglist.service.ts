import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startEdit = new Subject<number>();
  private Ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.Ingredients.slice();
  }
  getIngredient(index: number) {
    return this.Ingredients[index];
  }
  addIngredient(item: Ingredient) {
    this.Ingredients.push(item);
    this.ingredientChanged.next(this.Ingredients.slice());
  }
  addFromRecipe(ingredients: Ingredient[]) {
    this.Ingredients.push(...ingredients);

    this.ingredientChanged.next(this.Ingredients.slice());
  }
  updateIngredient(index: number, ingredient: Ingredient) {
    this.Ingredients[index] = ingredient;
    this.ingredientChanged.next(this.Ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.Ingredients.splice(index, 1);
    this.ingredientChanged.next(this.Ingredients.slice());
  }
}
