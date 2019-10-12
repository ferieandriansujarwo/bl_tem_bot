bot.help((ctx) => {
  const message = ctx.update.message || ctx.update.callback_query.message;

  let res = '<b>Perintah yang tersedia:</b>\n';
  res += 'cc [group] - panggil semua orang yang dibutuhkan\n';
  res += '/jadwal_sholat - melihat jadwal sholat harian\n';
  ctx.reply(res, {reply_to_message_id: message.message_id, parse_mode: 'HTML'});
});
