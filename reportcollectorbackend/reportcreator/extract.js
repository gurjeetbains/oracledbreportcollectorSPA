const oracledb = require('oracledb');
const exportData=require('./report.js');
const dbqueries= require('./queries.js');
//console.log(dbqueries('2019-01','2018-12').loadBalance);
async function extractData(fromDate,toDate){
  try{
      let pool = await oracledb.getPool("Your oracle pool alias");
      let connection= await pool.getConnection();
      let intializeQueries = dbqueries(fromDate,toDate);
      let  allBatchJobs = await connection.execute(
        intializeQueries.allBatchJobs,[],
        { outFormat: oracledb.OBJECT });
      //exportToCSV(allBatchJobs,'allBatchJobs');
      exportData.addSheet('allBatchJobs',allBatchJobs);
      let loadBalance = await connection.execute(
        intializeQueries.popularBatchJobs,[],
        { outFormat: oracledb.OBJECT });
      //exportToCSV(loadBalance,'loadBalance');
      exportData.addSheet('loadBalance',loadBalance);
      await connection.close();
      return exportData.exportSheet();
  }catch(error){
    console.log(error);
  }
};
module.exports={
  extractData
}
