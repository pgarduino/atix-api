import { Hasher } from './Hasher.js';

export class ProofOfWork {
    constructor({ previousHash, message, nonce = 0 }) {
        this.previousHash = previousHash;
        this.message = message;
        this.nonce = nonce;
        this.hash = '';
    }

    generateHash() {
        return Hasher.sha256(this.previousHash + this.message + this.nonce);
    }

    async work(difficulty) {
        return new Promise((resolve) => {
            setImmediate(async () => {
                this.nonce++;
                this.hash = this.generateHash();
                if (this.hash.substring(0, difficulty) === Array(difficulty + 1).join("0")) {
                    resolve({ hash: this.hash, nonce: this.nonce })
                } else {
                    resolve(await this.work(difficulty))
                }
            })
        })
    }

}