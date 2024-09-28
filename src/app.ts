import express, { Request, Response } from 'express';
import { Qubit, MultiQubit } from './qubit';
import { BlochCoordinates, MultiQubitResponse, QubitMeasurement, SimulateResponse } from './types';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';


const app = express();
const port = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route to simulate a single qubit and return probabilities
app.get('/simulate', (req: Request, res: Response<SimulateResponse>) => {
  const qubit = new Qubit(); // Generate a random qubit

  const result = qubit.measure();
  const { probZero, probOne } = qubit.measureProbabilities();
  res.json({
    result,
    state: `|ψ⟩ = ${qubit.alpha.real}|0⟩ + ${qubit.beta.real}|1⟩`,
    probabilities: { probZero, probOne }
  });
});

// Route to get the Bloch sphere coordinates
app.get('/bloch', (req: Request, res: Response<{ coordinates: BlochCoordinates, description: string }>) => {
  const qubit = new Qubit(); // Generate a random qubit

  const { theta, phi } = qubit.toBlochCoordinates();
  const description = `Theta (polar angle): ${theta.toFixed(3)} radians, Phi (azimuthal angle): ${phi.toFixed(3)} radians`;
  res.json({
    coordinates: { theta, phi },
    description
  });
});

// Route to simulate multiple qubits in a system
app.get('/multi-simulate', (req: Request, res: Response<MultiQubitResponse>) => {
  const qubit1 = new Qubit(); // Generate a random qubit
  const qubit2 = new Qubit(); // Generate another random qubit
  const multiQubit = new MultiQubit([{ alpha: qubit1.alpha, beta: qubit1.beta }, { alpha: qubit2.alpha, beta: qubit2.beta }]);

  const results = multiQubit.measureSystem();

  const qubits: QubitMeasurement[] = results.map((result, index) => {
    const qubit = index === 0 ? qubit1 : qubit2;
    const { probZero, probOne } = qubit.measureProbabilities();
    return {
      id: index + 1,
      result,
      probabilities: { probZero, probOne }
    };
  });

  const description = `Measured ${qubits.length} qubits with probabilities and results.`;

  res.json({ qubits, description });
});

app.listen(port, () => {
  console.log(`Qubit simulator app running at http://localhost:${port}`);
});
