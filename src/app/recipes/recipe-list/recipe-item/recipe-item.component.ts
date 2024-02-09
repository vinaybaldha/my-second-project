import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Output() itemHasClicked = new EventEmitter<Recipe>();
  @Input() recipe: Recipe;
  constructor() {
    this.recipe = {} as Recipe; // You can initialize with a default value or an empty object
  }
  onItemClick() {
    this.itemHasClicked.emit();
  }
}
