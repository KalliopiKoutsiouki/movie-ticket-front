import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private baseUrl = environment.backendBaseUrl;
  constructor(private http:HttpClient, private authService: AuthService) { }

  addUserRole(userId: number, role: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${userId}/role?role=${role}`, null);
  }

  removeUserRole(userId: number, role: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${userId}/role?role=${role}`);
  }
}
