const apiRouter = require('express').Router();
const topicsRouter = require('../routes/topics-router.js');
const articlesRouter = require('../routes/articles-router.js');
const commentsRouter = require('../routes/comments-router.js');
const {getApi} = require('../controllers/endpoints.controller.js');

console.log(getApi)
apiRouter.route('/').get(getApi);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;