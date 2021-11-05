const db = require('../db/connection.js');

exports.deleteCommentByID = (id) => {
    let deleteQuery = `DELETE FROM comments WHERE comment_id = $1;`
    let queryValues = [id];

    const commentsLength = 18;

    let numsOnly = /\d+/.test(id)

    if(id > commentsLength || numsOnly === false){
        return Promise.reject({ status: 404, msg: 'comment not found' })
    } 

    return db.query(deleteQuery, queryValues)
    .then(({ comment }) => comment)
}