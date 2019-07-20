const express = require('express');
const router = express.Router();
const extractionData= require('./../reportcreator/extract.js');

router.post('/extractdata',(req,res)=>{
  let toDate = dateFormatter(req.body.StartPeriod);
  let fromDate = dateFormatter(req.body.EndPeriod);
  runs();
  async function runs(){
    let output = await extractionData.extractData(toDate,fromDate);
    res.send(output);
  }
});

dateFormatter = (str)=>{
  str = str.replace('T',' ');
  str = str.replace('-','/');
  str = str.replace('-','/');
  return str
}
module.exports = router;
