"use strict";

var isAuthenticated = require('../models/authenticate');
var express = require('express');
var routes = require('require-dir')();
var OAuth2Server = require('oauth2-server'),
Request = OAuth2Server.Request,
Response = OAuth2Server.Response;

module.exports = function(app) {
    var count=0;
    new Promise( function(done,reject)
    {
        // Initialize all routes
        Object.keys(routes).forEach(function(routeName) {
            count++;
            var router = express.Router();
            require('./' + routeName)(router);
            
            app.use('/todo/'+routeName, isAuthenticated,  router);//isAuthenticated
          //app.use('/todo/'+routeName,  router);
        });
    }).then(function ()
    {
        app.use('*', function(req, res){
            console.log('somebody hit with invalid url');
            var  response = {
                status: 500,
                message: "Invalid URL"
            };
            res.status(500).send(JSON.stringify(response));
        });

    });
    
};





