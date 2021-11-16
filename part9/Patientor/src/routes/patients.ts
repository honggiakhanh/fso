import express from 'express';
import patientService from '../services/patientsService'
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientEntryWithoutSSN())
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body)
        const addNewPatient = patientService.addPatient(newPatient);
        res.send(addNewPatient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router;
