interface BmiValues {
    height: number;
    weight: number;
}

const parseArg = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (h: number, w: number): string => {
    const bmi = w / (h / 100) ** 2;
    let status = "Body type: ";
    if (bmi < 16) {
        status += "Underweight (Severe thinness)";
    } else if (bmi < 16.9) {
        status += "Underweight (Moderate thinness)";
    } else if (bmi < 18.4) {
        status += "Underweight (Mild thinness)";
    } else if (bmi < 24.9) {
        status += "Normal range";
    } else if (bmi < 29.9) {
        status += "Overweight (Pre-obese)";
    } else if (bmi < 34.9) {
        status += "Obese (Class I)";
    } else if (bmi < 39.9) {
        status += "Obese (Class II)";
    } else if (bmi > 40) {
        status += "Obese (Class III)";
    }
    return status;
};

try {
    const { height, weight } = parseArg(process.argv);
    calculateBmi(height, weight);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}