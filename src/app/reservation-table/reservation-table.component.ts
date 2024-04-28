import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from '../model/reservation';
import { Hour } from '../model/hour';
import { Movie } from '../model/movie';
import { ReservationService } from '../services/reservation.service';
import { tap, Subscription } from 'rxjs';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrl: './reservation-table.component.css'
})
export class ReservationTableComponent implements OnInit {

  reservations: Reservation[] = [];
  private reservationsSubscription: Subscription;

  constructor(
    private reservationService: ReservationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchUserReservations();
  }

  ngOnDestroy(): void {
    this.reservationsSubscription.unsubscribe();
  }

  editReservation(reservation: Reservation): void {
    console.log(reservation)
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      data: { reservation: reservation }
    });

    dialogRef.componentInstance.reservationConfirmedChange.subscribe((movie: Movie) => {
      this.fetchUserReservations();
    });
  }

  deleteReservation(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.deleteReservation(reservation).subscribe(
          () => {
            console.log('Reservation deleted successfully');
            this.fetchUserReservations();
          },
          error => {
            console.error('Error deleting reservation:', error);
          }
        );
      }
    });

  }

  fetchUserReservations(): void {
    this.reservationsSubscription = this.reservationService.reservations$.subscribe(
      reservations => {
        this.reservations = reservations;
      },
      error => {
        console.error('Error fetching user reservations:', error);
      }
    );
    this.reservationService.getUserReservations()
      .pipe(
        tap((reservations: Reservation[]) => {
          this.reservations = reservations
        })
      )
      .subscribe();
  }

  downloadTicket(reservation: Reservation) {
    const ticketData = {
      reservationid: reservation.id,
      date: reservation.selectedDate,
      time: `${reservation.hour.fromHour} - ${reservation.hour.toHour}`,
      username: reservation.user.userName,
      numberOfSeats: reservation.numberOfSeats,
      movieName: reservation.movie.name,
      hallName: reservation.movie.hall.name,
      userEmail: reservation.user.email
    };

    const pdf = new jsPDF();
    const formattedTicketData = `
            Reservation ID: ${ticketData.reservationid}
            Date: ${ticketData.date}
            Time: ${ticketData.time}
            Username: ${ticketData.username}
            Seats: ${ticketData.numberOfSeats}
            Hall: ${ticketData.hallName}
            Email: ${ticketData.userEmail}
          `;
    QRCode.toDataURL(formattedTicketData, (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return;
      }
      pdf.text(formattedTicketData, 10, 10);
      const qrCodeWidth = 50;
      const qrCodeHeight = 50;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const qrCodeX = pdfWidth - qrCodeWidth - 10;
      pdf.addImage(url, 'PNG', qrCodeX, 10, qrCodeWidth, qrCodeHeight);
      pdf.save(`${ticketData.username}.pdf`);
    });
  }

}
