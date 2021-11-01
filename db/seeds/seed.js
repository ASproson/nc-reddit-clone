const db = require('../connection');
const format = require('pg-format');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  return db
  .query(`DROP TABLE IF EXISTS articleData, commentData, topicData, userData;`)
  .then(() => {
    return db
    .query(`
      CREATE TABLE topicData (
        slug        VARCHAR(50) PRIMARY KEY, 
        description VARCHAR(255) NOT NULL
      );`)
  })
  .then(() => {
    return db
    .query(`
      CREATE TABLE userData (
        username    VARCHAR(50) NOT NULL PRIMARY KEY,
        avatar_url  VARCHAR(255),
        name        VARCHAR(50) NOT NULL
    );`)
  })
  .then(() => {
    return db
    .query(`
      CREATE TABLE articleData (
        article_ID  SERIAL PRIMARY KEY,
        title       VARCHAR(255) NOT NULL,
        body        VARCHAR(10000) NOT NULL,
        votes       INT DEFAULT 0,
        topic       VARCHAR(50) NOT NULL REFERENCES topicData(slug),
        author      VARCHAR(50) NOT NULL REFERENCES userData(username),
        created_at  DATE DEFAULT CURRENT_TIMESTAMP
      );`)
  })
  .then(() => {
    return db
    .query(`
      CREATE TABLE commentData (
        comment_id  SERIAL PRIMARY KEY,
        author      VARCHAR(50) NOT NULL REFERENCES userData(username),
        article_id  INT NOT NULL REFERENCES articleData(article_id),
        votes       INT DEFAULT 0,
        created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        body        VARCHAR(500) NOT NULL
    );`)
  })
  // 2. insert data
  .then(() => {
    const sqlInsert = format(`INSERT INTO topicData (slug, description) VALUES %L RETURNING *;`,
      topicData.map((topic) => { return [topic.slug, topic.description] }));
    return db.query(sqlInsert);
  })
  .then(() => {
    const sqlInsert = format(`INSERT INTO userData (username, avatar_url, name) VALUES %L RETURNING *;`, 
      userData.map((user) => { return [user.username, user.avatar_url, user.name] }));
    return db.query(sqlInsert)
  })
  .then(() =>{
    const sqlInsert = format(`INSERT INTO articleData (title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
      articleData.map((article) => { return [article.title, article.body, article.votes, article.topic, article.author, article.created_at] }));
    return db.query(sqlInsert);
  })
  .then(() =>{
    const sqlInsert = format(`INSERT INTO commentData (author, article_id, votes, created_at, body) VALUES %L RETURNING *;`,
      commentData.map((comment) => { return [comment.author, comment.article_id, comment.votes, comment.created_at, comment.body] }));
    return db.query(sqlInsert);
  })
};

module.exports = seed;
