import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hall } from '../model/hall';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HallAdminService } from '../services/hall-admin.service';
import { DateRange } from '../model/dateRange';
import { HallHourService } from '../services/hallHour.service';
import { HallHour } from '../model/hallhour';

@Component({
  selector: 'app-edit-hall',
  templateUrl: './edit-hall.component.html',
  styleUrl: './edit-hall.component.css'
})
export class EditHallComponent implements OnInit {

  hall: Hall;
  newHallName: string;
  dateRange: DateRange | null;
  selectedStartDate: Date;
  selectedEndDate: Date | null = null;
  updatedDateRange: DateRange | null;
  editingHallHours: HallHour[];
  constructor(
    private hallService: HallAdminService,
    private hallHourService: HallHourService,
    public dialogRef: MatDialogRef<EditHallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hall: Hall }
  ) {
    this.newHallName = data.hall.name;
  }

  ngOnInit(): void {
    this.newHallName = this.data.hall.name;
    this.hall = this.data.hall;
    this.fetchDateRange(this.data.hall.id);
    this.fetchHallHours(this.data.hall.id);
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
    this.hallService.updateDateRangePerHall(this.hall.id, this.updatedDateRange).subscribe(
      updatedHall => {
        this.dialogRef.close({ updatedHall: updatedHall });
      },
      error => {
        console.error('Error updating hall:', error);
      }
    );
     for (let i = 0; i < this.editingHallHours.length; i++) {
      this.hallHourService.updateHallHour(this.editingHallHours[i]).subscribe(
        updatedHallHour => {
          console.log("Hall hour updated");
        },
        error => {
          console.error('Error updating hall:', error);
        }
      );
    }
  }

  startDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.updatedDateRange.fromDate = event.value;
  }

  endDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.updatedDateRange.toDate = event.value;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  fetchDateRange(id: number): void {
    this.hallService.getDateRangesByHall(id).subscribe(dateRange => {
      this.dateRange = dateRange[0];
      this.updatedDateRange = dateRange[0];
      this.selectedStartDate = new Date(dateRange[0].fromDate);
      this.selectedEndDate = new Date(dateRange[0].toDate);
    });
  }

  fetchHallHours(hallId: number): void {
    this.hallHourService.getAllHoursByHallId(hallId).subscribe(
      hallHours => {
        this.editingHallHours = hallHours; 
      },
      error => {
        console.error('Error fetching hall hours:', error);
      }
    );
  }

  editHallHours() {
    throw new Error('Method not implemented.');
  }
}