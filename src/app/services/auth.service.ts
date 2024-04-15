import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class AuthService {
  private baseUrl = environment.backendBaseUrl;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private headerOptions : any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  };
  errorMessageSubject: Subject<string> = new Subject<string>();

  // private tokenUrl = 'https://oauth2.googleapis.com/token';
  // private clientId = '409672159858-77ue31tdiduh4r0ap8o1vb1moud74p9r.apps.googleusercontent.com';
  // private clientSecret = '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';
  // private redirectUri = 'http://localhost:4200/home/login/oauth2/code/google';

  constructor(private http:HttpClient, private router: Router, 
    private snackBar: MatSnackBar,) {
    this.checkToken(); 
  }

  login(username: string, password: string) {
    return this.http.post<string>(`${this.baseUrl}/auth/generateToken`, { username, password }, this.headerOptions)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `Invalid credentials, please try again`;
        this.errorMessageSubject.next(errorMessage);
        return throwError(errorMessage);
      }),
    )
      .subscribe(response => {
        const token = response;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username, token }));
          localStorage.setItem('userName', username);
          this.loggedIn.next(true);
          this.router.navigate(['/home']);
        }
      });
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private checkToken() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.loggedIn.next(true);
    }
  }


 getGoogleToken(code:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/callback?code="` + code, {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })});
    // const params = new URLSearchParams();
    // params.set('code', code);
    // params.set('client_id', this.clientId);
    // params.set('client_secret', this.clientSecret);
    // params.set('redirect_uri', this.redirectUri);
    // params.set('grant_type', 'authorization_code');
    // console.log(params.toString())
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });

    // return this.http.post(this.tokenUrl, params.toString(), { headers });
  }

  setAccessToken(token: string, username: string) {
    localStorage.setItem('currentUser', JSON.stringify({ username, token }));
  }

  getJwtToken():string | null {
   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   const token = currentUser ? currentUser.token : null;
   return token;

  }

  loginUrlForGoogle() {
    const googleLoginUrl = `${this.baseUrl}/auth/url`;
    return this.http.get(googleLoginUrl)
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }
}
