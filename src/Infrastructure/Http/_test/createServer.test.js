const request = require('supertest');
const createServer = require('../createServer');
const container = require('../../container');

describe('ServerExpress Http test', () => {
    it('should run server corectly', async () => {
        const app = createServer(container);
        const response = await request(app).get('/unhanledRoute');
        expect(response.statusCode).toEqual(404);
    });
    it('should response status code 500 when server error', async () => {
        const app = createServer({});
        const response = await request(app).get('/authentications/tokenize');
        expect(response.statusCode).toEqual(500);
    });
});