import { Hall } from "./hall";
import { DateRange } from "./dateRange";

export interface Movie {
    id: number;
    description: string;
    name: string;
    picture: any;
    dateRange: DateRange;
    hall: Hall;
    bookedForUser?:boolean;
    recommendationRateForUser?: number;
  }