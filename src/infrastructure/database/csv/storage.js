import * as fs from 'fs';
import * as csv from 'fast-csv';

export class CsvStorage {

    constructor( path, headers, delimiter) {
        this.path = path;
        this.headers = headers;
        this.delimiter = delimiter;
        this.writeOpts = { headers: this.headers, includeEndRowDelimiter: true };
    }

    static write(stream, rows, options) {
        return new Promise((resolve, reject) => {
            csv.writeToStream(stream, rows, options)
                .on('error', (err) => reject(err))
                .on('finish', () => resolve());
        });
    }

    append(rows) {
        return CsvStorage.write(fs.createWriteStream(this.path, { flags: 'a' }), rows, {
            ...this.writeOpts,
            writeHeaders: false,
        });
    }

    async read( events ) {
        const { path, delimiter } = this;
        return new Promise((resolve, reject) => {
            csv
                .parseFile(path, { delimiter, headers: true })
                .on("data", events.onData)
                .on("error", reject)
                .on("end", resolve);
        });
    }
}