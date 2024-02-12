import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();
  private Ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.Ingredients.slice();
  }
  addIngredient(item: Ingredient) {
    this.Ingredients.push(item);
    this.ingredientChanged.emit(this.Ingredients.slice());
  }
  addFromRecipe(ingredients: Ingredient[]) {
    this.Ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.Ingredients.slice());
  }
}
