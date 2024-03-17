import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class UserService {
  private baseUrl = environment.backendBaseUrl;

  constructor(private http:HttpClient, private router: Router, private authService: AuthService) { }
 

  getAllUsers(): Observable<User[]> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
     return this.http.get<User[]>(`${this.baseUrl}/users/all`, headerOptions)    
  }

  getUserByUserName(userName: string) : Observable<User> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
     return this.http.get<User>(`${this.baseUrl}/users/username/${userName}`, headerOptions)    
  }
  
  
  getUserById(userId:number): Observable<User> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
     return this.http.get<User>(`${this.baseUrl}/users/${userId}`, headerOptions)    
  }

}