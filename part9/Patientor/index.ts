import express from 'express';
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())
const PORT = 3001;

import diagnosesRouter from './src/routes/diagnoses'
import patientRouter from './src/routes/patients'

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter)

app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});