import { processFile } from '../utils/index.mjs';

const COLORS = ['red', 'green', 'blue'];

const processLine = (line) => {
    console.log(line);

    const RGB = [1, 1, 1];

    for (let set of line.split(':')[1].split(';')) {
        for (let cubes of set.split(',')) {
            for (let i = 0; i < COLORS.length; i++) {
                if (cubes.indexOf(COLORS[i]) >= 0) {
                    let nbCubes = Number(cubes.trim().split(' ')[0]);
                    RGB[i] = Math.max(RGB[i], nbCubes);
                }
            }
        }
    }

    const power = RGB.reduce((prev, curr) => prev * curr, 1);
    console.log(RGB, power);
    return power;
};

processFile('input.txt', processLine);
