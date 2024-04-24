import { Component, OnInit } from '@angular/core';
import { Hall } from '../model/hall';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { UserRoleService } from '../services/user-role.service';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movies.service';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrl: './checker.component.css'
})
export class CheckerComponent implements OnInit{
  users: User[] = [];
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  selectedUsers: number[] = []; 
  currentDate: Date = new Date();

  constructor(
    private userService: UserService, 
    private userRoleService: UserRoleService, 
    private movieService: MovieService) { }

    ngOnInit(): void {
      this.loadMovies()
      // this.loadUsers(this.selectedMovie);
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
        this.userService.checkingIn(this.selectedMovie.id).subscribe(
          users => {
            this.users = users;
            console.log("Users after calling checkingIn():", this.users);
          },
          error => {
            console.error('Error loading users:', error);
          }
        );
    }
  }

    onCheckboxChange(userId: number) {
      const index = this.selectedUsers.indexOf(userId);
      if (index === -1) {
        // If user ID is not already in the list, add it
        this.selectedUsers.push(userId);
      } else {
        // If user ID is already in the list, remove it
        this.selectedUsers.splice(index, 1);
      }
      console.log(this.selectedUsers); // Output the list of selected user IDs
    }
}
