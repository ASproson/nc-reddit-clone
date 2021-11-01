const db = require('../connection');
const format = require('pg-format');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  return (db
    .query(`DROP TABLE IF EXISTS articles, comments, topics, users;`)
    .then(() => {
      return db
      .query(`
        CREATE TABLE topics (
          slug        VARCHAR(50) PRIMARY KEY, 
          description VARCHAR(255) NOT NULL
        );`)
    })
    .then(() => {
      return db
      .query(`
        CREATE TABLE users (
          username    VARCHAR(50) NOT NULL PRIMARY KEY,
          avatar_url  VARCHAR(255),
          name        VARCHAR(50) NOT NULL
      );`)
    })
    .then(() => {
      return db
      .query(`
        CREATE TABLE articles (
          article_ID  SERIAL PRIMARY KEY,
          title       VARCHAR(255) NOT NULL,
          body        VARCHAR(10000) NOT NULL,
          votes       INT DEFAULT 0,
          topic       VARCHAR(50) NOT NULL REFERENCES topics(slug),
          author      VARCHAR(50) NOT NULL REFERENCES users(username),
          created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`)
    })
    .then(() => {
      return db
      .query(`
        CREATE TABLE comments (
          comment_id  SERIAL PRIMARY KEY,
          author      VARCHAR(50) NOT NULL REFERENCES users(username),
          article_id  INT NOT NULL REFERENCES articles(article_id),
          votes       INT DEFAULT 0,
          created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          body        VARCHAR(500) NOT NULL
      );`)
    })
    // 2. insert data
    .then(() => {
      const sqlInsert = format(`INSERT INTO topics (slug, description) VALUES %L RETURNING *;`,
        topicData.map((topic) => { return [topic.slug, topic.description] }));
      return db.query(sqlInsert);
    })
    .then(() => {
      const sqlInsert = format(`INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`, 
        userData.map((user) => { return [user.username, user.avatar_url, user.name] }));
      return db.query(sqlInsert)
    })
    .then(() =>{
      const sqlInsert = format(`INSERT INTO articles (title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
        articleData.map((article) => { return [article.title, article.body, article.votes, article.topic, article.author, article.created_at] }));
      return db.query(sqlInsert);
    })
    .then(() =>{
      const sqlInsert = format(`INSERT INTO comments (author, article_id, votes, created_at, body) VALUES %L RETURNING *;`,
        commentData.map((comment) => { return [comment.author, comment.article_id, comment.votes, comment.created_at, comment.body] }));
      return db.query(sqlInsert)
    })
  )
};

module.exports = seed;
