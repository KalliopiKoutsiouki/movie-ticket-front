import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Hall } from '../model/hall';
import { HallAdminService } from '../services/hall-admin.service';

@Component({
  selector: 'app-add-hall',
  templateUrl: './add-hall.component.html',
  styleUrl: './add-hall.component.css'
})
export class AddHallComponent {
  newHall: Hall = {} as Hall;

  @Output() hallAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private hallService: HallAdminService, public dialogRef: MatDialogRef<AddHallComponent>) { }

  addHall(): void {
    this.hallService.createHall(this.newHall).subscribe(
      () => {
        this.hallAdded.emit(); // Εκπέμπουμε το σήμα για την ανανέωση της λίστας
        this.dialogRef.close();
      },
      error => {
        console.error('Error adding hall:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}