//export type Gender = "male" | "female"

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
}

export type NewPatient = Omit<Patient, 'id'>

export type PatientWithoutSSN = Omit<Patient, 'ssn'>

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}