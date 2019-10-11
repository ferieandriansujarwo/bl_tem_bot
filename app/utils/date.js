const moment = require('moment');

global.ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

global.isWeekend = (date) => {
  const day = moment(date).day();
  return day === 0 || day === 6;
};

global.splitByWeekend = (start, end) => {
  let begin = moment(start);
  const final = moment(end);
  const dates = [];
  let count = 0;
  while (final.diff(begin, 'days') >= 0) {
    const current = begin.day();
    const isWeekend = current === 0 || current === 6;
    if (!isWeekend) {
      const nextDay = moment(begin).add(1, 'days').day();
      const nextDayIsWeekend = nextDay === 0 || nextDay === 6;
      if (typeof dates[count] === 'undefined') {
        dates[count] = [];
        dates[count]['start'] = begin.format();
      }
      if (typeof dates[count]['start'] !== 'undefined') {
        dates[count]['end'] = begin.format();
      }
      if (nextDayIsWeekend) count++;
    }
    begin = moment(begin).add(1, 'days');
  }
  return dates;
};
