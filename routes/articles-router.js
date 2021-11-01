const articlesRouter = require('express').Router();
const { getArticles } = require('../controllers/articles.controller');

articlesRouter.get('/', getArticles);

module.exports = articlesRouter;