const { getEndpoints } = require('../models/api.model')

exports.getApi = (req, res, next) => {
    const endpoints = getEndpoints()
    .then(() => {
        res.status(200).send({ endpoints })
        .catch(next);
    })
}