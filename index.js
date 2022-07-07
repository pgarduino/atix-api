import container from './src/container.js'

const app = container.resolve('app');

app.start().catch((error) => {
    app.logger.error(error.stack);
    process.exit();
});

process.on('SIGINT', async () => {
    console.log("SIGINT received...");
    // app.logger.info('SIGINT received...');
    await app.stop();
    container.dispose();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log("SIGTERM received...");
    //app.logger.info('SIGTERM received...');
    await app.stop();
    container.dispose();
    process.exit(0);
});

process.on('uncaughtException', async () => {
    console.log("uncaughtException received...");
    // app.logger.info('uncaughtException received...');
    await app.stop();
    container.dispose();
    process.exit(0);
});
