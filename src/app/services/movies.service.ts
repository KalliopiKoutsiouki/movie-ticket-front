import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { environment } from '../environment';
import { Movie } from '../model/movie';

@Injectable(
    {providedIn: 'root'}
  )
  export class MovieService {
    private baseUrl = environment.backendBaseUrl;
    constructor(private http:HttpClient,  private authService: AuthService) { }

    getAllMovies(): Observable<Movie[]> {
        // const token = this.authService.getJwtToken();
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          })
        };
         return this.http.get<Movie[]>(`${this.baseUrl}/movies/all`, headerOptions)    
      }

      fetchCurrentMovies(): Observable<Movie[]> {
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
         return this.http.get<Movie[]>(`${this.baseUrl}/movies/currentMovies`, headerOptions)    
      }

      fetchUpcomingMovies(): Observable<Movie[]> {
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
         return this.http.get<Movie[]>(`${this.baseUrl}/movies/upcomingMovies`, headerOptions)    
      }
  }