import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  id!: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) {
    this.recipe = {} as Recipe;
  }
  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store
            .select('recipes')
            .pipe(map((recipesStore) => recipesStore.recipes));
        })
      )
      .subscribe((recipes) => {
        // this.id = +param['id'];
        // this.recipe = this.recipeService.getRecipeById(this.id);
        this.recipe = recipes.find((recipe, index) => {
          return (this.id = index);
        });
      });
  }
  onAddToShopping() {
    this.recipeService.addToShopping(this.recipe.ingredients);
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
