import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Recipe} from "./Recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeUrl = "http://localhost:8080/recipe";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipeUrl}/?id=${id}`, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched recepy by id')),
        catchError(this.handleError<Recipe>('getRecepyById'))
      );
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.recipeUrl}/all`)
      .pipe(
        tap(_ => console.log('fetched all recepies')),
        catchError(this.handleError<Recipe[]>('getAllRecepies', []))
      );
  }

  getAllRecipesFromUser(userId: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.recipeUrl}/user?id=${userId}`)
      .pipe(
        tap(_ => console.log('fetched recepies from user')),
        catchError(this.handleError<Recipe[]>('getAllRecepiesFromUser', []))
      );
  }

  getAllRecipesWithName(name: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.recipeUrl}/name?id=${name}`)
      .pipe(
        tap(_ => console.log(`fetched recepies with name=${name}`)),
        catchError(this.handleError<Recipe[]>('getAllRecepiesWithName', []))
      );
  }

  saveRecipe(userId: number, recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.recipeUrl}/save/${userId}/`, recipe, this.httpOptions)
      .pipe(
        tap(_ => console.log(`saved recepy with id=${recipe.id}`)),
        catchError(this.handleError<Recipe>('saveRecepy'))
      );
  }

  updateRecipe(recipeId: number, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.recipeUrl}/update/${recipeId}`, recipe, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated recepy with id=${recipe.id}`)),
        catchError(this.handleError<Recipe>('updateRecipe'))
      );
  }

  deleteRecipe(recipeId: number): Observable<any> {
    return this.http.delete(`${this.recipeUrl}/delete/${recipeId}`)
      .pipe(
        tap(_ => console.log(`deleted recipe with id=${recipeId}`)),
        catchError(this.handleError('deleteRecipe'))
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
