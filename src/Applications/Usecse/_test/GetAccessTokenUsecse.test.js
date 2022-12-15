const GetAccessTokenUsecse = require('../GetAccessTokenUsecse');
const Tokenize = require('../../Security/Tokenize');

describe('GetAccessTokenUsecse test', () => {
    it('should orchestrating GetAccessTokenUsecse corectly with generate new access token', async () => {
        const refresh_token = 'old_refresh_token';

        const expectedDecodedToken = {
            id_user: 'testuser', 
            exp:  Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), //30 day expirations
            iat: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 25), //5 days ago
        };

        const expectedNewAccessToken = 'new_access_token';
        const expectedNewRefreshToken = 'new_refresh_token';

        const mockTokenize = new Tokenize();

        mockTokenize.decodeRefreshToken = jest.fn(() => {
            return Promise.resolve(expectedDecodedToken)
        });
        mockTokenize.createAccessToken = jest.fn(() => {
            return Promise.resolve(expectedNewAccessToken);
        });
        mockTokenize.createRefreshToken = jest.fn(() => {
            return Promise.resolve(expectedNewRefreshToken);
        });
        
        const getAccessTokenUsecse = new GetAccessTokenUsecse({
            tokenize: mockTokenize, 
        })

        const result = await getAccessTokenUsecse.execute(refresh_token);

        expect(mockTokenize.decodeRefreshToken).toBeCalledWith(refresh_token);
        expect(mockTokenize.createAccessToken).toBeCalledWith(expectedDecodedToken.id_user);
        expect(mockTokenize.createRefreshToken).toBeCalledWith(expectedDecodedToken.id_user);
        expect(result).toEqual({
            access_token: expectedNewAccessToken, 
            refresh_token: expectedNewRefreshToken, 
        });
    });

    it('should orchestrating GetAccessTokenUsecse corectly without generate new access token', async () => {
        const refresh_token = 'old_refresh_token';

        const expectedDecodedToken = {
            id_user: 'testuser', 
            exp:  Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), //30 day expirations
            iat: Math.floor(Date.now() / 1000),
        };

        const expectedNewAccessToken = 'new_access_token';

        const mockTokenize = new Tokenize();

        mockTokenize.decodeRefreshToken = jest.fn(() => {
            return Promise.resolve(expectedDecodedToken)
        });
        mockTokenize.createAccessToken = jest.fn(() => {
            return Promise.resolve(expectedNewAccessToken);
        });
        mockTokenize.createRefreshToken = jest.fn(() => {
            return Promise.resolve();
        });
        
        const getAccessTokenUsecse = new GetAccessTokenUsecse({
            tokenize: mockTokenize, 
        })

        const result = await getAccessTokenUsecse.execute(refresh_token);

        expect(mockTokenize.decodeRefreshToken).toBeCalledWith(refresh_token);
        expect(mockTokenize.createAccessToken).toBeCalledWith(expectedDecodedToken.id_user);
        expect(mockTokenize.createRefreshToken).not.toBeCalled();
        expect(result).toEqual({
            access_token: expectedNewAccessToken, 
            refresh_token, 
        });
    });
});
