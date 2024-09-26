export class Complex {
    real: number;
    imag: number;
  
    constructor(real: number, imag: number) {
      this.real = real;
      this.imag = imag;
    }
  
    magnitude(): number {
      return Math.sqrt(this.real ** 2 + this.imag ** 2);
    }
  }
  
  export class Qubit {
    alpha: Complex;
    beta: Complex;
  
    constructor(alpha: Complex, beta: Complex) {
      const tolerance = 1e-10; // A small tolerance for calculation errors
      if (Math.abs(alpha.magnitude() ** 2 + beta.magnitude() ** 2 - 1) > tolerance) {
        throw new Error("The qubit's state must be normalized.");
      }
      this.alpha = alpha;
      this.beta = beta;
    }
  
    measure(): number {
      const probZero = this.alpha.magnitude() ** 2;
      return Math.random() < probZero ? 0 : 1;
    }
  }
  
  