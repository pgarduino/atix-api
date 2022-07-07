import { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser"
import compression from "compression";
import notFoundMiddleware from './middleware/notFound.js'
import errorMiddleware from './middleware/error.js'

export default ({ linkedLineController }) => {
    const router = Router();

    const apiRouter = Router();

    apiRouter
        .use(cors())
        .use(bodyParser.json())
        .use(compression());

    apiRouter.post('/linked-line', linkedLineController.write);

    router.use('/api', apiRouter);

    router
        .use(notFoundMiddleware)
        .use(errorMiddleware);

    return router;
};