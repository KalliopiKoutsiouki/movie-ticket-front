export interface User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    userRoles: string[];
    movies: any[]; 
    reservation: any;
  }