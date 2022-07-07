import crypto from 'crypto'

export class Hasher {

    static sha256(input) {
        return crypto.createHash('sha256')
            .update(input, 'utf8')
            .digest('hex')
            .toString();
    }
}