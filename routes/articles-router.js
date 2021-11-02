const articlesRouter = require('express').Router();
const { getArticles, patchVotes } = require('../controllers/articles.controller');

articlesRouter.route('/:article_id').get(getArticles).patch(patchVotes);

module.exports = articlesRouter;