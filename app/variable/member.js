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
  persons.aranda.username,
  persons.alifia.username,
  persons.genta.username,
  persons.mirza.username,
  persons.marlil.username,
  persons.damar.username,
  persons.arka.username,
  persons.adit.username,
];

// Head of Test Engineering
const hte = [
  persons.hadi.username,
];

// TE Architect
const arch = [
  persons.buddy.username,
  persons.raga.username,
  persons.sekar.username,
];

// TE Core
const core = [
  persons.aldo.username,
  persons.buddy.username,
  persons.fathir.username,
  persons.fadhli.username,
  persons.raga.username,
  persons.rasyid.username,
  persons.sekar.username,
  persons.irfan.username,
];

// TE Investment
const inv = [
  persons.fajar.username,
  persons.fitri.username,
  persons.faiq.username,
  persons.yanti.username,
];

// TE PNL
const pnl = [
  persons.ananda.username,
  persons.yudha.username,
  persons.tusi.username,
  persons.niken.username,
  persons.iwan.username,
];

// All
const all = [
  ...tem,
  ...hte,
  ...core,
];

global.MEMBERS = {
  all,
  tem,
  hte,
  arch,
  core,
  inv,
  pnl,
};
