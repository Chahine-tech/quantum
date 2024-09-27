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

    argument(): number {
        return Math.atan2(this.imag, this.real);
    }

    static fromPolar(r: number, theta: number): Complex {
        return new Complex(r * Math.cos(theta), r * Math.sin(theta));
    }
}
