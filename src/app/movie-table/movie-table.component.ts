import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { Movie } from '../model/movie';
import { Subscription } from 'rxjs';
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
  disableButton: boolean = false;
  private reservationDeletedSubscription: Subscription;
  constructor(private authService: AuthService, public dialog: MatDialog, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.reservationDeletedSubscription = this.reservationService.reservationDeleted$.subscribe(
      deletedMovie => {
        const index = this.movies.findIndex(m => m.id === deletedMovie.id);
        console.log("inside subscription")
        if (index !== -1) {
          this.movies[index].bookedForUser = false;
        }
      }
    );
  }

  openModal(movie: Movie): void {
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


