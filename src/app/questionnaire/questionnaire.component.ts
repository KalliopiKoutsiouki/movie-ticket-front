import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MovieService } from '../services/movies.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  movies: any[] = [];
  user: User;
  isLoggedIn: boolean = false;
  selectedMovieId: number | null = null;
  hasKids: number | null = null;

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.movieService.fetchMoviesForQuestionnaire().subscribe(movies => {
      this.movies = movies;
    });
  }

  submitQuestionnaire(): void {
    if (this.selectedMovieId !== null && this.hasKids !== null) {
      const userName = localStorage.getItem("userName");
      if (userName) {
        this.userService.getUserByUserName(userName).subscribe(user => {
          this.user = user;
          this.user.hasKids = this.hasKids;

          this.movieService.fetchMovieById(this.selectedMovieId).subscribe(movie => {
            this.user.chosenMovie = movie;

            this.userService.submitQuestionnaire(this.user.id, this.user).subscribe(() => {
              this.snackBar.open('Questionnaire submitted successfully', 'Close', { duration: 3000 });
              this.router.navigate(['/home']);
            }, error => {
              console.error('Error submitting questionnaire:', error);
              this.snackBar.open('Failed to submit questionnaire', 'Close', { duration: 3000 });
            });
          }, error => {
            console.error('Error fetching movie:', error);
            this.snackBar.open('Failed to load movie data', 'Close', { duration: 3000 });
          });
        }, error => {
          console.error('Error fetching user:', error);
          this.snackBar.open('Failed to load user data', 'Close', { duration: 3000 });
        });
      }
    }
  }

  skipQuestionnaire(): void {
    this.router.navigate(['/home']);
  }
}
