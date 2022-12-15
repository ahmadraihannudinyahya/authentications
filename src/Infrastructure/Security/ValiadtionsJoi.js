const Validations = require("../../Applications/Security/Validations");
const InvariantError = require('../../Commons/Exepctions/InvariantError')

class ValiadtionsJoi extends Validations{
    constructor({ joi }){
        super();
        this._joi = joi;
    }

    async validateLoginPayload(payload){
        const schema = this._joi.object({
            email: this._joi.string().email().required(),
            password: this._joi.string().min(8).required(),
        });

        const validationResult = schema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = ValiadtionsJoi;