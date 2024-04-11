import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <mat-dialog-content>You are about to cancel this reservation. Are you sure?</mat-dialog-content>
    <mat-dialog-actions>
    <button mat-button class="purple-button" [mat-dialog-close]="true" cdkFocusInitial>I am sure</button>
      <button mat-button mat-dialog-close>Back</button>
     
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }
  
}