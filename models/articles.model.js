const db = require('../db/connection.js');

exports.selectArticles = (id) => {

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
    let updateQuery = `UPDATE articles SET votes = votes`;
    let queryValues = [];
    if(inc_votes > 0){
        updateQuery += ` +$1 WHERE article_id = $2 RETURNING *`;
        queryValues.push(id, inc_votes)
    } else {
        updateQuery += ` -$1 WHERE article_id = $2 RETURNING *`;
        queryValues.push(id, inc_votes)
    }
    console.log(updateQuery);
    console.log(queryValues);
    return db.query(updateQuery, queryValues)
    .then(({ article }) => article[0])
}