let active = true;

bot.hears(/^ga[sz]$/i, (ctx) => {
  sendReply(ctx, 'GAZZZ');
});

bot.hears([/^kuy/i, /^yuk/i], (ctx) => {
  sendReply(ctx, 'KUYKUY');
});


function sendReply(ctx, text) {
  if (!active) return;
  ctx.reply(text);
  toogleActive();
}

function toogleActive() {
  active = false;
  setTimeout(() => {
    active = true;
  }, 60000);
}
