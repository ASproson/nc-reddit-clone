const articlesRouter = require('express').Router();
const { getArticle, patchVotes, getSortedArticleList } = require('../controllers/articles.controller');

articlesRouter.route('/:article_id').get(getArticle).patch(patchVotes);
articlesRouter.route('/').get(getSortedArticleList);

module.exports = articlesRouter;