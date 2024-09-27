export type SimulateResponse = {
    result: number;
    state: string;
    probabilities: {
        probZero: number;
        probOne: number;
    };
};

export type BlochCoordinates = {
    theta: number;
    phi: number;
};


export type QubitMeasurement = {
    id: number;
    result: number;
    probabilities: {
        probZero: number;
        probOne: number;
    };
};

export type MultiQubitResponse = {
    qubits: QubitMeasurement[];
    description: string;
};