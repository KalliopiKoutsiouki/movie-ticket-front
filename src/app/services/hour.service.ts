import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { Hour } from '../model/hour';
import { TokenService } from './token.service';


@Injectable(
    {providedIn: 'root'}
  )
export class HourService {
    private baseUrl = environment.backendBaseUrl;
    constructor(private http:HttpClient, private tokenService: TokenService) { }

getAllHours() : Observable<Hour[]> {
    const token = this.tokenService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
     return this.http.get<Hour[]>(`${this.baseUrl}/hour/all`, headerOptions)    
}


}