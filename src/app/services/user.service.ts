import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { User } from '../model/user';
import { Reservation } from '../model/reservation';
import { BehaviorSubject, map } from 'rxjs';


@Injectable(
  {providedIn: 'root'}
)
export class UserService {
  private baseUrl = environment.backendBaseUrl;
  constructor(private http:HttpClient, private router: Router, private authService: AuthService) { }
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$: Observable<Reservation[]> = this.reservationsSubject.asObservable();

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


  registerUser(userInfo: User): Observable<User>  {
    return this.http.post<any>(`${this.baseUrl}/users/new`, userInfo);    
    
  }

  getUserReservations(): Observable<Reservation[]> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const userName = localStorage.getItem('userName');
    console.log(userName)
    return this.http.get<Reservation[]>(`${this.baseUrl}/users/reservations/${userName}`, headerOptions).pipe(
      map(reservations => {
        this.reservationsSubject.next(reservations);
        return reservations;
      })
    );
  }
}