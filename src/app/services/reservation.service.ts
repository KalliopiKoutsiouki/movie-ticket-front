import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Reservation } from '../model/reservation';
import { environment } from '../environment';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _reservationConfirmed = new BehaviorSubject<boolean>(false);
  reservationConfirmed$ = this._reservationConfirmed.asObservable();
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$: Observable<Reservation[]> = this.reservationsSubject.asObservable();

  private baseUrl = environment.backendBaseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  setReservationConfirmed(value: boolean): void {
    this._reservationConfirmed.next(value);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    console.log(reservation);
    return this.http.post<Reservation>(`${this.baseUrl}/reservation/new`, reservation, headerOptions).pipe(
      map(newReservation => {
        const currentReservations = this.reservationsSubject.getValue();
        const updatedReservations = [...currentReservations, newReservation];
        console.log('Updated Reservations:', updatedReservations);  // Debugging
        this.reservationsSubject.next(updatedReservations);
        return newReservation;
      })
    );
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
