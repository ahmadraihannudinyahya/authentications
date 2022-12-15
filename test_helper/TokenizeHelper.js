const jwt = require('jsonwebtoken');

module.exports = {
    createRefreshToken : (id_user, exp = Math.floor(Date.now() / 1000) +  (60 * 60 * 24 * 30)) => {
        return jwt.sign({
            id_user, 
            exp
        }, process.env.REFRESH_TOKEN_KEY );
    }, 
    createAccessToken : (id_user) => {
        return jwt.sign({
            id_user, 
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, process.env.ACCESS_TOKEN_KEY );
    }
}