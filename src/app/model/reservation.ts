import { User } from "./user";
import { Movie } from "./movie";
import { Hour } from "./hour";

export interface Reservation {
    id?: number;
    timestamp: Date;
    email_sent: boolean;
    user: User;
    numberOfSeats: number;
    movie: Movie;
    selectedDate: string;
    hour: Hour;
    checked?: boolean;
}