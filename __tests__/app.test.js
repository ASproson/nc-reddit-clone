const db = require('../db/connection.js');
const request = require('supertest');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('app', () => {
    it('status:404 and responds with error message when passed an unknown path', () => { //✅
        return request(app)
        .get('/api/not-a-path')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('path not found');
        })
    })
});