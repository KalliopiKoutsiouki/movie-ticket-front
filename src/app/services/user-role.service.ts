import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  //todo: add token

  private baseUrl = environment.backendBaseUrl;
  constructor(private http:HttpClient, private authService: AuthService) { }

  addUserRole(userId: number, role: string): Observable<any> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put(`${this.baseUrl}/user/${userId}/role?role=${role}`, null, headerOptions);
  }

  removeUserRole(userId: number, role: string): Observable<any> {
    const token = this.authService.getJwtToken();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete(`${this.baseUrl}/user/${userId}/role?role=${role}`, headerOptions);
  }
}
