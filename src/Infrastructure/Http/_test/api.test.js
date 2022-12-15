const request = require('supertest');
const createServer = require('../createServer');
const container = require('../../container');
const { createRefreshToken, createAccessToken } = require('../../../../test_helper/TokenizeHelper')

describe('Http Api test', () => {
    describe('get /tokenize test', () => {
        it('should get accesss token corectly', async () => {
            const refreshToken = createRefreshToken('testuser');
            const app = createServer(container);
            const response = await request(app).get(`/authentications/tokenize?token=${refreshToken}`);
            const responseJson = JSON.parse(response.text);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.data.access_token).toBeDefined();
            expect(responseJson.data.refresh_token).toBeDefined();
            expect(responseJson.data.refresh_token).toEqual(refreshToken);
        });
        it('should get accesss token corectly with change refresh token', async () => {
            const refreshToken = createRefreshToken('testuser',  Math.floor(Date.now() / 1000) +  (60 * 60 * 24));
            const app = createServer(container);
            const response = await request(app).get(`/authentications/tokenize?token=${refreshToken}`);
            const responseJson = JSON.parse(response.text);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.data.access_token).toBeDefined();
            expect(responseJson.data.refresh_token).toBeDefined();
            expect(responseJson.data.refresh_token).not.toEqual(refreshToken);
        });
        it('should throw athentications error when send invalid refresh token', async () => {
            const refreshToken = createAccessToken('testuser');
            const app = createServer(container);
            const response = await request(app).get(`/authentications/tokenize?token=${refreshToken}`);
            const responseJson = JSON.parse(response.text);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Authentication Failed');
        });
    });
    describe('post /login test', () => {
        it('should login corectly', async () => {
            const payload = {
                email: 'test@mail.com', 
                password: 'superSecretPass', 
            };
            const app = createServer(container);
            const response = await request(app).post(`/authentications/login`).send(payload);
            const responseJson = JSON.parse(response.text);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.data.access_token).toBeDefined();
            expect(responseJson.data.refresh_token).toBeDefined();
        });
        it('should throw athentications error when send invalid payload', async () => {
            const payload = {
                email: 'test@mail.com', 
                password: 'superSecretPas', 
            };
            const app = createServer(container);
            const response = await request(app).post(`/authentications/login`).send(payload);
            const responseJson = JSON.parse(response.text);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Authentication Failed');
        });
    });
});