import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRecipesReducer from './recipes.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import * as fromRecipeActions from './recipes.actions';
import { Store } from '@ngrx/store';
import * as fromAppReducers from '../../store/app.reducer';

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
        // console.log(recipes);
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

  storeRecipes = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromRecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipeState]) => {
          return this.http.put(
            'https://my-second-project-58528-default-rtdb.firebaseio.com/recipes.json',
            recipeState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<fromAppReducers.AppState>
  ) {}
}
