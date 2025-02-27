import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { LoginDTO, RegisterDTO, User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBootUrl = 'http://localhost:8080';
  id : any;

  constructor(private router: Router, private http: HttpClient) {}

  login(loginData: LoginDTO) {
    console.log('auth service.ts', loginData);
   return this.http.post(
    "/auth/users/login",
    loginData,
   );
  }

  register(registerData: RegisterDTO) {
    this.http.post(
      "/auth/users/",
      registerData,
   ).subscribe()
    this.router.navigateByUrl("/");
  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.springBootUrl}/auth/users/`);
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }
}
