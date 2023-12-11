import { processFile } from '../utils/index.mjs';

const STARS_POSITIONS = new Map();
const SYMBOLS_POSITIONS = new Map();
const SYMBOLS_REGEX = new RegExp('[^0-9\.]');
const NUMBERS_REGEX = new RegExp('[0-9]+', 'g');
const GEARS = new Map();

let s_row = 0;
const processSymbols = (line) => {
    for (let s_col = 0; s_col < line.length; s_col++) {
        if (SYMBOLS_REGEX.test(line[s_col])) {
            SYMBOLS_POSITIONS.set(s_row, [...(SYMBOLS_POSITIONS.get(s_row) || []), s_col]);
            if (line[s_col] == '*') {
                STARS_POSITIONS.set(s_row, [...(STARS_POSITIONS.get(s_row) || []), s_col]);
            }
        }
    }
    s_row++;

    return 0;
};

let row = 0;
const processLine = (line) => {
    let lookupIndex = 0;

    const numbersFound = line.match(NUMBERS_REGEX);

    for (let number of numbersFound) {
        let isPartNumber = false;
        let startIndex = line.substring(lookupIndex).indexOf(number) + lookupIndex;
        let endIndex = startIndex + number.length;
        lookupIndex = endIndex;

        for (let i = row - 1; i <= row + 1; i++) {
            let columns = SYMBOLS_POSITIONS.get(i) || [];
            for (let col of columns) {
                if (col >= startIndex - 1 && col <= endIndex) {
                    isPartNumber = true;
                    break;
                }
            }
            if (isPartNumber) break;
        }

        if (isPartNumber) {
            for (let i = row - 1; i <= row + 1; i++) {
                let stars = STARS_POSITIONS.get(i) || [];
                for (let star of stars) {
                    if (star >= startIndex - 1 && star <= endIndex) {
                        let starPos = `${i};${star}`;
                        GEARS.set(starPos, [...(GEARS.get(starPos) || []), number])
                    }
                }
            }
        }
    }

    row++;
    return 0;
};

const processGearMap = () => {
    let result = 0;
    for (let parts of GEARS.values()) {
        if (parts.length == 2) {
            result += +parts[0] * +parts[1];
        }
    }
    console.log(`Result: ${result}`);
};

processFile('input.txt', processSymbols)
    .on('close', () => processFile('input.txt', processLine)
        .on('close', () => processGearMap())
    );
