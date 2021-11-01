const db = require('../connection');
const format = require('pg-format');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // 2. insert data
  return db
  .query(`DROP TABLE IF EXISTS topicData;`)
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS articleData;`)})
  .then(() => { 
    return db.query(`DROP TABLE IF EXISTS userData;`)})
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS commentData;`)})
  
};

module.exports = seed;
