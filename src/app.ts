import express, { Request, Response } from 'express';
import { Complex } from './complex';
import { Qubit, MultiQubit } from './qubit';
import { BlochCoordinates, SimulateResponse } from './types';

const app = express();
const port = 3000;

// Route to simulate a single qubit and return probabilities
app.get('/simulate', (req: Request, res: Response<SimulateResponse>) => {
    const alpha = new Complex(1 / Math.sqrt(2), 0); // |0⟩
    const beta = new Complex(1 / Math.sqrt(2), 0);  // |1⟩
    const qubit = new Qubit(alpha, beta);

    const result = qubit.measure();
    const { probZero, probOne } = qubit.measureProbabilities();
    res.json({
        result,
        state: `|ψ⟩ = ${alpha.real}|0⟩ + ${beta.real}|1⟩`,
        probabilities: { probZero, probOne }
    });
});

// Route to get the Bloch sphere coordinates
app.get('/bloch', (req: Request, res: Response<BlochCoordinates>) => {
    const alpha = new Complex(1 / Math.sqrt(2), 0); // |0⟩
    const beta = new Complex(1 / Math.sqrt(2), 0);  // |1⟩
    const qubit = new Qubit(alpha, beta);

    const { theta, phi } = qubit.toBlochCoordinates();
    res.json({ theta, phi });
});

// Route to simulate multiple qubits in a system
app.get('/multi-simulate', (req: Request, res: Response) => {
    const qubits = [
        { alpha: new Complex(1 / Math.sqrt(2), 0), beta: new Complex(1 / Math.sqrt(2), 0) },
        { alpha: new Complex(1 / Math.sqrt(2), 0), beta: new Complex(1 / Math.sqrt(2), 0) }
    ];
    const multiQubit = new MultiQubit(qubits);

    const result = multiQubit.measureSystem();
    res.json({ result });
});

app.listen(port, () => {
    console.log(`Qubit simulator app running at http://localhost:${port}`);
});
