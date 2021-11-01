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
    });
    describe('GET /api/topics', () => {
        it('status:200, responds with an array of topics', () => { //✅
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
                expect(body.topics.length).toBe(3);
                body.topics.forEach((topic) => {
                    expect(topic).toEqual(
                        expect.objectContaining({
                            description: expect.any(String),
                            slug:        expect.any(String),
                        })
                    )
                })
            })
        });
        it('status:200, responds with specified article_id: author from users table, title, article_id, body, topic, created_at, votes, and comment_count (which is the count of all the comments with specified article_id', () => { // ❌
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
                console.log(body);
                expect(body.article).toEqual(
                    expect.objectContaining({
                        article_id:     expect.any(Number),
                        author:         expect.any(String),
                        title:          expect.any(String),
                        body:           expect.any(String),
                        topic:          expect.any(String),
                        created_at:     expect.any(String),
                        votes:          expect.any(Number),
                        comment_count:  expect.any(String)
                    })
                )
            })
        })
    });
});