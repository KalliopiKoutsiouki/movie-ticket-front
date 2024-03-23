import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrl: './movie-table.component.css'
})
export class MovieTableComponent {
  @Input() movies: any[] = [];
}
