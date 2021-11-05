const db = require('../db/connection.js');

exports.deleteCommentByID = (id) => {
    let deleteQuery = `DELETE FROM comments WHERE comment_id = $1;`
    let queryValues = [id];

    const commentsLength = `SELECT * FROM comments`;

    if(id > commentsLength.length){
        return Promise.reject({ status: 404, msg: 'comment not found' })
    } 

    console.log(deleteQuery)

    return db.query(deleteQuery, queryValues)
    .then(({ comment }) => comment)
}