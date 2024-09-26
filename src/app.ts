import express, { Request, Response } from 'express';
import { Complex, Qubit } from './qubit';
const app = express();
const port = 3000;

app.get('/simulate', (req: Request, res: Response) => {
  // Initialize a qubit with random (normalized) coefficients
  const alpha = new Complex(1 / Math.sqrt(2), 0); // |0⟩
  const beta = new Complex(1 / Math.sqrt(2), 0);  // |1⟩
  const qubit = new Qubit(alpha, beta);

  const result = qubit.measure();
  res.json({ result, state: `|ψ⟩ = ${alpha.real}|0⟩ + ${beta.real}|1⟩` });
});

app.listen(port, () => {
  console.log(`Qubit simulator app running at http://localhost:${port}`);
});
