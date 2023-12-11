import { processFile } from '../utils/index.mjs';

const NUMBER_REGEX = new RegExp('[0-9]+', 'g');

const WINNINGS = new Map();

let row = 1;
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

    if (numberOfWins > 0) {
        const nextCards = [];
        for (let i = 1; i <= numberOfWins; i++) {
            nextCards.push(row + i);
        }
        WINNINGS.set(row, nextCards);
    }
    
    row++;
    return 0;
};

const recursive = (card) => {
    const winning = WINNINGS.get(card) || [];
    return winning.reduce((prev, curr) => prev + recursive(curr), 1);
};

const totalCards = () => {
    let total = 0;
    for (let i = 1; i < row; i++) {
        total += recursive(i);
    }
    console.log(WINNINGS, `Result: ${total}`);
};

processFile('input.txt', processLine)
    .on('close', () => totalCards());
