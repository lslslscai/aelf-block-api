/**
 * @file
 * @author huangzongzhe
 * 2018.08
 */
const Service = require('egg').Service;

class AllService extends Service {

    async getAllBlocks(options) {

        const aelf0 = this.ctx.app.mysql.get('aelf0');
        const {limit, page, order} = options;
        if (['DESC', 'ASC', 'desc', 'asc'].includes(order)) {
            const offset = limit * page;
            // let getBlocksSql = `select SQL_CALC_FOUND_ROWS * from blocks_0 ORDER BY block_height ${order} limit ? offset ?`;
            let getBlocksSql = `select * from blocks_0 ORDER BY block_height ${order} limit ? offset ?`;
            // let getCountSql = `SELECT FOUND_ROWS()`;
            let getCountSql = 'select count(*) from blocks_0';
            // return sql;
            // aelf0.
            let blocks = await aelf0.query(getBlocksSql, [limit, offset]);
            let count = await aelf0.query(getCountSql);
            // let result = await aelf0.query('select * from blocks_0 ORDER BY block_height ASC limit 10 offset 0');
            return {
                // total: count[0]["FOUND_ROWS()"],
                total: count[0]['count(*)'],
                blocks: blocks
            };
        }
        return '傻逼，滚。';
    }

    async getAllTransactions(options) {
        const aelf0 = this.ctx.app.mysql.get('aelf0');
        const {limit, page, order} = options;
        if (['DESC', 'ASC', 'desc', 'asc'].includes(order)) {
            const offset = limit * page;
            // let getTxsSql = `select SQL_CALC_FOUND_ROWS * from transactions_0 ORDER BY block_height ${order} limit ? offset ? `;
            let getTxsSql = `select * from transactions_0 ORDER BY block_height ${order} limit ? offset ? `;
            // let getCountSql = `SELECT FOUND_ROWS()`;
            let getCountSql = 'select count(*) from transactions_0';
            // return sql;
            let txs = await aelf0.query(getTxsSql, [limit, offset]);
            let count = await aelf0.query(getCountSql);
            // let result = await aelf0.query('select * from blocks_0 ORDER BY block_height ASC limit 10 offset 0');
            return {
                total: count[0]['count(*)'],
                transactions: txs
            };
        }
        return '傻逼，滚。';
    }
}

module.exports = AllService;