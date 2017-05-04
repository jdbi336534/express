var express = require('express');
var router = express.Router();
var query = require('../lib/mysql.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/mysql', async(req, res, next) => {
    let dataList = await query('select * from nodejs');
    let total = await query('select count(1) from nodejs');
    let obj = {
        dataList,
        total: total[0]['count(1)']
    };

    res.send(obj);
});
router.get('/insert', function(req, res, next) {
    query('insert into nodejs values(6,"oliver2","changping2","2016-07-24")', function(err, vals, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                code: 200,
                msg: '新增成功！'
            });
        }
    });
});


module.exports = router;
