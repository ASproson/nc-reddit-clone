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
        it('status:200, sorts articles by created_at by default, newest articles first', () => { //✅
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles).toBeSorted('created_at', { descending: true });
                expect(body.articles.length).toBeGreaterThanOrEqual(1);
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
        it('status:200, sorts articles by valid votes column passed by user and returns articles', () => { //✅
            return request(app)
            .get('/api/articles?sort_by=votes')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles).toBeSorted('votes', { descending: true });
            })
        })
        it('status:200, sorts articles by valid author column passed by user and returns articles', () => { //✅
            return request(app)
            .get('/api/articles?sort_by=author')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles).toBeSorted('author', { descending: true });
            })
        })
        it('status:200, sorts articles by valid title column passed by user and returns articles', () => { //✅
            return request(app)
            .get('/api/articles?sort_by=title')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles).toBeSorted('title', { descending: true });
            })
        })
        it('status:200, sorts articles by valid topic column passed by user and returns articles', () => { //✅
            return request(app)
            .get('/api/articles?sort_by=topic')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles).toBeSorted('topic', { descending: true });
            })
        })
        it('status:200, sorts articles by valid comment_count column passed by user and returns articles', () => { //✅
            return request(app)
            .get('/api/articles?sort_by=comment_count')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles).toBeSorted('comment_count', { descending: true });
            })
        })
        it('status:400, when passed an invalid column to sort by', () => { // ✅1
            return request(app)
            .get('/api/articles?sort_by=not_a_column')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('invalid request');
            })
        })
        describe('GET api/articles/order_by', () => {
            it('status:200, accepts valid order by query', () => { //✅
                return request(app)
                .get('/api/articles?order=ASC')
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles).toBeSorted('created_at', { descending: false});
                })
            })
            it('status:400, when passed invalid order_by query', () => { //✅
                return request(app)
                .get('/api/articles?order=NotAnOrderBy')
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe('invalid request');
                })
            })
        })
        describe('GET api/articles/topic_filter', () => {
            it('status:200, accepts valid topic value and filters by said topic', () => { //✅
                return request(app)
                .get('/api/articles?topic=cats')
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles.length).toEqual(1);
                    body.articles.forEach((article) => {
                        expect(article).toEqual(
                            expect.objectContaining({
                                article_id:     expect.any(Number),
                                author:         expect.any(String),
                                title:          expect.any(String),
                                body:           expect.any(String),
                                topic:          'cats',
                                created_at:     expect.any(String),
                                votes:          expect.any(Number),
                                comment_count:  expect.any(String)
                            })
                        )
                    })
                })
            })
            it('status:404, when passed invalid topic', () => { //✅
                return request(app)
                .get('/api/articles?topic=invalidTopic')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('topic not found');
                })
            })
            it('status:200, when passed a valid topic but said topic has no articles', () => { //✅
                return request(app)
                .get('/api/articles?topic=paper')
                .expect(200)
                .then(({ body }) => {
                    expect(body).toEqual({ "articles": [] });
                })
            })
        })
    })
    describe('GET /api/articles/:article_id/comments', () => {
        it('status:200, responds with an array of comments related to passed article_id', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles.length).toEqual(11);
                body.articles.forEach((article) => {
                    expect(article).toEqual(
                        expect.objectContaining({
                            comment_id:     expect.any(Number),
                            votes:          expect.any(Number),
                            created_at:     expect.any(String),
                            author:         expect.any(String),
                            body:           expect.any(String)
                        })
                    )
                })
            })
        })
    })
});
