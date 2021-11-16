import express from 'express';
import getDiagnosesEntry from '../services/diagnosesService'

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getDiagnosesEntry());
});

export default router;