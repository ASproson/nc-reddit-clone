const apiRouter = require('express').Router();
const topicsRouter = require('../routes/topics-router.js');
const articlesRouter = require('../routes/articles-router.js');
const commentsRouter = require('../routes/comments-router.js');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;