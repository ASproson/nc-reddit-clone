const articlesRouter = require('express').Router();
const { getArticle, patchVotes, getSortedArticleList, getArticleComments, getPostedComment } = require('../controllers/articles.controller');

articlesRouter.route('/').get(getSortedArticleList);
articlesRouter.route('/:article_id').get(getArticle).patch(patchVotes);
articlesRouter.route('/:article_id/comments').get(getArticleComments).post(getPostedComment);

module.exports = articlesRouter;