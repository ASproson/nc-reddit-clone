const { selectArticle, updateArticleVotesById, selectSortedArticles } = require('../models/articles.model');

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
    const { article_id, author, topic, created_at, votes, comment_count } = req.params;
    selectSortedArticles(article_id, author, topic, created_at, votes, comment_count)
    .then((articles) => {
        res.status(200).send({ articles })
    })
    .catch(next);
}