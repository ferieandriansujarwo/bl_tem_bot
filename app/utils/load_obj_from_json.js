const fs = require('fs');

global.loadObjFromJson = (json_location) => JSON.parse(fs.readFileSync(json_location, 'utf8'));
