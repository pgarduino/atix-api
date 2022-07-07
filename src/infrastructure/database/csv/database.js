import fs from "fs";
import { join } from "path";

import { CsvStorage } from './storage.js'

export class CsvDatabase {
    constructor({ dbConfig }) {
        const { path, filename, delimiter, headers } = dbConfig;
        const filePath = join(path, filename);
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, headers.join(delimiter) + '\n');
        }
        // flush content
        if (dbConfig.flush) {
            fs.writeFileSync(filePath, headers.join(delimiter) + '\n');
        }
        this.storage = new CsvStorage(filePath, headers, delimiter);
    }

    async add(data) {
        const rows = data instanceof Array ? data : [data];
        if (rows.length < 1) return rows;
        await this.storage.append(rows);
        return rows;
    }

    async get() {
        const rows = [];
        const addData = (array, data) => array.push(data);
        const events = {
            onData: data => addData(rows, data)
        };
        await this.storage.read(events);
        return rows;
    }
}