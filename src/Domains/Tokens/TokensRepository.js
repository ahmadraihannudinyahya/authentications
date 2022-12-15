class TokensRepository {
    addToken(payload){
        throw new Error('Tokens_Repository_Is_Abstract_Class')
    }
}

module.exports = TokensRepository;