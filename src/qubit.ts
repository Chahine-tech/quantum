import { Complex } from './complex';
import { BlochCoordinates } from './types';

// Qubit generic state definition
export type QubitState<T extends Complex> = {
    alpha: T;
    beta: T;
};

export class Qubit<T extends Complex = Complex> {
    alpha: T;
    beta: T;

    constructor(alpha: T, beta: T) {
        const tolerance = 1e-10;
        if (Math.abs(alpha.magnitude() ** 2 + beta.magnitude() ** 2 - 1) > tolerance) {
            throw new Error("The qubit's state must be normalized.");
        }
        this.alpha = alpha;
        this.beta = beta;
    }

    // Convert to spherical coordinates (Bloch sphere)
    toBlochCoordinates(): BlochCoordinates {
        const theta = 2 * Math.acos(this.alpha.magnitude());
        const phi = this.beta.argument() - this.alpha.argument();
        return { theta, phi };
    }

    // Measure the qubit with probabilities for |0⟩ and |1⟩
    measure(): number {
        const probZero = this.alpha.magnitude() ** 2;
        return Math.random() < probZero ? 0 : 1;
    }

    // Calculate measurement probabilities
    measureProbabilities(): { probZero: number, probOne: number } {
        const probZero = this.alpha.magnitude() ** 2;
        const probOne = this.beta.magnitude() ** 2;
        return { probZero, probOne };
    }
}

// Multi-qubit system with generic typing
export class MultiQubit<T extends Complex = Complex> {
    qubits: QubitState<T>[];

    constructor(qubits: QubitState<T>[]) {
        this.qubits = qubits;
    }

    // Measure all qubits in the system
    measureSystem(): number[] {
        return this.qubits.map(qubit => {
            const probZero = qubit.alpha.magnitude() ** 2;
            return Math.random() < probZero ? 0 : 1;
        });
    }
}
