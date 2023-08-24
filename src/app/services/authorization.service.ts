import { Injectable } from '@angular/core';
import {UserLogin} from "../object-models/UserLogin";
import {UserCredentialsService} from "./user-credentials.service";
import {BehaviorSubject, tap} from "rxjs";
import {User} from "../object-models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private userCredentialService: UserCredentialsService) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

  login(user: UserLogin){
    return this.userCredentialService.login(user)
      .pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true);
          localStorage.setItem('token', response.accessToken);
        })
      );
  }

  register(user: User){
    return this.userCredentialService.register(user)
      .pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true);
          localStorage.setItem('token', response.accessToken);
        })
      );
  }
}
