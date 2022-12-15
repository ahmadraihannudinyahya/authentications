const TokenizeJwt = require('../TokenizeJwt');
const jwt = require('jsonwebtoken');

describe('TokenizeJwt test', () => {
    describe('createAccessToken method test', () => {
        it('should create access token corectly', async () => {
            const user_id = 'test-user';

            const tokenizeJwt = new TokenizeJwt({
                jwt
            });
            const token = await tokenizeJwt.createAccessToken(user_id);
            expect(token).not.toBeFalsy();
        });
    });
    describe('createRefreshToken method test', () => {
        it('should create refresh token corectly', async () => {
            const user_id = 'test-user';

            const tokenizeJwt = new TokenizeJwt({
                jwt
            });
            const token = await tokenizeJwt.createRefreshToken(user_id);
            expect(token).not.toBeFalsy();
        });
    });
    describe('decodeRefreshToken method test', () => {
        it('should decode token corectly', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoidGVzdC11c2VyIiwiZXhwIjoxNjcxODY4MjIzLCJpYXQiOjE2NjkyNzYyMjN9.Lht-Z8_gIRlaf04NwHH7GufsY0h2AAZYWuGekB2szUI';
            const expectedIdUser = 'test-user';


            const tokenizeJwt = new TokenizeJwt({
                jwt
            });
            const decodedObkject = await tokenizeJwt.decodeRefreshToken(token);
            expect(decodedObkject).not.toBeFalsy();
            expect(decodedObkject.iat).not.toBeFalsy();
            expect(decodedObkject.exp).not.toBeFalsy();
            expect(decodedObkject.id_user).toEqual(expectedIdUser);
        });
    });
});