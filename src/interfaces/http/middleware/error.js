export default (err, req, res) => {
    const { logger } = req.container.cradle;
    logger.error(err);

    res.status(500).json({
        type: 'InternalServerError',
        message: 'The server failed to handle this request'
    });
};