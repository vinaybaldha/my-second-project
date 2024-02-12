import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopinglist.service';
@Injectable()
export class RecipeService {
  constructor(private slService: ShoppingListService) {}
  ingredient1 = new Ingredient('Basmati Rice', 2);
  ingredient2 = new Ingredient('Chicken', 500);
  ingredient3 = new Ingredient('Onions', 2);
  ingredient4 = new Ingredient('Tomatoes', 3);
  ingredient5 = new Ingredient('Ginger', 1);
  ingredient6 = new Ingredient('Garlic', 5);
  ingredient7 = new Ingredient('Cumin Seeds', 1);
  ingredient8 = new Ingredient('Coriander Powder', 1);
  ingredient9 = new Ingredient('Turmeric Powder', 1);
  ingredient10 = new Ingredient('Chili Powder', 1);
  ingredient11 = new Ingredient('Garam Masala', 1);
  ingredient12 = new Ingredient('Vegetable Oil', 2);
  ingredient13 = new Ingredient('Salt', 1);
  ingredient14 = new Ingredient('Fresh Coriander Leaves', 2);

  // Real-world Indian recipes
  recipe1 = new Recipe(
    'Chicken Biryani',
    'A fragrant and flavorful Indian rice dish.',
    'https://www.thespruceeats.com/thmb/XDBL9gA6A6nYWUdsRZ3QwH084rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg',
    [
      this.ingredient1,
      this.ingredient2,
      this.ingredient3,
      this.ingredient4,
      this.ingredient5,
      this.ingredient6,
      this.ingredient7,
      this.ingredient8,
      this.ingredient9,
      this.ingredient10,
      this.ingredient11,
      this.ingredient12,
      this.ingredient13,
      this.ingredient14,
    ]
  );

  recipe2 = new Recipe(
    'Paneer Tikka Masala',
    'A popular vegetarian Indian dish.',
    'https://cookingfromheart.com/wp-content/uploads/2017/03/Paneer-Tikka-Masala-4.jpg',
    [
      this.ingredient2,
      this.ingredient3,
      this.ingredient4,
      this.ingredient5,
      this.ingredient6,
      this.ingredient7,
      this.ingredient8,
      this.ingredient9,
      this.ingredient10,
      this.ingredient11,
      this.ingredient12,
      this.ingredient13,
      this.ingredient14,
    ]
  );

  recipe3 = new Recipe(
    'Vegetable Biryani',
    'A delicious and aromatic Indian rice dish.',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Vegetable-Biryani-With-Green-Raita-159c15d.jpg?quality=90&resize=556,505',
    [
      this.ingredient1,
      this.ingredient3,
      this.ingredient4,
      this.ingredient5,
      this.ingredient6,
      this.ingredient7,
      this.ingredient8,
      this.ingredient9,
      this.ingredient10,
      this.ingredient11,
      this.ingredient12,
      this.ingredient13,
      this.ingredient14,
    ]
  );

  // Array of real-world Indian recipes
  recipes: Recipe[] = [this.recipe1, this.recipe2, this.recipe3];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'test recipe',
  //     'this is only for test',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     []
  //   ),
  //   new Recipe(
  //     'test recipe 2',
  //     'this is only for test 2',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     []
  //   ),
  // ];

  itemSlected = new EventEmitter<Recipe>();

  getRecipe() {
    return this.recipes.slice();
  }
  addToShopping(ingredients: Ingredient[]) {
    this.slService.addFromRecipe(ingredients);
  }
}
