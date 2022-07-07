import { WriteLinkedLineUseCase } from './writeLinkedLineUseCase.js'
import config from '../../../../config/index.js';

describe("WriteLinkedLineUseCase",  () =>  {
    it("should return response with hash expected", async () => {
        const mockLogRepository = {
            save: jest.fn(),
        };
        const request = {
            message: "dummy-message",
        };
        const expected = {
            message: request.message,
            hash: "00996a72a7e19ff5b350e0403095a9f71dbfa10b4e8dd1e9e83eddf8c4f90236",
            previousHash: config.line.defaultPreviousHash,
            nonce: 93,
        };
        const writeLinkedLineUseCase = new WriteLinkedLineUseCase({ logRepository: mockLogRepository, config});
        const result = await writeLinkedLineUseCase.execute(request);
        expect(result).toEqual(expected);
    });
});
