const { selectArticle, updateArticleVotesById, selectSortedArticles, selectFilteredArticles } = require('../models/articles.model');

exports.getArticle = (req, res, next) => {
    const { article_id: id } = req.params;
    selectArticle(id)
    .then((article) => {
        res.status(200).send({ article });
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

exports.getSortedArticleList = (req, res, next) => {
    const { sort_by, order, topic } = req.query;
    selectSortedArticles(sort_by, order, topic)
    .then((articles) => {
        res.status(200).send({ articles })
    })
    .catch(next);
}