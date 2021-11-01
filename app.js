const app = require('express')();
const apiRouter = require('./routes/api-router');

app.use('/api', apiRouter);

app.all('/*', (req, res) => {res.status(400).send({msg: 'path not found'})});

module.exports = app;
