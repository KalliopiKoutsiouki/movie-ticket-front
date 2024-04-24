import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { environment } from '../environment';
import { Hall } from '../model/hall';
import { Hour } from '../model/hour';
import { TokenService } from './token.service';

@Injectable(
    {providedIn: 'root'}
  )
  export class HallService {
    private baseUrl = environment.backendBaseUrl;
    constructor(private http:HttpClient,  private tokenService: TokenService) { }

    getAllHalls(): Observable<Hall[]> {
        const token = this.tokenService.getJwtToken();
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        };
         return this.http.get<Hall[]>(`${this.baseUrl}/halls/all`, headerOptions)    
      }
  }