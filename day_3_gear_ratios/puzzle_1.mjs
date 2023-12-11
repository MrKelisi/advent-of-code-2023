import { processFile } from '../utils/index.mjs';

const SYMBOLS_POSITIONS = new Map();
const SYMBOLS_REGEX = new RegExp('[^0-9\.]');
const NUMBERS_REGEX = new RegExp('[0-9]+', 'g');

let s_row = 0;
const processSymbols = (line) => {
    for (let s_col = 0; s_col < line.length; s_col++) {
        if (SYMBOLS_REGEX.test(line[s_col])) {
            if (SYMBOLS_POSITIONS.has(s_row)) {
                SYMBOLS_POSITIONS.set(s_row, [...SYMBOLS_POSITIONS.get(s_row), s_col]);
            } else {
                SYMBOLS_POSITIONS.set(s_row, [s_col]);
            }
        }
    }
    s_row++;

    return 0;
};

let row = 0;
const processLine = (line) => {
    let totalLine = 0;
    let lookupIndex = 0;

    const numbersFound = line.match(NUMBERS_REGEX);

    for (let number of numbersFound) {
        let startIndex = line.substring(lookupIndex).indexOf(number) + lookupIndex;
        let endIndex = startIndex + number.length;
        lookupIndex = endIndex;

        for (let i = row - 1; i <= row + 1; i++) {
            let found = false;
            let columns = SYMBOLS_POSITIONS.get(i) || [];
            for (let col of columns) {
                if (col >= startIndex - 1 && col <= endIndex) {
                    totalLine += +number;
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
    }

    row++;
    console.log(`Row ${row}: ${totalLine}`);
    return totalLine;
};

processFile('input.txt', processSymbols)
    .on('close', () => processFile('input.txt', processLine));
