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
        });
    describe('GET /api/articles/:article_id', () => {
        it('status:200, responds with specified article_id and all fields from articles with a COUNT of all comments related to that article_id', () => { // ✅
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
                expect(body.article).toEqual(
                    expect.objectContaining({
                        article_id:     1,
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
        // Could add additional test to verify comment_count, JSON.parse() to convert str to int
        it('status:400, when passed an invalid article_id data type not within the database', () => { //✅
            return request(app)
            .get('/api/articles/NaN')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('invalid data type');
            })
        });
        it('status:404, when passed an invalid article_id not in database', () => { //✅
            return request(app)
            .get('/api/articles/1000000000000')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('article not found');
            })
        })
    });
    describe('PATCH /api/articles/:article_id', () => {
        it('status:200, updates the votes with addition on an article, and responds with said article', () => { //✅
            return request(app)
            .patch('/api/articles/1')
            .send( { 'inc_votes': 100 })
            .expect(200)
            .then(({ body }) => {
                expect(body.article.votes).toBe(200);
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
            })
        })
        it('status:200, updates the votes with subtraction on an article, and responds with said article', () => { //✅
            return request(app)
            .patch('/api/articles/1')
            .send( { 'inc_votes': -100 })
            .expect(200)
            .then(({ body }) => {
                expect(body.article.votes).toBe(0);
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
            })
        })
        it('status:404, when passed an invalid article_id not in database', () => { //✅
            return request(app)
            .patch('/api/articles/1000000000000')
            .send( { 'inc_votes': -100 })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('article not found');
            })
        })
        it('status:400, when passed an invalid vote data type', () => { //✅
            return request(app)
            .patch('/api/articles/1')
            .send( { 'inc_votes': 'Not a number' })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('invalid data type');
            })
        })
    });
    describe('GET api/articles?sort_by', () => {
        it('status:200, sorts articles by created_at by default', () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles).toBeSortedBy('created_at', {descending: false});
            })
        })
        // it('status:200, sorts articles by valid column passed by user and returns articles', () => {

        // })

    })
});

