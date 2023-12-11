import { processFile } from '../utils/index.mjs';

const NUMBER_REGEX = new RegExp('[0-9]+', 'g');

const processLine = (line) => {
    let card = line.split(':')[1].split('|');

    let winningNumbers = card[0].match(NUMBER_REGEX);
    let myNumbers = card[1].match(NUMBER_REGEX);

    let numberOfWins = 0;
    for (let winningNumber of winningNumbers) {
        if (myNumbers.includes(winningNumber)) {
            numberOfWins++;
        }
    }
    
    if (numberOfWins > 1) {
        return Math.pow(2, numberOfWins - 1);
    } else {
        return numberOfWins;
    }
};

processFile('input.txt', processLine);
