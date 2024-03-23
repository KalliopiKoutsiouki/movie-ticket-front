import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrl: './movie-table.component.css'
})
export class MovieTableComponent implements OnInit {
  
  @Input() movies: any[] = [];
  isLoggedIn$: Observable<boolean>;

  constructor( private authService: AuthService){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}
