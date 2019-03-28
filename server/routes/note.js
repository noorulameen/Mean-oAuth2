var userController = require('../controller/note');


/* GET users listing. Writing from noorul */

module.exports = function(router) {    
    router.route('/notes').post(function (req, res) { 	
        userController.create(req, res);
    }),
    
    router.route('/getnotes').get(function (req, res) {
        userController.findAll(req, res);
    }),

    router.route('/notes/:noteId').get(function (req, res) {
        userController.findOne(req, res);
    }),
    
    router.route('/notes/:noteId').put(function (req, res) {
        userController.update(req, res);
    }),

    router.route('/notes/:noteId').delete(function (req, res) {
        userController.delete(req, res);
    })

}



