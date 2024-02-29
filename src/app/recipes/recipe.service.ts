import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingList from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  constructor(private store: Store<fromApp.AppState>) {}

  private vadapavImage =
    'https://images.pexels.com/photos/17433337/pexels-photo-17433337/free-photo-of-mumbai-style-vada-pav.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1E'; // Replace with actual link
  private freakyImage =
    'https://d36v5spmfzyapc.cloudfront.net/wp-content/uploads/2018/03/Chicken-Frankie-Roll-848x424.jpg.webp'; // Replace with actual link
  private dabeliImage =
    'https://www.awesomecuisine.com/wp-content/uploads/2008/05/dabeli.jpg'; // Replace with actual link

  private vadapavIngredients: Ingredient[] = [
    new Ingredient('Pav (Bread Rolls)', 4),
    new Ingredient('Potatoes', 4),
    new Ingredient('Garlic Chutney', 2),
    new Ingredient('Green Chutney', 2),
    new Ingredient('Mustard Seeds', 1),
    new Ingredient('Turmeric Powder', 1),
    new Ingredient('Coriander Leaves', 2),
    new Ingredient('Vegetable Oil', 2),
    new Ingredient('Salt', 1),
  ];

  // Real-world Indian ingredients for Freaky
  private freakyIngredients: Ingredient[] = [
    new Ingredient('Maggi Noodles', 2),
    new Ingredient('Mixed Vegetables', 1),
    new Ingredient('Schezwan Sauce', 2),
    new Ingredient('Soy Sauce', 1),
    new Ingredient('Green Onions', 2),
    new Ingredient('Vegetable Oil', 2),
  ];

  // Real-world Indian ingredients for Dabeli
  private dabeliIngredients: Ingredient[] = [
    new Ingredient('Pav (Bread Rolls)', 4),
    new Ingredient('Boiled Potatoes', 4),
    new Ingredient('Dabeli Masala', 2),
    new Ingredient('Tamarind Chutney', 2),
    new Ingredient('Garlic Chutney', 2),
    new Ingredient('Roasted Peanuts', 2),
    new Ingredient('Sev', 2),
    new Ingredient('Coriander Leaves', 2),
    new Ingredient('Vegetable Oil', 2),
    new Ingredient('Salt', 1),
  ];

  // Real-world Indian recipes
  private vadapavRecipe = new Recipe(
    'Vadapav',
    'A popular street food from Mumbai, consisting of a spicy potato filling in a pav.',
    this.vadapavImage,
    this.vadapavIngredients
  );

  private freakyRecipe = new Recipe(
    'Frankie Roll',
    'A quirky and spicy twist to Maggi noodles with vegetables.',
    this.freakyImage,
    this.freakyIngredients
  );

  private dabeliRecipe = new Recipe(
    'Dabeli',
    'A flavorful and spicy Indian street food snack with a potato filling.',
    this.dabeliImage,
    this.dabeliIngredients
  );

  // Array of real-world Indian recipes
  private recipes: Recipe[] = [
    this.vadapavRecipe,
    this.freakyRecipe,
    this.dabeliRecipe,
  ];
  onRecipeChange = new Subject<Recipe[]>();
  getRecipe() {
    return this.recipes.slice();
  }
  getRecipeById(index: number) {
    return this.recipes[index];
  }
  addToShopping(ingredients: Ingredient[]) {
    // this.slService.addFromRecipe(ingredients);
    this.store.dispatch(new ShoppingList.AddIngredients(ingredients));
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.onRecipeChange.next(this.recipes);
  }
  onAddRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.onRecipeChange.next(this.recipes.slice());
  }
  onUpdateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.onRecipeChange.next(this.recipes.slice());
  }
  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.onRecipeChange.next(this.recipes);
  }
}
