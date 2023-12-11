import { processFile } from '../utils/index.mjs';

const RGB = [12, 13, 14];
const COLORS = ['red', 'green', 'blue'];

const processLine = (line) => {
    console.log(line);

    const game = +line.split(':')[0].substr(5);

    for (let set of line.split(':')[1].split(';')) {
        for (let cubes of set.split(',')) {
            for (let i = 0; i < COLORS.length; i++) {
                if (cubes.indexOf(COLORS[i]) >= 0) {
                    let nbCubes = cubes.trim().split(' ')[0];
                    if (nbCubes > RGB[i]) {
                        console.log('❌ impossible');
                        return 0;
                    }
                    break;
                }
            }
        }
    }

    console.log('🟢 possible');
    return game;
};

processFile('input.txt', processLine);
