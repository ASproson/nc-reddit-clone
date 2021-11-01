const articlesRouter = require('express').Router();
const { getArticles } = require('../controllers/articles.controller');

articlesRouter.route('/:article_id').get(getArticles);

module.exports = articlesRouter;