exports.handleCustoms = (err, req, res, next) => {
    if(err.status) {
    res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.handlePSQLErrors = (err, req, res, next) => {
    console.log('Inside handlePSQLErrors')
    if(err.code === '22P02'){
        res.status(400).send({msg: 'invalid data type' });
    } 
    else {
        next(err);
        // const { status, msg } = errorCodes[err.code]
        // res.status(status).send({ msg });
    }
}

exports.handle500s = (err, req, res, next) => {
    console.log('Inside handle 500s', err);
    res.status(500).send({msg: 'server error'});
}