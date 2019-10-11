const fs = require('fs');
const json_location = 'app/data/person.json';

let persons = {};
if (fs.existsSync(json_location)) {
  persons = loadObjFromJson(json_location);
}

// Test Engineering Manager
const tem = [
  persons.ferie.username,
  persons.anang.username,
];

// Deployer
const core = [

];

// All
const all = [
  ...tem,
  ...core,
];

global.MEMBERS = {
  all,
  tem,
  core,
};
