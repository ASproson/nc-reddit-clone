const { selectArticles } = require('../models/articles.model');

exports.getArticles = (req, res, next) => {
    const { article_id: id } = req.params;
    selectArticles(id)
    .then((article) => {
        res.status(200).send({article});
    })
    .catch(next);
}