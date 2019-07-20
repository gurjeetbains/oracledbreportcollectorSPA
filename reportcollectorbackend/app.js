const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const oracledb = require('oracledb');
const path = require('path');
const extraction = require('./routes/reportExtraction');

let router = express.Router();
const dbConfig = {
  poolAlias     : "Your Pool alias",//Oracle DB pool alias
  user          : "Your username",//Oracle DB username
  password      : "Your password",//Oracle DB password
  connectString : "Your connection string"//Oracle DB connection string
};
let connectionPools = oracledb.createPool(dbConfig);
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json())
app.set('view engine', 'html');
app.use(cors());
app.use('/',extraction);
app.get('/',(req,res)=>{
	res.render('index');
});
app.get('/*',(req,res)=>{
	res.redirect('/');
});
app.listen(4000,()=>{
    console.log('Server is lisening at port 4000!');
});
