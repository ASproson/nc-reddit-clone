const db = require('../db/connection.js');

exports.selectArticles = (id) => {

    let articleQuery = `SELECT articles.*, COUNT(c.author) AS comment_count FROM articles`;
    const queryValues = [];
    if(id){
        articleQuery += ` 
        LEFT OUTER JOIN comments AS c ON articles.article_id = c.article_id 
        WHERE articles.article_id = $1 GROUP BY articles.article_id;
        `;
        queryValues.push(id);
    }

    return db.query(articleQuery, queryValues)

    // const queryStr = `
    //     SELECT 
    //         articles.*, 
    //         COUNT(c.author) AS comment_count 
    //     FROM articles 
    //     LEFT OUTER JOIN comments AS c ON articles.article_id = c.article_id 
    //     WHERE articles.article_id = $1 GROUP BY articles.article_id
    // `;
    // return db.query(queryStr, [id])



    .then(({ rows }) => rows[0]);
}