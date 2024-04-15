import { Component, OnInit } from '@angular/core';
import { Hall } from '../model/hall';
import { HallAdminService } from '../services/hall-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddHallComponent } from '../add-hall/add-hall.component';
import { EditHallComponent } from '../edit-hall/edit-hall.component';

@Component({
  selector: 'app-hall-admin',
  templateUrl: './hall-admin.component.html',
  styleUrls: ['./hall-admin.component.css']
})
export class HallAdminComponent implements OnInit {
  halls: Hall[] = [];
  newHall: Hall = {} as Hall;
  editingHallIndex: number | null = null;

  constructor(private hallService: HallAdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadHalls();
  }

  loadHalls(): void {
    this.hallService.getAllHalls().subscribe(
      halls => {
        this.halls = halls;
      },
      error => {
        console.error('Error loading halls:', error);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddHallComponent);

    dialogRef.componentInstance.hallAdded.subscribe(() => {
      this.loadHalls();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(hall: Hall): void {
    const dialogRef = this.dialog.open(EditHallComponent, {
      width: '300px',
      data: { hall: hall }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.updatedHall) {
        // Αν υπάρχει ενημερωμένο hall, ενημερώστε τη λίστα με τα halls
        const index = this.halls.findIndex(h => h.id === result.updatedHall.id);
        if (index !== -1) {
          this.halls[index] = result.updatedHall;
        }
      }
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  confirmDelete(hall: Hall): void {
    if (confirm('Are you sure you want to delete the hall?')) {
      this.deleteHall(hall);
    }
  }

  deleteHall(hall: Hall): void {
    this.hallService.deleteHall(hall.id).subscribe(
      () => this.halls = this.halls.filter(h => h.id !== hall.id),
      error => console.log('Error deleting hall: ', error)
    );
  }
  
}