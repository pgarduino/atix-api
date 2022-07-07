export class LogRepository {
    constructor({ db }) {
        this.db = db;
    }

    async findAll() {
        return await this.db.get();
    }

    async save(line) {
        const row = {
            previousHash: line.previousHash,
            message: line.message,
            nonce: line.nonce,
        };
        await this.db.add(row);
        return line;
    }
}