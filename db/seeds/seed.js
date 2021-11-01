const db = require('../connection');
// const format = require('pg-format');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // 2. insert data
  return db
  .query(`DROP TABLE IF EXISTS articleData;`)
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS commentData;`)})
  .then(() => { 
    return db.query(`DROP TABLE IF EXISTS userData;`)})
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS topicData;`)})
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
        username    VARCHAR(50) PRIMARY KEY NOT NULL,
        avatar_url  VARCHAR(255),
        name        VARCHAR(50) NOT NULL
    );`)
  })
  .then(() => {
    return db
    .query(`
      CREATE TABLE articleData (
        article_ID SERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        body VARCHAR(255) NOT NULL,
        votes INT DEFAULT 0,
        topic VARCHAR(50) REFERENCES topicData(slug),
        author VARCHAR(50) REFERENCES userData(username),
        created_at DATE DEFAULT CURRENT_TIMESTAMP
      );`)
  })
  .then(() => {
    return db
    .query(`
      CREATE TABLE commentData (
        comment_id  SERIAL PRIMARY KEY,
        author      VARCHAR(50) REFERENCES userData(username),
        article_id  INT REFERENCES articleData(article_id),
        votes       INT DEFAULT 0,
        created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        body        VARCHAR(500) NOT NULL
    );`)
  })
};

module.exports = seed;
