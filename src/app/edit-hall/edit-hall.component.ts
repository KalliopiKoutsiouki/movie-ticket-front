import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hall } from '../model/hall';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { HallAdminService } from '../services/hall-admin.service';

@Component({
  selector: 'app-edit-hall',
  templateUrl: './edit-hall.component.html',
  styleUrl: './edit-hall.component.css'
})
export class EditHallComponent implements OnInit {
  hall: Hall;
  newHallName: string;
  startDate: Date;
  endDate: Date;

  constructor(
    private hallService: HallAdminService,
    public dialogRef: MatDialogRef<EditHallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hall: Hall }
  ) {
    this.newHallName = data.hall.name;
  }

  ngOnInit(): void {
    this.newHallName = this.data.hall.name;
    this.hall = this.data.hall;
    fetchDateRange(this.data.hall.id);
  }

  updateHall(): void {
    this.data.hall.name = this.newHallName;
    this.dialogRef.close({ updatedHall: this.data.hall });
    this.hallService.updateHall(this.hall.id, this.hall).subscribe(
      updatedHall => {
        this.dialogRef.close({ updatedHall: updatedHall });
      },
      error => {
        console.error('Error updating hall:', error);
      }
    );
  }

  startDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }

  endDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

function fetchDateRange(id: number) {
  this.hallService.getDateRangesByHall(id);//TODO:continue
}
