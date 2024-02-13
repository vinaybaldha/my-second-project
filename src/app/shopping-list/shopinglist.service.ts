
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  private Ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.Ingredients.slice();
  }
  addIngredient(item: Ingredient) {
    this.Ingredients.push(item);
    this.ingredientChanged.next(this.Ingredients.slice());
  }
  addFromRecipe(ingredients: Ingredient[]) {
    this.Ingredients.push(...ingredients);
    this.ingredientChanged.next(this.Ingredients.slice());
  }
}
