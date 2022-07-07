import { LinkedLine } from '../../../domain/LinkedLine.js'

export class WriteLinkedLineUseCase {
    constructor({ logRepository, config }) {
        const { difficulty } = config.line;
        this.repository = logRepository;
        this.linkedLine = new LinkedLine(difficulty);
    }

    async execute(request) {
        const { message } = request;
        const line = await this.linkedLine.push(message);
        await this.repository.save(line);
        const response = {
            message: line.message,
            hash: line.hash,
            previousHash: line.previousHash,
            nonce: line.nonce,
        };
        return response;
    }
}