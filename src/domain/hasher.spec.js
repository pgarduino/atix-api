import { Hasher } from './Hasher';

describe('sha256', () => {
    const testCases = [
        {
            name: 'calculates the SHA-256 of the input empty',
            input: '',
            expect: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        },
        {
            name: 'calculates the SHA-256 of the input nom-empty',
            input: 'dummy-input',
            expect: '8f191862e64c7fecb8edb44473b37bbe03e9f5906ec13d76bf1cb3aa38ac2ed0'
        },
    ];
    testCases.forEach(tc => {
        it(tc.name, () => {
            expect(Hasher.sha256(tc.input)).toEqual(tc.expect);
        });
    });
});