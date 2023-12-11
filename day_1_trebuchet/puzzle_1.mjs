import { processFile } from '../utils/index.mjs';

const processLine = (line) => {
    console.log(line);
    let firstDigit;
    let lastDigit;
    
    for (let i = 0; i < line.length; i++) {
        let char = Number(line[i]);
        if (!isNaN(char)) {
            if (firstDigit == undefined) {
                firstDigit = line[i];
            }
            lastDigit = line[i];
        }
    }

    if (lastDigit != undefined) {
        const calibration = +(firstDigit + lastDigit);
        console.log(calibration);
        return calibration;
    }

    return 0;
};

processFile('input.txt', processLine);
