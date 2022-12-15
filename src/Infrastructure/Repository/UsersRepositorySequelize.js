const UsersRepository = require("../../Domains/Users/UsersRepository");
const AuthenticationError = require('../../Commons/Exepctions/AuthenticationError');

class UsersRepositorySequelize extends UsersRepository {
    constructor({ users }){
        super();
        this._users = users;
    }

    async getUserByEmail(email){
        const user = await this._users.findOne({
            where: {
                email
            }
        });
        if(!user){
            throw new AuthenticationError();
        }
        return user;
    }
}

module.exports = UsersRepositorySequelize;