bot.cohears([/(^|\s)call \w+/i, /cc[:]? \w+/i], (ctx) => {
  const registeredRoles = Object.keys(MEMBERS);
  const message = ctx.update.message || ctx.update.callback_query.message;
  const roles = message.text.split(' ')
    .map((msg) => msg.toLowerCase())
    .filter((value) => registeredRoles.includes(value))
    .filter((value, index, arr) => arr.indexOf(value) === index);

  let res = '';
  if (roles.length > 0) {
    res = 'Oi, ada yang nyariin niih!! cc:';
    roles.forEach((role) => {
      if (MEMBERS[role] instanceof Array) {
        res += ` @${MEMBERS[role].join(' @')}`;
      }
    });
  } else if (message.chat.type === 'private') {
    res = 'Maaf niih engga tau itu apa :(\n\n<b>Daftar nama grup yang tersedia:</b>\n';
    res += registeredRoles.join(', ');
  }

  if (res) {
    ctx.reply(res, {reply_to_message_id: message.message_id, parse_mode: 'HTML'});
  }
});
