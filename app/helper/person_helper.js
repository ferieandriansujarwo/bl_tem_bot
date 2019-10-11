const persons = loadObjFromJson('app/data/person.json');

const getUser = (key) => {
  return persons[key];
};

const findUserByUsername = (username) => {
  const user = Object.values(persons).find(p => p.username === username);
  return user;
};

const findUserByName = (name) => {
  const user = Object.values(persons).find(p => p.name === name);
  return user;
};

module.exports = {
  findUserByUsername,
  findUserByName,
  getUser,
};
