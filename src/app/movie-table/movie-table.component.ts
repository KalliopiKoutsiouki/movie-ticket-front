import { Component, Input, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { Movie } from '../model/movie';

import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrl: './movie-table.component.css'
})
export class MovieTableComponent implements OnInit {

  @Input() movies: any[] = [];
  @Input() type: 'currentMovies' | 'upcomingMovies';
  isLoggedIn: boolean = false;
  disableButton: boolean = true;

  constructor( private authService: AuthService, private reservationService: ReservationService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
}

  openModal(movie:Movie): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '350px',
      data: { movie: movie } 
    });

    dialogRef.componentInstance.reservationConfirmedChange.subscribe(
      (updatedMovie: Movie) => {
        const index = this.movies.findIndex(m => m.id === updatedMovie.id);
        if (index !== -1) {
          this.movies[index].bookedForUser = true;
        }
      }
    );

     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  }


