import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Ingredient} from "./Ingredient";
import {Recipe} from "./Recipe";
import {logBuildStats} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  ingredientUrl = "http://localhost:8080/ingredient";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getIngredientsByRecipeId(id: number): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.ingredientUrl}/recipe?id=${id}`, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched ingredients by recipe id')),
        catchError(this.handleError<Ingredient[]>('getIngredientsByRecipeId', []))
      )
  }

  saveIngredient(recipeId: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.ingredientUrl}/save/${recipeId}/`, ingredient, this.httpOptions)
      .pipe(
        tap(_ => console.log(`saved ingredient with id=${ingredient.id}`)),
        catchError(this.handleError<Ingredient>('saveIngredient'))
      );
  }

  deleteIngredient(ingredientId: number ): Observable<any> {
    return this.http.delete(`${this.ingredientUrl}/delete/${ingredientId}`)
      .pipe(
        tap(_ => console.log(`deleted ingredient with id=${ingredientId}`)),
        catchError(this.handleError('deleteIngredient'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
