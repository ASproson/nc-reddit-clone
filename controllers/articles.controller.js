const { selectArticles } = require('../models/articles.model');

exports.getArticles = (req, res, next) => {
    const {  } = req.query;
    selectArticles()
    .then((article) => {
        res.status(200).send({article});
    })
    .catch(next);
}