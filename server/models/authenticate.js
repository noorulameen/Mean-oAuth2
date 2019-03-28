var mem = require('../models/key.js')
var OAuth2Server = require('oauth2-server'),
Request = OAuth2Server.Request,
Response = OAuth2Server.Response;

module.exports = function (req, res, next) {
    function doAuthenticate() {
        let token = req.headers['authorization'];
        return new Promise(function (resolve, reject) {
            if (token.startsWith('Basic ') && req.originalUrl === "/todo/users/login") {
                console.log('coming!!!!!!!!')
                token = req.get("Authorization");
                token = token.slice(6);
                console.log(token);
                resolve(req);
            } else if (token.startsWith('Bearer ')) {
                console.log('need write validation');
                token = req.get("Authorization");
                token = token.slice(7);
                if (token) {
                    console.log('need write validation');
                    var request = new Request(req);
                    var response = new Response(res);
                    
                    oauth = new OAuth2Server({
                            model: mem,
                            accessTokenLifetime: 60 * 60,
                            allowBearerTokensInQueryString: true
                        });
                    return oauth.authenticate(request, response)
                            .then(function (token) {
                                next();
                            }).catch(function (err) {
                        res.status(err.code || 500).json(err);
                    });
                } else {
                    console.log('error');
                    reject({status: 405, message: 'Token not found'});
                }
            } else {
                console.log('error');
                reject({status: 405, message: 'Token not found'});
            }

        });
    }
    doAuthenticate().then(function (req) {
        next();
    }, function (errorresponds) {
        if (errorresponds) {
            res.status(errorresponds.status).send(errorresponds);
        }
    });

};