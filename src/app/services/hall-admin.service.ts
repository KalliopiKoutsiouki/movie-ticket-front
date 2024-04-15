import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment';
import { Hall } from '../model/hall';
import { AuthService } from './auth.service';
import { DateRange } from '../model/dateRange';

@Injectable({
  providedIn: 'root'
})
export class HallAdminService {
  private baseUrl = environment.backendBaseUrl;
  constructor(private http:HttpClient, private authService: AuthService) { }

  createHall(hall: Hall): Observable<Hall> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<Hall>(`${this.baseUrl}/hall/new`, hall, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllHalls(): Observable<Hall[]> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Hall[]>(`${this.baseUrl}/hall/all`, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getHallById(id: number): Observable<Hall> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Hall>(`${this.baseUrl}/hall/${id}`, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateHall(id: number, hall: Hall): Observable<Hall> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put<Hall>(`${this.baseUrl}/hall/update/${id}`, hall, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteHall(id: number): Observable<void> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete<void>(`${this.baseUrl}/hall/${id}`, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDateRangesByHall(id: number): Observable<DateRange> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<DateRange>(`${this.baseUrl}/hall/dateRanges/${id}`, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error); 
  }
}
