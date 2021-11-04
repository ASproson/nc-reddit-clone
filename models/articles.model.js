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

exports.selectSortedArticles = async (sort_by = 'created_at', order = 'DESC', topic) => {

    let articlesQuery = `
    SELECT 
        articles.*, 
        COUNT(c.author) AS comment_count 
    FROM articles
    LEFT OUTER JOIN comments AS c 
    ON articles.article_id = c.article_id`

    let queryValues = [];

    const validColumns = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'];
    const validOrders = ['ASC', 'DESC'];

    if(topic){
        articlesQuery += ` WHERE articles.topic = $1`
        queryValues.push(topic)
        const dbCheck = await db.query(`SELECT * FROM topics WHERE slug = $1;`, queryValues)
            if(dbCheck.rows.length === 0){
                return Promise.reject({ status: 404, msg: 'topic not found' });
            }
    }


    articlesQuery += ` GROUP BY articles.article_id`;

    if(!validColumns.includes(sort_by) || !validOrders.includes(order)){
        return Promise.reject({ status: 400, msg: 'invalid request' })
    }

    articlesQuery += ` ORDER BY ${sort_by} ${order}`

    
    return db.query(articlesQuery, queryValues)
    .then(( { rows }) => rows);
}

exports.selectArticleComments = (id) => {

    const regex = /\d+/;
    // let reg = /[0-9]/g;
    let matched = id.match(regex);
    console.log('MATCH', matched)


    const articleLength = `SELECT * FROM articles`;

    let articleQuery = `
        SELECT 
            comments.comment_id,
            comments.votes,
            comments.created_at,
            comments.author,
            comments.body
        FROM comments
        LEFT OUTER JOIN articles ON articles.article_id = comments.article_id
        `;

    let queryValues = [];

    if(id > articleLength.length || matched === 'null'){
        return Promise.reject({ status: 404, msg: 'article not found' })
    }

    if(id){
        articleQuery += ` WHERE articles.article_id = $1;`
        queryValues.push(id);
    }

    return db.query(articleQuery, queryValues)
    .then(({ rows }) => rows)
}