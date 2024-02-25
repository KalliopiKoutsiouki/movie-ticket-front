import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Router } from '@angular/router';

@Injectable(
  {providedIn: 'root'}
)
export class AuthService {
  private baseUrl = environment.backendBaseUrl;
  private headerOptions : any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  };

  constructor(private http:HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<string>(`${this.baseUrl}/auth/generateToken`, { username, password }, this.headerOptions)
      .subscribe(response => {
        const token = response;
        console.log(token);
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username, token }));
          this.router.navigate(['/home']);  ;
        }
      });
  }

  loginWithGoogle() {
    const googleLoginUrl = `${this.baseUrl}/login`;
    return this.http.get(googleLoginUrl);
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
