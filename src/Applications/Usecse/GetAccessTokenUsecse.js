class GetAccessTokenUsecse {
    constructor({ tokenize }){
        this._tokenize = tokenize;
    }

    async execute(refreshToken){
        const decodedData = await this._tokenize.decodeRefreshToken(refreshToken);
        const accessToken = await this._tokenize.createAccessToken(decodedData.id_user);
        if( (decodedData.exp - decodedData.iat ) > (60 * 60 * 24 * 15)){
            return {
                access_token: accessToken, 
                refresh_token: refreshToken
            };
        }
        const newRefreshToken = await this._tokenize.createRefreshToken(decodedData.id_user);
        return {
            access_token: accessToken, 
            refresh_token: newRefreshToken
        };
    }
}

module.exports = GetAccessTokenUsecse;