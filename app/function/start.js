bot.start((ctx) => {
  const message = ctx.update.message || ctx.update.callback_query.message;
  ctx.reply('Hi, coba ketik /help buat tau ini bot bisa apa aja');
});
