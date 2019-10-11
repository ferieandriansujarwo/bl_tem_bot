function stringToRregex(text) {
  return new RegExp('^' + text, 'i');
}

function cohears() {
  bot.command.apply(bot, arguments);
  if (arguments[0] != null) {
    if (arguments[0] instanceof Array) {
      arguments[0] = arguments[0].map(x => x instanceof String ? stringToRregex(x) : x);
    } else {
      arguments[0] = stringToRregex(arguments[0]);
    }
  }
  bot.hears.apply(bot, arguments);
}

bot.cohears = cohears;
