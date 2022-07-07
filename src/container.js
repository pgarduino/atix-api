import { createContainer, asClass, asFunction, asValue } from "awilix";

// dependencies
import { Application } from './application.js';
import { Server } from './interfaces/http/server.js';
import config from '../config/index.js';
import router from './interfaces/http/router.js';
import logger from './infrastructure/logging/logger.js';
import { CsvDatabase } from './infrastructure/database/csv/database.js';
import { LogRepository } from './infrastructure/repository/logRepository.js';
import { WriteLinkedLineUseCase } from './application/usecase/writeLinkedLine/writeLinkedLineUseCase.js';
import { LinkedLineController } from './interfaces/http/controller/linkedLineController.js';

const container = createContainer();
container
    .register({
        app: asClass(Application).singleton(),
        server: asClass(Server).singleton(),
        config: asValue(config),
        router: asFunction(router).singleton(),
        logger: asFunction(logger).singleton(),
        dbConfig: asValue(config.csv),
        db: asClass(CsvDatabase).singleton(),
        logRepository: asClass(LogRepository).singleton(),
        writeLinkedLineUseCase: asClass(WriteLinkedLineUseCase).singleton(),
        linkedLineController: asClass(LinkedLineController).singleton(),
    });

export default container;
