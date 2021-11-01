const db = require('../db');

exports.selectTopics = () => {
    return db
    .query(`SELECT * FROM topics`)
    .then(({ rows }) => rows);
}