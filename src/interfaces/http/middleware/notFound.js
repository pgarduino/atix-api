export default (req, res) => {
    res.status(404).json({
        type: 'NotFound',
        message: 'Route does not exist'
    });
};