// Generated by CoffeeScript 1.10.0
(function() {
  var RobinHoodWatcher, TelegramBot, bot, token;

  TelegramBot = require('node-telegram-bot-api');

  RobinHoodWatcher = require('./watcher');

  token = '167232741:AAHFF9i8Nl1QZhtgsYL3mLrcPvPw8PSfzKI';

  bot = new TelegramBot(token, {
    polling: true
  });

  bot.onText(/\/echo (.+)/, function(msg, match) {
    var fromId, resp;
    fromId = msg.chat.id;
    resp = match[1];
    return bot.sendMessage(fromId, resp);
  });

  bot.on('message', function(msg) {
    var chatId, url;
    chatId = msg.chat.id;
    if (msg.text.match(/watch/)) {
      url = msg.text.split('watch ')[1];
      return new RobinHoodWatcher(url);
    } else {
      return bot.sendMessage(chatId, ';)');
    }
  });

}).call(this);