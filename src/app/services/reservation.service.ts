import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Reservation } from '../model/reservation';
import { environment } from '../environment';
import { BehaviorSubject, map } from 'rxjs';
import { Movie } from '../model/movie';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationConfirmed = new BehaviorSubject<boolean>(false);
  reservationConfirmed$ = this.reservationConfirmed.asObservable();
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$: Observable<Reservation[]> = this.reservationsSubject.asObservable();
  private reservationDeletedSource = new BehaviorSubject<Movie | null>(null);
  reservationDeleted$ = this.reservationDeletedSource.asObservable();
  private baseUrl = environment.backendBaseUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { 
    
  }

  setReservationConfirmed(value: boolean): void {
    this.reservationConfirmed.next(value);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<Reservation>(`${this.baseUrl}/reservation/new`, reservation, headerOptions).pipe(
      map(newReservation => {
        const currentReservations = this.reservationsSubject.getValue();
        const updatedReservations = [...currentReservations, newReservation];
        this.reservationsSubject.next(updatedReservations);
        return newReservation;
      })
    );
  }

  checkingIn(movieId: number): Observable<Reservation[]> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservation/checking-in/${movieId}`, headerOptions)    
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<Reservation>(`${this.baseUrl}/reservation/update`, reservation, headerOptions).pipe(
      map(newReservation => {
        const currentReservations = this.reservationsSubject.getValue();
        const updatedReservations = [...currentReservations, newReservation];
        this.reservationsSubject.next(updatedReservations);
        return newReservation;
      })
    );
  }

  updateReservationToChecked(reservation: Reservation): void {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
      this.http.post<Reservation>(`${this.baseUrl}/reservation/checkinReservation`, reservation, headerOptions) .subscribe(
        updatedReservation => {
          // Do something with the updated reservation if needed
          console.log('Reservation updated successfully:', updatedReservation);
        },
        error => {
          console.error('Error updating reservation:', error);
        }
      )
  }

  deleteReservation(reservation : Reservation): Observable<void> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    
    };
    return this.http.delete<void>(`${this.baseUrl}/reservation/delete/${reservation.id}`, headerOptions).pipe(
      map(() => {
        const currentReservations = this.reservationsSubject.getValue();
        const updatedReservations = currentReservations.filter(res => !(res.id === reservation.id));
        this.reservationsSubject.next(updatedReservations);
        this.reservationDeletedSource.next(reservation.movie);
      })
    );
  }


  getUserReservations(): Observable<Reservation[]> {
    const token = this.tokenService.getJwtToken();
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
