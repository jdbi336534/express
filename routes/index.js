var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.protocol === 'https') {
        res.render('index', {
            title: 'https'
        });
    } else {
        res.render('index', {
            title: 'Express'
        });
    }

});

module.exports = router;