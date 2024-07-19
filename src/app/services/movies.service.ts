import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../environment';
import { Movie } from '../model/movie';
import { TokenService } from './token.service';

@Injectable(
    {providedIn: 'root'}
  )
  export class MovieService {
    private baseUrl = environment.backendBaseUrl;
    constructor(private http:HttpClient, private tokenService: TokenService) { }

    getAllMovies(): Observable<Movie[]> {
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          })
        };
         return this.http.get<Movie[]>(`${this.baseUrl}/movies/all`, headerOptions)    
      }

      fetchCurrentMovies(userId: number): Observable<Movie[]> {
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
         return this.http.get<Movie[]>(`${this.baseUrl}/movies/currentMovies/${userId}`, headerOptions)    
      }

      fetchUpcomingMovies(userId: number): Observable<Movie[]> {
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
         return this.http.get<Movie[]>(`${this.baseUrl}/movies/upcomingMovies/${userId}`, headerOptions)    
      }

      fetchNowMovies(): Observable<Movie[]> {
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
         return this.http.get<Movie[]>(`${this.baseUrl}/movies/playing-now`, headerOptions)    
      }

      fetchMoviesForQuestionnaire(): Observable<Movie[]> {
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          })
        };
         return this.http.get<Movie[]>(`${this.baseUrl}/movies/forQuestionnaire`, headerOptions)    
      }

      fetchMovieById(movieId: number): Observable<Movie> {
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          })
        };
        return this.http.get<Movie>(`${this.baseUrl}/movies/${movieId}`);
      }

   }
   