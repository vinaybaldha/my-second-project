import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  @Output() itemWasClicked = new EventEmitter<Recipe>();
  @Input() recipes: Recipe[] = [
    new Recipe(
      'test recipe',
      'this is only for test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    ),
    new Recipe(
      'test recipe 2',
      'this is only for test 2',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    ),
  ];
  onItemWasClick(recipe: Recipe) {
    this.itemWasClicked.emit(recipe);
  }
}
