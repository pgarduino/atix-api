import { LinkedLine } from './LinkedLine.js';

describe('LinkedLine', () => {

    describe('LinkedLine.push', () => {
        const testCases = [
            {
                name: 'push',
                params: {
                    difficulty: 2,
                    message: 'dummy-message',
                },
                expect: {
                    hash: '00996a72a7e19ff5b350e0403095a9f71dbfa10b4e8dd1e9e83eddf8c4f90236',
                    nonce: 93,
                }
            },
        ];
        testCases.forEach(tc => {
            it(tc.name, async () => {
                const { difficulty, message } = tc.params;
                const linkedLine = new LinkedLine(difficulty);
                const line = await linkedLine.push(message);
                expect(line.hash).toEqual(tc.expect.hash);
                expect(line.nonce).toEqual(tc.expect.nonce);
            });
        });
    });

    describe('LinkedLine.isValid', () => {
        const testCases = [
            {
                name: 'push',
                params: {
                    difficulty: 2,
                    firstMessage: 'dummy-message-1',
                    secondMessage: 'dummy-message-2',
                },
                expect: {
                    length: 2,
                    isValid: true,
                },
            },
        ];
        testCases.forEach(tc => {
            it(tc.name, async () => {
                const { difficulty, firstMessage, secondMessage } = tc.params;
                const linkedLine = new LinkedLine(difficulty);
                await linkedLine.push(firstMessage);
                await linkedLine.push(secondMessage);
                expect(linkedLine.links.length).toEqual(tc.expect.length);
                expect(linkedLine.isValid()).toEqual(tc.expect.isValid);
            });
        });
    });
});