import { Movie } from "./movie";

export interface User {
    id?: number;
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email: string;
    userRoles?: string[];
    movies?: Movie[]; 
    reservations?: any;
    mobilePhone?: number;
  }