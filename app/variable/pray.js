const fs = require('fs');
const json_location = 'app/data/pray.json';

let data_pray = {};
if (fs.existsSync(json_location)) {
  data_pray = loadObjFromJson(json_location);
}

global.PRAY_SCHEDULE = afterChange(data_pray, () => saveObjToJson(data_pray, json_location));
