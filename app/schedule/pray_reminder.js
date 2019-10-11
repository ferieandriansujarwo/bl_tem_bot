const schedule = require('node-schedule');
const moment = require('moment');
const prayFunction = require('../function/pray');
require('axios-debug-log');

schedule.scheduleJob({hour: 3, minute: 0}, () => {
  initPrayJob();
});
initPrayJob();


function initPrayJob() {
  console.log('initPrayJob');
  prayFunction.fetchPraySchedule()
    .then(response => {
      if (response.status === 200) {
        prayFunction.updatePraySchedule(response.data.jadwal.data);
        return true;
      } else {
        throw new Error(response);
      }
    })
    .then(() => {
      const name = ['Dzuhur', 'Ashar', 'Maghrib'];
      const weekend = ['Saturday', 'Sunday', 'Sabtu', 'Minggu'];
      const { date, pray, now } = prayFunction.getVars();

      if (weekend.includes(now.format('dddd'))) return;

      Object.entries(pray).forEach((v,i) => {
        const prayTime = moment(`${date} ${v[1]}`);
        if (now.unix() < prayTime.unix() && name.includes(v[0]))
          createPrayReminder(v);
      });
    })
    .catch(err => {
      console.log('err on prayScheduler', err);
    });
}

function createPrayReminder(data) {
  const { now } = prayFunction.getVars();
  let response = `Sholat <b>${data[0]}</b> dulu kuy!`;
  let time = data[1];
  const fridays = ['Friday', 'Jumat'];
  if (fridays.includes(now.format('dddd')) && data[0] === 'Dzuhur') {
    response = 'Sholat <b>Jum\'at</b> dulu kuy!';
    time = moment(time, 'hh:mm').subtract(20, 'minutes').format('hh:mm');
  }

  const prayTime = time.split(':');
  const date = new Date();
  const rule = {
    second: 0,
    minute: parseInt(prayTime[1]),
    hour: parseInt(prayTime[0]),
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };

  schedule.scheduleJob(rule, () => {
    GROUPS.forEach(room => {
      console.log('Pray', room.chat_id, response);
      bot.telegram.sendMessage(room.chat_id, response, {parse_mode: 'HTML'});
    });
  });
}
