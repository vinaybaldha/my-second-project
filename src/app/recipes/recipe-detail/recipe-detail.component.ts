import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';
import * as fromRecipeActions from '../store/recipes.actions';

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
          // console.log(recipe);
          // console.log(this.id, index, recipe);
          // console.log(this.id == index);
          return this.id == index;
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
    console.log(this.id);
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(+this.id));
    this.router.navigate(['/recipes']);
  }
}
