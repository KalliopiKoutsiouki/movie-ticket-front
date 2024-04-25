import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movies.service';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../model/reservation';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrl: './checker.component.css'
})
export class CheckerComponent implements OnInit{
  reservations: Reservation[] = [];
  users: User[] = [];
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  currentDate: Date = new Date();

  constructor(
    private reservationService: ReservationService,
    private movieService: MovieService) { }

    ngOnInit(): void {
      this.loadMovies()
    }


    private loadMovies() {
      this.movieService.fetchNowMovies().subscribe(
        movies => {
          this.movies = movies;
        },
        error => {
          console.error('Error loading movies:', error);
        }
      );

    }

    onMovieSelectionChange() {
      if (this.selectedMovie) {
        this.reservationService.checkingIn(this.selectedMovie.id).subscribe(
          reservations => {
            this.reservations = reservations;
          },
          error => {
            console.error('Error loading users:', error);
          }
        );
    }
  }

    onCheckboxChange(reservation: Reservation) {
      if (reservation.checked) {
        reservation.checked = false;
      } else {
      reservation.checked = true;
    }
      this.reservationService.updateReservationToChecked(reservation);
    }
}
