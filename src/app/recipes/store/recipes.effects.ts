import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRecipesReducer from './recipes.actions';
import { map, switchMap, tap } from 'rxjs';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import * as fromRecipeActions from './recipes.actions';

@Injectable()
export class RecipeEffects {
  fatchRecipes = createEffect(() =>
    this.action$.pipe(
      ofType(fromRecipesReducer.FATCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://my-second-project-58528-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        console.log(recipes);
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients
              ? recipe.ingredients
              : (recipe.ingredients = []),
          };
        });
      }),
      map((recipes) => {
        // console.log(recipes);
        return new fromRecipeActions.SetRecipes(recipes);

        // this.recipeService.setRecipe(recipes);
      })
    )
  );

  constructor(private action$: Actions, private http: HttpClient) {}
}
