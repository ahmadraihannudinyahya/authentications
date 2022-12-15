class Tokenize {
    createAccessToken(user_id) {
        throw new Error('Tokenize_Security_Is_Abstract_Class')
    }

    createRefreshToken(user_id) {
        throw new Error('Tokenize_Security_Is_Abstract_Class')
    }

    decodeRefreshToken(token) {
        throw new Error('Tokenize_Security_Is_Abstract_Class')
    }
}

module.exports = Tokenize;