import { processFile } from '../utils/index.mjs';

const STRING_DIGITS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const processLine = (line) => {
    console.log(line);

    let firstDigit;
    let lastDigit;

    let firstIndex = -1;
    let lastIndex = -1;

    STRING_DIGITS.forEach((str, idx) => {
        let index = line.indexOf(str);
        if (index >= 0 && (firstIndex < 0 || firstIndex >= index)) {
            firstIndex = index;
            firstDigit = `${idx + 1}`;
        }

        index = line.lastIndexOf(str);
        if (index >= 0) {
            index += str.length;
            if ((lastIndex < 0 || lastIndex <= index)) {
                lastIndex = index;
                lastDigit = `${idx + 1}`;
            }
        }
    })

    for (let i = 0; i < line.length; i++) {
        let char = Number(line[i]);
        if (!isNaN(char)) {
            if (firstDigit == undefined || (firstIndex >= 0 && firstIndex > i)) {
                firstDigit = line[i];
                firstIndex = -1;
            }
            if (lastDigit == undefined || lastIndex < 0 || lastIndex <= i) {
                lastDigit = line[i];
                lastIndex = -1;
            }
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
