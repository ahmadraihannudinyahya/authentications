class LoginUserUseCase {
    constructor({
        encryptions, 
        tokenize, 
        validations, 
        usersRepository, 
    }){
        this._encryptions = encryptions;
        this._tokenize = tokenize;
        this._validations = validations;
        this._usersRepository = usersRepository
    }

    async execute(payload){
        await this._validations.validateLoginPayload(payload);
        const user = await this._usersRepository.getUserByEmail(payload.email);
        await this._encryptions.compare(payload.password, user.password);
        const [ access_token, refresh_token ] = await Promise.all([
            this._tokenize.createAccessToken(user.id_user), 
            this._tokenize.createRefreshToken(user.id_user)
        ]);
        return { access_token, refresh_token }
    }
}

module.exports = LoginUserUseCase;