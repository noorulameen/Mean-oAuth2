///**
// * Configuration.
// */
const User = require('../models/users.js');

var config = {
    clients: [{
            id: 'application',
            clientId: 'application',
            clientSecret: 'secret',
            grants: [
                'password',
                'refresh_token'
            ],
            redirectUris: []
        }],
    confidentialClients: [{
            clientId: 'confidentialApplication',
            clientSecret: 'topSecret',
            grants: [
                'password',
                'client_credentials'
            ],
            redirectUris: []
        }],
    tokens: []
};

/*
 * Methods used by all grant types.
 */

var getAccessToken = function (token) {
    var tokens = config.tokens.filter(function (savedToken) {
        return savedToken.accessToken === token;
    });
    return tokens[0];
};

var getClient = function (clientId, clientSecret) {
    var clients = config.clients.filter(function (client) {
        return client.clientId === clientId && client.clientSecret === clientSecret;
    });
    var confidentialClients = config.confidentialClients.filter(function (client) {
        return client.clientId === clientId && client.clientSecret === clientSecret;
    });
    return clients[0] || confidentialClients[0];
};

var saveToken = function (token, client, user) {
    token.client = {
        id: client.clientId
    };
    token.user = {
        id: user.username || user.clientId
    };
    config.tokens.push(token);
    return token;
};

/*
 * Method used only by password grant type.
 */

var getUser = function (username, password) {
    return User
    .findOne({username: username})
    .then(function (user) {
      return  user;
    })
    .catch(function (err) {
      console.log("getUser - Err: ", err)
    });
};

/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function (client) {
    var clients = config.confidentialClients.filter(function (savedClient) {
        return savedClient.clientId === client.clientId && savedClient.clientSecret === client.clientSecret;
    });

    return clients[0];
};

/*
 * Methods used only by refresh_token grant type.
 */

var getRefreshToken = function (refreshToken) {
    var tokens = config.tokens.filter(function (savedToken) {

        return savedToken.refreshToken === refreshToken;
    });

    if (!tokens.length) {
        return;
    }

    var token = Object.assign({}, tokens[0]);
    token.user.username = token.user.id;

    return token;
};

var revokeToken = function (token) {
    config.tokens = config.tokens.filter(function (savedToken) {

        return savedToken.refreshToken !== token.refreshToken;
    });

    var revokedTokensFound = config.tokens.filter(function (savedToken) {

        return savedToken.refreshToken === token.refreshToken;
    });

    return !revokedTokensFound.length;
};



module.exports = {
    getAccessToken: getAccessToken,
    getClient: getClient,
    saveToken: saveToken,
    getUser: getUser,
    getUserFromClient: getUserFromClient,
    getRefreshToken: getRefreshToken,
    revokeToken: revokeToken
};