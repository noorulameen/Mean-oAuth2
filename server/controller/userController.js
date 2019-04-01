const User = require('../models/users.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
OAuth2Server = require('oauth2-server'),
        Request = OAuth2Server.Request,
        Response = OAuth2Server.Response;


var mem = require('../models/key.js')

var todoUser = {

    login: function (req, res) {
        User.findOne({username: req.body.username}, function (err, user) {
            if (!user) {
               return res.status(404).send({
                    message: "Wrong username " + req.body.username
                });
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (!isMatch) {
                        res.status(404).send({
                            message: "Wrong password " + req.body.password
                        });
                    } else {
                        console.log('coming')
                        oauth = new OAuth2Server({
                            model: mem,
                            accessTokenLifetime: 60 * 60,
                            allowBearerTokensInQueryString: true
                        });
                        var request = new Request(req);
                        var response = new Response(res);

                        oauth.token(request, response)
                                .then(function (token) {
                                    res.json(token);
                                }).catch(function (err) {
                            console.log('er>>>>>r', err);
                            res.status(err.code || 500).json(err);
                        });
                    }

                });
            }
        });
    },

}





module.exports = todoUser;
