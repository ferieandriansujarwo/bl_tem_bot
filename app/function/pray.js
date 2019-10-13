const axios = require('axios');
const moment = require('moment');
require('axios-debug-log');

bot.hears([/^sholat yuk/i], (ctx) => {
  const message = ctx.update.message || ctx.update.callback_query.message;
  getCurrentPray()
    .then(response => {
      let res = `Sholat kuy! <b>${ response.name }</b>-nya tinggal <b>${response.minute}</b> menit lagi loh..`;
      if (response.minute === -1) {
        res = `<b>${ response.name }</b>-nya bisa di rumah kok :)`;
      }
      ctx.reply(res, {reply_to_message_id: message.message_id, parse_mode: 'HTML'});
    });
});

bot.command(['jadwal_sholat'], (ctx) => {
  const message = ctx.update.message || ctx.update.callback_query.message;
  let res = 'Jadwal kosong euy :(';
  preparePraySchedule()
    .then(data => {
      if (data.trim())
        res = data;
      else
        res = 'Jadwal besok belum diupdate';
    })
    .catch(err => {
      console.log('err on prayFunction:command', err.message);
    })
    .then(() => {
      ctx.reply(res, {reply_to_message_id: message.message_id, parse_mode: 'HTML'});
    });
});


async function getCurrentPray() {
  let current = '';
  let minute = 0;
  const { date, pray, now } = getVars();
  await Object.keys(pray)
    .map(i => {
      const prayTime = moment(`${date} ${pray[i]}`);
      if (now.unix() > prayTime.unix()) {
        current = i;

        if (Object.keys(pray).indexOf(i) == Object.keys(pray).length - 1) {
          minute = -1;
        } else {
          const nextPrayHour = Object.keys(pray)[Object.keys(pray).indexOf(current) + 1];
          const nextPrayTime = moment(`${date} ${pray[nextPrayHour]}`);
          minute = Math.round(nextPrayTime.diff(now, 'minutes', true));
        }
      }
    });
  return {
    name: current,
    minute
  };
}

async function preparePraySchedule() {
  const { date, pray, now } = getVars();
  return Object.keys(pray)
    .map(i => {
      const prayTime = moment(`${date} ${pray[i]}`);
      if (now.unix() < prayTime.unix())
        return `<b>${i}</b> jam ${PRAY_SCHEDULE[i]} WIB`;
      else
        return ' ';
    })
    .join('\n');
}

async function fetchPraySchedule() {
  const {
    SHOLAT_API_URL
  } = process.env;
  const { date } = getVars();
  return axios.get(`${SHOLAT_API_URL}/tanggal/${date}`);
}

async function updatePraySchedule(data) {
  const name = {
    subuh: 'Shubuh',
    dzuhur: 'Dzuhur',
    ashar: 'Ashar',
    maghrib: 'Maghrib',
    isya: 'Isya'
  };

  const formatted = await Object.keys(data)
    .reduce((r, a) => {
      if(name[a]) {
        r[name[a]] = data[a];
      }
      return r;
    }, {});

  Object.assign(PRAY_SCHEDULE, formatted);
}

function getVars() {
  return {
    date: moment().format('YYYY-MM-DD').toString(),
    pray: PRAY_SCHEDULE,
    now: moment(),
  };
}

module.exports = {
  updatePraySchedule,
  fetchPraySchedule,
  getVars,
};
