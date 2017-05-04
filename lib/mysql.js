const mysql = require('mysql');
// 创建数据池
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'jdbi336534',
//     database: 'testjdb',
//     port: 3306
// });

const pool = mysql.createPool({
    host: '172.16.1.134',
    user: 'root',
    password: 'root',
    database: 'b',
    port: 3306
});
// 在数据池中进行会话操作
let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = query;
