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