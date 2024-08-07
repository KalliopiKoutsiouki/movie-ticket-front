import { Component, OnInit, Inject, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Movie } from '../model/movie';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HallHourService } from '../services/hallHour.service';
import { Hour } from '../model/hour';
import { Reservation } from '../model/reservation';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Observable, switchMap } from 'rxjs';
import { ReservationService } from '../services/reservation.service';
import { Output, EventEmitter } from '@angular/core';
import { DateRange } from '../model/dateRange'
import { HallHour } from '../model/hallhour';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrl: './booking-dialog.component.css'
})
export class BookingDialogComponent implements OnInit {

  movie: Movie = null;
  selectedDate: Date | null = null;
  selectedTime: Hour | null = null;
  selectedTimeId: number | null = null;
  proposedTimes: Hour[] = null
  reservationConfirmed: boolean = false;
  userName: string = '';
  numberOfSeats: number = 1;
  movieDateRange: DateRange;
  reservation: Reservation;

  @Output() reservationConfirmedChange = new EventEmitter<Movie>();

  constructor(
    private authService: AuthService,
    private hallHourService: HallHourService,
    private userService: UserService,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: { movie: Movie, reservation: Reservation },
    public dialogRef: MatDialogRef<BookingDialogComponent>
  ) {
    this.movie = data.movie;
    this.reservation = data.reservation;
  }

  ngOnInit(): void {
    if (this.reservation) {
      this.movie = this.reservation.movie;
      const hallId = this.reservation.movie.hall.id;
      console.log(this.reservation)
      this.selectedDate = new Date(this.reservation.selectedDate);
      this.selectedTime = this.reservation.hour;
      this.selectedTimeId = this.selectedTime.id;
      this.updateCapacity(hallId);
      this.numberOfSeats = this.reservation.numberOfSeats;
      console.log(this.selectedTime)
    }
    this.userName = this.authService.getCurrentUser().username;
    this.fetchHours(this.movie.hall.id);
    this.movieDateRange = this.movie.dateRange;
  }

  fetchHours(hallId: number): void {
    console.log("inside fetch hours hallid:" + hallId)
    this.hallHourService.getAllHoursByHallIdAndMovieId(hallId, this.movie.id).subscribe(
      (hallHours: HallHour[]) => {
        console.log(hallHours)
        this.proposedTimes = hallHours.map(hallHour => ({
          fromHour: hallHour.hour.fromHour,
          toHour: hallHour.hour.toHour,
          id: hallHour.hour.id,
          currentCapacity: hallHour.capacity
        })
        )
      },
      (error) => {
        console.error('Error fetching hours:', error);
      }
    );
  }

  updateCapacity(hallId: number): void {
    this.hallHourService.getAllHoursByHallIdAndMovieId(hallId,this.movie.id).subscribe(
      (hallHours: HallHour[]) => {
        const hallHour = hallHours.find(hallHour => hallHour.hour.id === this.selectedTimeId)
        this.selectedTime.currentCapacity = hallHour.capacity;
      },
      (error) => {
        console.error('Error configuring capacity:', error);
      }
    );
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;

  }

  confirmSelection(): void {
    this.reservationConfirmed = true;
  }

  onTimeChange(selectedTimeId: number) {
    this.selectedTime = this.proposedTimes.find(time => time.id === selectedTimeId);

  }

  resetSelection(): void {
    this.selectedDate = null;
    this.selectedTime = null;
    this.selectedTimeId = null;
    this.numberOfSeats = 0;
    this.reservationConfirmed = false;
  }

  finalConfirmation(): void {
    if (this.reservation) {  // Update reservation if exists
      this.updateReservation().subscribe(
        (response) => {
          console.log('Reservation updated:', response);
          this.reservationConfirmedChange.emit(this.movie);
        },
        (error) => {
          console.error('Error updating reservation:', error);
        }
      );
    } else {
      this.createReservation().subscribe(
        (response) => {
          console.log('Reservation created:', response);
          this.reservationConfirmedChange.emit(this.movie);
        },
        (error) => {
          console.error('Error creating reservation:', error);
        }
      );

    }
    this.dialogRef.close();
  }

  updateReservation(): Observable<Reservation> {
    const formattedDate = this.formatDate(this.selectedDate);
    const updatedReservation: Reservation = {
      ...this.reservation,
      user: this.reservation.user,
      numberOfSeats: this.numberOfSeats,
      movie: this.movie,
      hour: this.selectedTime,
      selectedDate: formattedDate,
      timestamp: new Date()
    };
    return this.reservationService.updateReservation(updatedReservation);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createReservation(): Observable<Reservation> {
    return this.userService.getUserByUserName(this.userName).pipe(
      switchMap((user: User) => {
        const formattedDate = this.formatDate(this.selectedDate);
        const reservation: Reservation = {
          email_sent: false,
          user: user,
          numberOfSeats: this.numberOfSeats,
          movie: this.movie,
          hour: this.selectedTime,
          selectedDate: formattedDate,
          timestamp: new Date()
        };
        console.log("inside the modal reservation: " + reservation)
        return this.reservationService.createReservation(reservation);
      }
      ))
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  dateFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    const date = d || new Date(); 
    const fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
    
    if (this.movieDateRange && this.movieDateRange.toDate) {
        const toDate = new Date(this.movieDateRange.toDate);
        const toDateNumeric = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()).getTime();
        return date.getTime() >= fromDate && date.getTime() <= toDateNumeric;
    } else {
        return true; 
    }
};

}
