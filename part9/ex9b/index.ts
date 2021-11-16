import express from 'express';
import { calculateBmi } from './BMIcalc';
import { exerciseCalc } from './excalc';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    res.json({
      weight: Number(req.query.height),
      height: Number(req.query.weight),
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
  } else {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!isNaN(Number(target)) && daily_exercises.every((value: number) => typeof(value)==='number')) {
    res.json(exerciseCalc(daily_exercises.concat(target)));
  } else {
    res.status(400).send({ error: 'malformatted parameters' })
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});