const Tokenize = require("../../Applications/Security/Tokenize");
const AuthenticationError = require("../../Commons/Exepctions/AuthenticationError");

class TokenizeJwt extends Tokenize{
    constructor({jwt}){
        super();
        this._jwt = jwt;
    }

    async createAccessToken(id_user){
        return new Promise((resolve, reject) => {
            const token = this._jwt.sign({
                id_user, 
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                iss: 'testApp'
            }, process.env.ACCESS_TOKEN_KEY );

            resolve(token)
        })
    }

    async createRefreshToken(id_user){
        return new Promise((resolve, reject) => {
            const token = this._jwt.sign({
                id_user, 
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
                iss: 'testApp'
            }, process.env.REFRESH_TOKEN_KEY );
            
            resolve(token)
        })
    }

    async decodeRefreshToken(token){
        return new Promise((resolve, reject) => {
            try {
                const decoded = this._jwt.verify(token, process.env.REFRESH_TOKEN_KEY );
                resolve(decoded)
            } catch (error) {
                reject(new AuthenticationError())
            }
        })
    }
}

module.exports = TokenizeJwt;