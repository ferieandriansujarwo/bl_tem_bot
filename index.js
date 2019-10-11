const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const dotenv = require('dotenv').config();
const require_directory = require('require-directory');
const express = require('express');

global.bot = new Telegraf(process.env.BOT_TOKEN, {username: process.env.BOT_USERNAME});
global.web  = express();
web.use(express.json());

// bot.telegram.getMe().then((botInfo) => {
//     bot.options.username = botInfo.username
//     console.log(bot.options.username)
// })
console.log(bot.options.username);
console.log('Bot is running...');

require_directory(module, 'app/utils');
require_directory(module, 'app/helper');
require_directory(module, 'app/variable');
require_directory(module, 'app/function');
require_directory(module, 'app/schedule');

web.listen(process.env.WEB_PORT);

bot.startPolling();
// bot.startWebhook('/shannon_aw_bot/process.env.bot', null, 5000)
