const app = require('express')();
const express = require('express');
const apiRouter = require('./routes/api-router');
const { handle500s, handleCustoms, handlePSQLErrors } = require('./errors.js')

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => { res.status(404).send({ msg: 'path not found' })});

app.use(handleCustoms);
app.use(handlePSQLErrors);
app.use(handle500s);

app.use(function(err, req, res, next) {
    console.log('App.JS Error log', err);
    res.status(500).send({msg: 'internal server error'});
});

module.exports = app;
