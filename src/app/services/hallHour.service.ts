import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable, map} from 'rxjs';
import { HallHour } from '../model/hallhour';
import { TokenService } from './token.service';


@Injectable(
    {providedIn: 'root'}
  )
export class HallHourService {
    private baseUrl = environment.backendBaseUrl;
    constructor(private http:HttpClient, private tokenService: TokenService) { }

    getAllHoursByHallIdAndMovieId(hallId:number, movieId:number) : Observable<HallHour[]> {
        const token = this.tokenService.getJwtToken();
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        };
        return this.http.get<HallHour[]>(`${this.baseUrl}/hall-hour/all/${hallId}/${movieId}`, headerOptions)    
    }

    getAllHoursByHallId(hallId:number) : Observable<HallHour[]> {
      const token = this.tokenService.getJwtToken();
      const headerOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get<HallHour[]>(`${this.baseUrl}/hall-hour/all/${hallId}`, headerOptions)    
  }

    updateHallHour(hallHour: HallHour): Observable<HallHour> {
      const token = this.tokenService.getJwtToken();
      const headerOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.put<HallHour>(`${this.baseUrl}/hall-hour/update/${hallHour.id}`, hallHour, headerOptions).pipe(
        map(hallHour => {
          return hallHour;
        })
      );
    }
}