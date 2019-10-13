bot.hears(/^ga[sz]$/i, (ctx) => {
  sendReply(ctx, 'GAZZZ' ,'text');
});

bot.hears([/^cot/i, /^bacot l[ou]$/i], (ctx) => {
  sendReply(ctx, 'Ampun bang :(', 'text');
});

bot.hears([/^keren/i, /^mantap/i, /^ntap/i, /^uwu/i], (ctx) => {
  sendReply(ctx, 'CAADBQADHAADEqpZEMO6Ksi8FJdKFgQ', 'sticker');
  sendReply(ctx, 'Lemes-in aja bang :)', 'text');
});

bot.hears([/^gagah/i], (ctx) => {
  sendReply(ctx, 'CAADBQADFwADIr01Eg3MTiqsluZ3FgQ', 'sticker');
  sendReply(ctx, 'okwokokwowk, Gagah perkasa!!!', 'text');
});

bot.hears([/^kuy/i, /^yuk/i], (ctx) => {
  sendReply(ctx, 'KUYKUY', 'text');
});

bot.hears([/^ijin sick leave/i, /^Ijin sakit/i], (ctx) => {
  sendReply(ctx, 'Cepet sembuh ya kamu :D', 'text');
});

function sendReply(ctx, value, type) {
  if (type === 'text') {
    ctx.reply(value);
  }else {
    ctx.replyWithSticker(value);
  }
}
