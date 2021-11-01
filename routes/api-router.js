const apiRouter = require('express').Router();
const topicsRouter = require('../routes/topics-router.js');
const articlesRouter = require('../routes/articles-router.js');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;