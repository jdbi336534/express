var express = require('express');
var router = express.Router();
var query = require('../lib/mysql.js');

// 分页查询/sizegroups?row=10&page=4
router.get('/', async(req, res, next) => {
    if (req.query.row || req.query.page) {
        let start = req.query.row * (req.query.page - 1);
        let end = parseInt(req.query.row);
        let querylang = `select * from sizegroups limit ${start},${end}`;
        let dataList = await query(querylang);
        let total = await query('select count(1) from sizegroups');
        let obj = {
            code: 200,
            dataList,
            total: total[0]['count(1)']
        };
        res.send(obj);
    } else {
        let dataList = await query('select * from sizegroups');
        let total = await query('select count(1) from sizegroups');
        let obj = {
            code: 200,
            dataList,
            total: total[0]['count(1)']
        };
        res.send(obj);
    }
});
/*
 *修改
 *1.Content-Type: application/json
 *{
 *  "id": "1",
 *  "number": "010",
 * "name": "090",
 *  "sizess": "12&&23&&34&&45"
 *}
 *2.Content-Type: application/x-www-form-urlencoded
 *id=1&number=010&name=090&sizess=12%26%2623%26%2634%26%2645
 */
router.post('/edit', async(req, res, next) => {
    // res.send(req.body);
    let id = req.body.id;
    let number = req.body.number;
    let name = req.body.name;
    let sizess = req.body.sizess;
    let querylang = `update sizegroups set number='${number}',name='${name}',sizess='${sizess}' where id=${id}`;
    let dataList = await query(querylang);
    let obj = {};
    if (dataList.affectedRows == 1) {
        res.send({
            code: 200,
            msg: dataList.message
        });
    } else {
        res.send({
            code: 400,
            msg: dataList.message
        });
    }
    res.send(obj);
});
/*
 *新增
 *1.Content-Type: application/json
 *{
 *  "number": "010",
 * "name": "090",
 *  "sizess": "12&&23&&34&&45"
 *}
 *2.Content-Type: application/x-www-form-urlencoded
 *number=010&name=090&sizess=12%26%2623%26%2634%26%2645
 */
router.post('/new', async(req, res, next) => {
    let number = req.body.number;
    let name = req.body.name;
    let sizess = req.body.sizess;
    let queryrepeat = `select * from sizegroups where number ='${number}'`;
    let repeat = await query(queryrepeat);
    if (repeat.length == 0) {
        let querylang = `insert into sizegroups(number, name, sizess) values('${number}', '${name}', '${sizess}')`;
        let dataList = await query(querylang);
        if (dataList.affectedRows == 1) {
            res.send({
                code: 200,
                msg: dataList.message
            });
        } else {
            res.send({
                code: 400,
                msg: dataList.message
            });
        }
    } else {
        res.send({ code: 400, msg: '重复添加！' });
    }
});
/*
 *删除
 *1.Content-Type: application/json
 *{
 *  "id": "010",
 *}
 *2.Content-Type: application/x-www-form-urlencoded
 *id=10
 */
router.post('/delete', async(req, res, next) => {
    let id = req.body.id;
    let queryhas = `select * from sizegroups where id ='${id}'`;
    let has = await query(queryhas);
    if (has.length == 0) {
        res.send({
            code: 400,
            msg: '数据库无此条记录！'
        });
    } else {
        let querylang = `delete from sizegroups where id=${id}`;
        let dataList = await query(querylang);
        if (dataList.affectedRows == 1) {
            res.send({
                code: 200,
                msg: dataList.message
            });
        } else {
            res.send({
                code: 400,
                msg: dataList.message
            });
        }
    }
});
module.exports = router;
