export interface Person {
    id?: number;
    firstname: string;
    lastname: string;
    dob: string;      // Date of birth
    address: string;
    city: string;
    employed: boolean;
}

export interface Guest {
    id?: number,
    firstName:string,
    lastName:string,
    ssn:string,
    address:string,
    city:string,
    dob?: string;
}