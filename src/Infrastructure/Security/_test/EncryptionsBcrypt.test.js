const EncryptionsBcrypt = require('../EncryptionsBcrypt');
const bcrypt = require('bcrypt');

describe('EncryptionsBcrypt test', () => {
    describe('compare method test', () => {
        it('should not thow error when success compare', async () => {
            const plain = 'superSecretPass';
            const hashed = '$2b$12$enED54ZQ/qIToLr.AspJHebVJEOpMUXnmF3iGmqhl/QiwKeJTLaNS'; //encrypt from superSecretPass
            const encryptionsBcrypt = new EncryptionsBcrypt({
                bcrypt: bcrypt
            });

            await expect(encryptionsBcrypt.compare(plain, hashed)).resolves.not.toThrowError();
        });
        it('should thow error when fail compare', async () => {
            const plain = 'worngPass';
            const hashed = '$2b$12$enED54ZQ/qIToLr.AspJHebVJEOpMUXnmF3iGmqhl/QiwKeJTLaNS'; //encrypt from superSecretPass
            const encryptionsBcrypt = new EncryptionsBcrypt({
                bcrypt: bcrypt
            });

            await expect(encryptionsBcrypt.compare(plain, hashed)).rejects.toThrowError();
        });
    });
});