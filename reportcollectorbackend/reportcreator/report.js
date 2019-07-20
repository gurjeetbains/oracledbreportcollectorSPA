const XLSX = require('xlsx');
const fs = require('fs');
exportToCSV =(result,name)=>{
  let output=XLSX.utils.json_to_sheet(result.rows);
  var output_file_name = `${name}.csv`;
  var stream = XLSX.stream.to_csv(output);
  stream.pipe(fs.createWriteStream(__dirname + '/results/'+output_file_name));
}
let wb = XLSX.utils.book_new();
wb.Props = {
                Title: "Load Test Report",
                Author: "Gurjeet Bains",
                CreatedDate: new Date()
        };
addSheet = (sheetName,result) => {
  wb.SheetNames.push(sheetName);
  let output=XLSX.utils.json_to_sheet(result.rows);
  wb.Sheets[sheetName]=output;
}
exportSheet=()=>{
  return wb;
}
module.exports={
  addSheet,
  exportSheet,
  exportToCSV
}
