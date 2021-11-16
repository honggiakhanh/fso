type Rating = 'excelent' | 'good' | 'not met requirements' | 'undefined';

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: Rating,
    target: number,
    average: number
}

const parseArgEx = (args: Array<string>): Array<number> => {
    if (args.length < 3) throw new Error('Not enough arguments');
    let total: Array<number> = [];
    for (let i = 2; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            total = total.concat(Number(args[i]));
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    return total;
};

export const exerciseCalc = (ex: Array<number>): Result => {
    const info: Result = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: 'undefined',
        target: ex[ex.length - 1],
        average: 0
    };

    for (let i = 0; i < ex.length - 1; i++) {
        info.periodLength++;
        if (ex[i] > 0) {
            info.trainingDays++;
            info.average += ex[i];
        }
    }
    info.average /= info.periodLength;
    if (info.average < info.target) {
        info.rating = 1;
        info.ratingDescription = 'not met requirements';
    } else if (info.average === info.target) {
        info.rating = 2;
        info.ratingDescription = 'good';
    } else {
        info.rating = 3;
        info.ratingDescription = "excelent";
    }
    
    return info;
};

try {
    const exercises: Array<number> = parseArgEx(process.argv);
    console.log(exerciseCalc(exercises));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}