#!/usr/bin/env node

import config from '../../../config/index.js';
import { CsvDatabase } from '../../../src/infrastructure/database/csv/database.js';
import { LogRepository } from '../../../src/infrastructure/repository/logRepository.js';
import { Line } from '../../../src/domain/line.js';

const checkLinkedLine = (rows) => {
    for (let i = 1; i < rows.length; i++) {
        const current = new Line(rows[i]);
        const previous = new Line(rows[i - 1]);

        if (current.previousHash !== previous.generateHash()) {
            return false;
        }
    }
    return true;
};

(async () => {
    let dbConfig = config.csv;
    dbConfig.flush = false;
    const db = new CsvDatabase( { dbConfig } );
    const repository = new LogRepository({ db });
    const rows = await repository.findAll();
    const result = checkLinkedLine(rows);
    console.log(result);
})();