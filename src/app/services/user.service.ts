import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError, of} from 'rxjs';
import { User } from '../model/user';
import { Reservation } from '../model/reservation';
import { BehaviorSubject, map } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from './token.service';


@Injectable(
  {providedIn: 'root'}
)
export class UserService {
  private baseUrl = environment.backendBaseUrl;
  constructor(private http:HttpClient, private router: Router, private tokenService: TokenService, private snackBar: MatSnackBar) { }
  
  getAllUsers(): Observable<User[]> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
     return this.http.get<User[]>(`${this.baseUrl}/users/all`, headerOptions)    
  }

 

  getUserByUserName(userName: string) : Observable<User> {
    const token = this.tokenService.getJwtToken();
    if (token != null) {
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
     return this.http.get<User>(`${this.baseUrl}/users/username/${userName}`, headerOptions).pipe(
      catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
     ) 
    }
    else {
      console.log("Token is null");
      return of(null);
    }
  }
  
  getUserById(userId:number): Observable<User> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
     return this.http.get<User>(`${this.baseUrl}/users/${userId}`, headerOptions)    
  }


  registerUser(userInfo: User): Observable<User>  {
    return this.http.post<any>(`${this.baseUrl}/users/new`, userInfo);    
    
  }

  updateUser(userId: number, updatedUser: User): Observable<string> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'text' as 'json'
    };
    return this.http.put<string>(`${this.baseUrl}/users/update/${userId}`, updatedUser, headerOptions)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      );
  }

  submitQuestionnaire(userId: number, updatedUser: User): Observable<string> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'text' as 'json'
    };
    return this.http.put<string>(`${this.baseUrl}/users/update/${userId}`, updatedUser, headerOptions)
    .pipe(
      catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );

  }

  private handleError(error: any): void {
    console.error('HTTP error occurred:', error);
    this.snackBar.open('An error occurred', 'Close', { duration: 3000 });
  }

 
}