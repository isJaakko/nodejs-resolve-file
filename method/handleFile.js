const XLSX = require('xlsx');
const path = require('path');

const resolveFile = (filename = 'data.xlsx') => {

  const pathname = path.join(__dirname, '../', 'upload-files', filename);
  console.log(pathname);
  
  const workbook = XLSX.readFile(pathname);
  const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
  // 根据表名获取对应某张表
  const worksheet = workbook.Sheets[sheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  return data;
}

module.exports = {
  resolveFile
}