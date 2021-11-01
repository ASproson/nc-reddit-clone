const db = require('../db/connection.js');

exports.selectArticles = (id) => {
    return db
    .query(`        
    SELECT
        a.article_id,
        a.title,
        a.body,
        a.votes,
        a.topic,
        a.author,
        a.created_at,
        COUNT(c.author) AS comments_count
    FROM articles as AS a
    LEFT OUTER JOIN comments AS c
    ON a.article_id = c.article_id
    WHERE a.article_id = $1
    GROUP BY comments_count
    `, [id])
    .then(({ rows }) => rows);
}