const Encryptions = require("../../Applications/Security/Encryptions");
const AuthenticationError = require('../../Commons/Exepctions/AuthenticationError');

class EncryptionsBcrypt extends Encryptions{
    constructor({ bcrypt }){
        super();
        this._bcrypt = bcrypt;
    }

    async compare(plain, hashed){
        const result = await this._bcrypt.compare(plain, hashed);
    
        if (!result) {
          throw new AuthenticationError();
        }
    }
}

module.exports = EncryptionsBcrypt;