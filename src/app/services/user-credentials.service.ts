import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserLogin} from "../object-models/UserLogin";
import {User} from "../object-models/User";

@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService {

  apiUrl = "http://localhost:8080/api/auth";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  login(user: UserLogin) {
    return this.http.post(`${this.apiUrl}/login`, user, this.httpOptions);
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user, this.httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
