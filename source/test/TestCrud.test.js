const QueryUtils = require('../Controller/QueryDatabase')


describe('Test Escape', () => {

const Query = new QueryUtils
const QueryString = Query.AnalyseParamsAndReturnQuery('user', {'user': '12351'}, 'insert')

console.log(QueryString)


})
