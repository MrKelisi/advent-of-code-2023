import fs from 'fs';
import readline from 'readline';

export function processFile(inputPath, processLine) {
    let total = 0;
    const rl = readline
        .createInterface({
            input: fs.createReadStream(inputPath),
            crlfDelay: Infinity,
        })
        .on('line', (line) => {
            total += processLine(line);
        })
        .on('close', () => {
            console.log(`Result: ${total}`);
            rl.close();
        });
    return rl;
}
