const ValiadtionsJoi = require('../ValiadtionsJoi');
const joi = require('joi');

describe('ValiadtionsJoi test', () => {
    describe('validateLoginPayload method test', () => {
        it('should not thow error when payload match format', async () => {
            const payload = {
                email: 'test@mail.com', 
                password: 'superSecretPass', 
            };

            const valiadtionsJoi = new ValiadtionsJoi({
                joi: joi
            });

            await expect(valiadtionsJoi.validateLoginPayload(payload)).resolves.not.toThrowError();
        });
        it('should thow error when payload not match format', async () => {
            const payload = {
                email: 'testuser', 
                password: 'superSecretPass', 
            };

            const valiadtionsJoi = new ValiadtionsJoi({
                joi: joi
            });

            await expect(valiadtionsJoi.validateLoginPayload(payload)).rejects.toThrowError();
        });
    });
});