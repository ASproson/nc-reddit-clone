const { selectArticle, updateArticleVotesById } = require('../models/articles.model');

exports.getArticle = (req, res, next) => {
    const { article_id: id } = req.params;
    selectArticle(id)
    .then((article) => {
        res.status(200).send({article});
    })
    .catch(next);
}

exports.patchVotes = (req, res, next) => {
    const { article_id: id } = req.params;
    const { inc_votes } = req.body;
    updateArticleVotesById(id, inc_votes)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch(next);
}