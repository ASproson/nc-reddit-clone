const { selectTopics } = require('../models/topics.model');

exports.getTopics = (req, res, next) => {
    const { description, slug } = req.query;
    selectTopics(description, slug)
    .then((topics) => {
        res.status(200).send({topics});
    })
    .catch(next);
}