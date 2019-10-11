const fs = require('fs');

global.saveObjToJson = (obj, json_location, callback = function(){}) => {
  const json = JSON.stringify(obj);
  fs.writeFile(json_location, json, 'utf8', callback);
  // console.log('Save to ' + json_location);
};
