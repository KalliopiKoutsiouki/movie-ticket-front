import { Hall } from "./hall";
import { Hour } from "./hour";

export interface HallHour {
    hall: Hall;
    hour: Hour;
    capacity: number;
}