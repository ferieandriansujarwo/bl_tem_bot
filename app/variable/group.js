const fs = require('fs');
const json_location = 'app/data/group.json';

let groups = {};
if (fs.existsSync(json_location)) {
  groups = loadObjFromJson(json_location);
}

global.GROUPS = Object.values(groups);
