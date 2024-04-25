import { Hall } from "./hall";
import { Hour } from "./hour";

export interface HallHour {
    id: number;
    hall: Hall;
    hour: Hour;
    capacity: number;
}