import winston from "winston";

export default ({ config }) => {
    const loggerConfig = {
        level: config.logging.level,
        transports: [
            new winston.transports.Console(),
        ]
    };
    return winston.createLogger(loggerConfig);
};