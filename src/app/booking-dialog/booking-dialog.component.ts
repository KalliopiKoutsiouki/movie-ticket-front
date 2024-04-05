import { Component, OnInit, Inject, Injector } from '@angular/core';
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
  proposedTimes: Hour[] = null
  reservationConfirmed: boolean = false;
  userName: string = '';
  numberOfSeats: number = 1;
  movieDateRange: DateRange;
 
  @Output() reservationConfirmedChange = new EventEmitter<Movie>();

  constructor(
    private authService: AuthService,
    private hallHourService: HallHourService,
    private userService: UserService,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: { movie: Movie },
    public dialogRef: MatDialogRef<BookingDialogComponent>
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {
    console.log(this.movie)
    this.userName = this.authService.getCurrentUser().username;
    this.fetchHours(this.movie.hall.id);
    this.movieDateRange = this.movie.dateRange;
  }

  fetchHours(hallId: number): void {
    console.log(hallId)
    this.hallHourService.getAllHoursByHallId(hallId).subscribe(
      (hallHours: HallHour[]) => {
        this.proposedTimes = hallHours.map(hallHour => ({
          fromHour: hallHour.hour.fromHour,
          toHour: hallHour.hour.toHour,
          id: hallHour.hour.id,
          currentCapacity: hallHour.capacity
        })
        )
        console.log("Proposed Times = " + this.proposedTimes)
      },
      
      (error) => {
        console.error('Error fetching hours:', error);
      }
    );
 
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
  }


  confirmSelection(): void {
    console.log('Selected date:', this.selectedDate);
    console.log('Selected time:', this.selectedTime);
    console.log('Selected number of seats:', this.numberOfSeats)
    this.reservationConfirmed = true;
  }

  resetSelection(): void {
    this.selectedDate = null;
    this.selectedTime = null;
    this.numberOfSeats = 0;
    this.reservationConfirmed = false;
  }

  finalConfirmation(): void {
    this.createReservation().subscribe(
      (response) => {
        console.log('Reservation created:', response);
        this.reservationConfirmedChange.emit(this.movie); 
      },
      (error) => {
        console.error('Error creating reservation:', error);
      }
    );
    this.dialogRef.close();
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

  // dateFilter = (d: Date | null): boolean => {
  //   const date = d ? d.getTime() : 0;
  //   return date >= this.movieDateRange.fromDate.getTime() && date <= this.movieDateRange.toDate.getTime();
  // };

  dateFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    const date = d ? d.getTime() : 0;
    const fromDate = currentDate.getTime();
    const toDate = new Date(this.movieDateRange.toDate).getTime();
    return date >= fromDate && date <= toDate;
};

}
