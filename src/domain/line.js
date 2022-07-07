import { ProofOfWork } from "./ProofOfWork.js";
import {Hasher} from "./Hasher.js";

export class Line {

    constructor({ message, previousHash, nonce = 0, hash = '' }) {
        this.message = message;
        this.previousHash = previousHash;
        this.nonce = nonce;
        this.proof = new ProofOfWork({ previousHash, message, nonce });
        this.hash = hash;
    }

    generateHash() {
        return Hasher.sha256(this.previousHash + this.message + this.nonce);
    }

    async push(difficulty) {
        return new Promise((resolve) => {
            setImmediate(async () => {
                const { hash, nonce } = await this.proof.work(difficulty);
                this.hash = hash;
                this.nonce = nonce;
                resolve(this)
            })
        });
    }
}