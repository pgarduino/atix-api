import { Line } from './Line.js'
import config from '../../config/index.js';
import { Mutex } from 'async-mutex';

/** Class representing a linked line. */
export class LinkedLine {

    constructor(difficulty) {
        this.difficulty = difficulty;
        this.links = [ ];
        this.lock = new Mutex();
    }

    lastLine() {
        return this.links[this.links.length - 1];
    }

    async push(message) {
        return new Promise((resolve) => {
            setImmediate(async () => {
                const release = await this.lock.acquire();
                const lastLine = this.lastLine();
                const previousHash = lastLine ? lastLine.hash : config.line.defaultPreviousHash;
                const newLine = new Line({ message, previousHash });
                await newLine.push(this.difficulty);
                this.links.push(newLine);
                resolve(newLine);
                release();
            });
        });
    }

    isValid() {
        for (let i = 1; i < this.links.length; i++) {
            const current = this.links[i];
            const previous = this.links[i - 1];

            if (current.hash !== current.generateHash()) {
                return false;
            }
            if (previous.hash !== current.previousHash) {
                return false;
            }
        }
        return true;
    }
}