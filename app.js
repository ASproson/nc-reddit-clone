const app = require('express')();
const apiRouter = require('./routes/api-router');

app.use('/api', apiRouter);

app.all('/*', (req, res) => {res.status(404).send({msg: 'path not found'})});

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send({msg: 'internal server error'});
});

module.exports = app;
