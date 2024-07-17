import { Hall } from "./hall";
import { Hour } from "./hour";
import { Movie } from "./movie";

export interface HallHour {
    id: number;
    hall: Hall;
    hour: Hour;
    capacity: number;
    movie: Movie;
}