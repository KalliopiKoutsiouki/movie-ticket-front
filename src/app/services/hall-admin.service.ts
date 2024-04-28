import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment';
import { Hall } from '../model/hall';
import { AuthService } from './auth.service';
import { DateRange } from '../model/dateRange';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class HallAdminService {
  private baseUrl = environment.backendBaseUrl;
  constructor(private http:HttpClient, private tokenService: TokenService) { }

  createHall(hall: Hall): Observable<Hall> {
    const token = this.tokenService.getJwtToken();
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
    const token = this.tokenService.getJwtToken();
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
    const token = this.tokenService.getJwtToken();
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
    const token = this.tokenService.getJwtToken();
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
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete<void>(`${this.baseUrl}/hall/delete/${id}`, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDateRangesByHall(id: number): Observable<DateRange[]> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<DateRange[]>(`${this.baseUrl}/hall/dateRanges/${id}`, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
}

  updateDateRangePerHall(hallId: number, updatedDateRange: any): Observable<string> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.baseUrl}/hall/dateRanges/${hallId}`;
    return this.http.put<string>(url, updatedDateRange, headerOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error); 
  }
}
