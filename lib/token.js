'use strict';

const BaseModel = require('./base');
const generateToken = require('./generateToken');

class TokenModel extends BaseModel {
    /**
     * Construct a TokenModel object
     * @method constructor
     * @param  {Object}    config
     * @param  {Object}    config.datastore         Object that will perform operations on the datastore
     * @param  {Number}    config.userId            The ID of the associated user
     * @param  {String}    config.hash              Hashed token value
     * @param  {String}    config.name              The token name
     * @param  {String}    config.description       The token description
     * @param  {String}    config.lastUsed          The last time the token was used (ISO String)
     */
    constructor(config) {
        super('token', config);
    }

    /**
     * Regenerate a token value, and return the value once
     * @method regenerate
     * @return {Promise}
     */
    regenerate() {
        let value;

        return generateToken.generateValue()
            .then((bytes) => {
                value = bytes;
                this.hash = generateToken.hashValue(bytes);

                return this.update();
            }).then((model) => {
                model.value = value;

                return model;
            });
    }
}

module.exports = TokenModel;