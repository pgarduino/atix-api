import { Line } from './Line.js';

describe('Line', () => {
    const testCases = [
        {
            name: 'push',
            params: {
                message: 'dummy-message',
                previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
                nonce: 0,
                difficulty: 2,
            },
            expect: {
                hash: '00996a72a7e19ff5b350e0403095a9f71dbfa10b4e8dd1e9e83eddf8c4f90236',
                nonce: 93,
            }
        },
    ];
    testCases.forEach(tc => {
        it(tc.name, async () => {
            const { previousHash, message, nonce, difficulty } = tc.params;
            const line = new Line({ previousHash, message, nonce });
            await line.push(difficulty);
            expect(line.hash).toEqual(tc.expect.hash);
            expect(line.generateHash()).toEqual(tc.expect.hash);
            expect(line.nonce).toEqual(tc.expect.nonce);
        });
    });
});