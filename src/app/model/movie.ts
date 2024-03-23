import { Hall } from "./hall";
import { DateRange } from "./dateRange";

export interface Movie {
    id: number;
    description: string;
    name: string;
    picture: string;
    dateRange: DateRange;
    hall: Hall;
  }