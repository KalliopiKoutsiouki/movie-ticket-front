import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { Hour } from '../model/hour';


@Injectable(
    {providedIn: 'root'}
  )
export class HourService {
    private baseUrl = environment.backendBaseUrl;
    constructor(private http:HttpClient, private authService: AuthService) { }

getAllHours() : Observable<Hour[]> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
     return this.http.get<Hour[]>(`${this.baseUrl}/hour/all`, headerOptions)    
}


}