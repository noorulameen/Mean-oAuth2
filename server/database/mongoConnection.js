"use strict";
const dbConfig = require('../config/dbConfig');

let test = {
		url :'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.hostname + ':' + dbConfig.port + '/' + dbConfig.database
}

module.exports = test;

