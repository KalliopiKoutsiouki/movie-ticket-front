import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from '../model/reservation';
import { Hour } from '../model/hour';
import { Movie } from '../model/movie';
import { ReservationService } from '../services/reservation.service';
import { tap, Subscription } from 'rxjs';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrl: './reservation-table.component.css'
})
export class ReservationTableComponent implements OnInit{

  reservations: Reservation[] = [];
  private reservationsSubscription: Subscription;
  // @Output() reservationDeleted = new EventEmitter<Movie>();

  constructor(
    private reservationService: ReservationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchUserReservations();
  }

  ngOnDestroy(): void {
    this.reservationsSubscription.unsubscribe();
  }

  editReservation(reservation: Reservation): void {
    console.log(reservation)
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      data: { reservation: reservation }
    });

    dialogRef.componentInstance.reservationConfirmedChange.subscribe((movie: Movie) => {
      this.fetchUserReservations();
    });
  }

  deleteReservation(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.deleteReservation(reservation).subscribe(
          () => {
            console.log('Reservation deleted successfully');
            this.fetchUserReservations();
            // this.reservationDeleted.emit(reservation.movie); 
          },
          error => {
            console.error('Error deleting reservation:', error);
          }
        );
      }
    });
    
  }

  fetchUserReservations() : void {
    this.reservationsSubscription = this.reservationService.reservations$.subscribe(
      reservations => {
        this.reservations = reservations;
      },
      error => {
        console.error('Error fetching user reservations:', error);
      }
    );
    this.reservationService.getUserReservations()
    .pipe(
      tap((reservations: Reservation[]) => {
        this.reservations = reservations
      })
    )
    .subscribe();
    // this.reservationService.getUserReservations().subscribe();
  }

}
