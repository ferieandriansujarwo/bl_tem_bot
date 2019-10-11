const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agt',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const TIMEZONE_NAMES = {
  'UTC+0': 'GMT',
  'UTC+1': 'CET',
  'UTC+2': 'EET',
  'UTC+3': 'EEDT',
  'UTC+3.5': 'IRST',
  'UTC+4': 'MSD',
  'UTC+4.5': 'AFT',
  'UTC+5': 'PKT',
  'UTC+5.5': 'IST',
  'UTC+6': 'BST',
  'UTC+6.5': 'MST',
  'UTC+7': 'WIB',
  'UTC+8': 'WITA',
  'UTC+9': 'WIT',
  'UTC+9.5': 'ACST',
  'UTC+10': 'AEST',
  'UTC+10.5': 'ACDT',
  'UTC+11': 'AEDT',
  'UTC+11.5': 'NFT',
  'UTC+12': 'NZST',
  'UTC-1': 'AZOST',
  'UTC-2': 'GST',
  'UTC-3': 'BRT',
  'UTC-3.5': 'NST',
  'UTC-4': 'CLT',
  'UTC-4.5': 'VET',
  'UTC-5': 'EST',
  'UTC-6': 'CST',
  'UTC-7': 'MST',
  'UTC-8': 'PST',
  'UTC-9': 'AKST',
  'UTC-9.5': 'MIT',
  'UTC-10': 'HST',
  'UTC-11': 'SST',
  'UTC-12': 'BIT',
};

global.humanizeTime = function(timestamp, format = '%day%, %dd% %month% %yyyy%') {
  const dateTime = new Date(timestamp);
  let offset = -1 * dateTime.getTimezoneOffset() / 60;
  offset = `UTC${offset >= 0 ? `+${offset}` : offset}`;
  const timezone = TIMEZONE_NAMES[offset];
  const timeMapping = {
    '%hh%': `0${dateTime.getHours()}`.slice(-2),
    '%mi%': `0${dateTime.getMinutes()}`.slice(-2),
    '%dd%': `0${dateTime.getDate()}`.slice(-2),
    '%day%': DAYS[dateTime.getDay()],
    '%mm%': `0${dateTime.getMonth() + 1}`.slice(-2),
    '%mmm%': SHORT_MONTHS[dateTime.getMonth()],
    '%month%': MONTHS[dateTime.getMonth()],
    '%yy%': `${dateTime.getYear()}`.slice(-2),
    '%yyyy%': dateTime.getFullYear(),
    '%tz%': timezone,
  };
  return format.replace(/%(.*?)%/gi, n => timeMapping[n]);
};

global.getTimeMiliseconds = function(type = 'second') {
  const time = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
  };
  return time[type];
};
