var userController = require('../controller/userController');
/* GET users listing. */

module.exports = function(router) {
    router.route('/login').post(function (req, res) {
        userController.login(req, res);
    }),

    router.route('/logout').post(function (req, res) {
        res.status(200).send({ auth: false, token: null });
    })
}



//module.exports = router;
