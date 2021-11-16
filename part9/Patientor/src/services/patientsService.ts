import patientEntry from "../data/patientsEntry";
import { NewPatient, Patient, PatientWithoutSSN } from "../types/types"
import { v4 as uuidv4 } from 'uuid'

const getPatientEntry = (): Array<Patient> => {
    return patientEntry;
}

const getPatientEntryWithoutSSN = (): Array<PatientWithoutSSN> => {
    return patientEntry.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...entry
    }
    patientEntry.push(newPatient);
    return newPatient;
}

export default {
    getPatientEntry,
    getPatientEntryWithoutSSN,
    addPatient
}