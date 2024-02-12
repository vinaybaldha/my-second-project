import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number | undefined;

  constructor(private recipeService: RecipeService) {
    this.recipe = {} as Recipe; // You can initialize with a default value or an empty object
  }
}
