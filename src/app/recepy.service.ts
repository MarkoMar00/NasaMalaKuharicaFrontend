import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Recepy} from "./Recepy";

@Injectable({
  providedIn: 'root'
})
export class RecepyService {

  recepyUrl = "http://localhost:8080/recepy";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getRecepyById(id: number): Observable<Recepy> {
    return this.http.get<Recepy>(`${this.recepyUrl}/?id=${id}`, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched recepy by id')),
        catchError(this.handleError<Recepy>('getRecepyById'))
      );
  }

  getAllRecepies(): Observable<Recepy[]> {
    return this.http.get<Recepy[]>(`${this.recepyUrl}/all`)
      .pipe(
        tap(_ => console.log('fetched all recepies')),
        catchError(this.handleError<Recepy[]>('getAllRecepies', []))
      );
  }

  getAllRecepiesFromUser(userId: number): Observable<Recepy[]> {
    return this.http.get<Recepy[]>(`${this.recepyUrl}/user?id=${userId}`)
      .pipe(
        tap(_ => console.log('fetched recepies from user')),
        catchError(this.handleError<Recepy[]>('getAllRecepiesFromUser', []))
      );
  }

  getAllRecepiesWithName(name: string): Observable<Recepy[]> {
    return this.http.get<Recepy[]>(`${this.recepyUrl}/name?id=${name}`)
      .pipe(
        tap(_ => console.log(`fetched recepies with name=${name}`)),
        catchError(this.handleError<Recepy[]>('getAllRecepiesWithName', []))
      );
  }

  saveRecepy(userId: number, recepy: Recepy): Observable<Recepy> {
    return this.http.post<Recepy>(`${this.recepyUrl}/save/${userId}/`, recepy, this.httpOptions)
      .pipe(
        tap(_ => console.log(`saved recepy with id=${recepy.id}`)),
        catchError(this.handleError<Recepy>('saveRecepy'))
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
