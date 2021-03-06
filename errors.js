exports.handleCustoms = (err, req, res, next) => {
    if(err.status) {
    res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.handlePSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: 'invalid data type' });
    } 
    else {
        next(err);
    }
}

exports.handle500s = (err, req, res, next) => {
    console.log('Inside handle 500s', err);
    res.status(500).send({msg: 'server error'});
}