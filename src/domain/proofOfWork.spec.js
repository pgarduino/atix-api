import { ProofOfWork } from './ProofOfWork';

describe('ProofOfWork', () => {
    beforeEach(() => {
        jest.useFakeTimers("legacy")
    });
    const testCases = [
        {
            name: 'ProofOfWork when previousHash is default',
            params: {
                previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
                message: 'dummy-message',
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
            const proof = new ProofOfWork({ previousHash, message, nonce });
            const result = await proof.work(difficulty);
            expect(result).toEqual(tc.expect);
        });
    });
});