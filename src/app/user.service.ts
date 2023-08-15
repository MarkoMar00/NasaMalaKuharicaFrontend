import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "./User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = "http://localhost:8080/user";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/all`)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/?username=${username}`, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched student by username')),
        catchError(this.handleError<User>('getUserByUsername'))
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
