import { NewPatient, Gender } from './types/types'

const toNewPatient = (entry: any): NewPatient => {
    const newPatient = {
        name: parseName(entry.name),
        dateOfBirth: parseDate(entry.dateOfBirth),
        ssn: parseSsn(entry.ssn),
        gender: parseGender(entry.gender),
        occupation: parseOccupation(entry.occupation)
    }
    return newPatient;
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate){
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender)
}

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender')
    }
    return gender
}

const parseOccupation = (oc: unknown): string => {
    if (!oc || !isString(oc)) {
        throw new Error('Incorrect or missing occupation');
    }
    return oc;
};


export default toNewPatient;