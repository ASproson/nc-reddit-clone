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

exports.selectSortedArticles = (sort_by = 'created_at', order = 'DESC') => {

    let articlesQuery = `
    SELECT 
        articles.*, 
        COUNT(c.author) AS comment_count 
    FROM articles
    LEFT OUTER JOIN comments AS c 
    ON articles.article_id = c.article_id 
    GROUP BY articles.article_id`

    const queryValues = [];

    const validColumns = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'];


    if(!sort_by && !order){
        articlesQuery += ` ORDER BY articles.created_at DESC`
    }
    if(!validColumns.includes(sort_by)){
        return Promise.reject({ status: 400, msg: 'invalid request' })
    }
    if(sort_by === 'author'){
        articlesQuery += ` ORDER BY author DESC`
    }
    if(sort_by === 'title'){
        articlesQuery += ` ORDER BY title DESC`
    }
    if(sort_by === 'article_id'){
        articlesQuery += ` ORDER BY article_id DESC`
    }
    if(sort_by === 'topic'){
        articlesQuery += ` ORDER BY topic DESC`
    }
    if(sort_by === 'created_at'){
        articlesQuery += ` ORDER BY created_at DESC`
    }
    if(sort_by === 'votes'){
        articlesQuery += ` ORDER BY votes DESC`
    }
    if(sort_by === 'comment_count'){
        articlesQuery += ` ORDER BY comment_count DESC`
    }

    return db.query(articlesQuery, queryValues)
    .then(({ rows }) => rows);
}