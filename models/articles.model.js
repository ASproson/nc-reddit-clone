const db = require('../db/connection.js');

exports.selectArticle = (id) => {

    const articleLength = `SELECT * FROM articles`;

    let articleQuery = `SELECT articles.*, COUNT(c.author) AS comment_count FROM articles`;
    const queryValues = [];

    if(id > articleLength.length){
        return Promise.reject({ status: 404, msg: 'article not found' })
    }
    if(id){
        articleQuery += 
        ` 
            LEFT OUTER JOIN comments AS c ON articles.article_id = c.article_id 
            WHERE articles.article_id = $1 GROUP BY articles.article_id;
        `;
        queryValues.push(id);
    }

    return db.query(articleQuery, queryValues)
    .then(({ rows }) => rows[0]);
}

exports.updateArticleVotesById = (id, inc_votes) => {

    const articleLength = `SELECT * FROM articles`;

    if(id > articleLength.length){
        return Promise.reject({ status: 404, msg: 'article not found' })
    } 

    if(typeof inc_votes !== 'number'){
        return Promise.reject({ status: 400, msg: 'invalid data type' })
    }

    let updateQuery = `UPDATE articles SET votes = votes +$1 WHERE article_id = $2 RETURNING *`
    let queryValues = [inc_votes, id];

    return db.query(updateQuery, queryValues)
    .then(({ rows }) => rows[0])
}