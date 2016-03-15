var TelegramBot = require('node-telegram-bot-api');
var config = require('config');
var RobinHoodWatcher = require("./watcher");

var token = '167232741:AAHFF9i8Nl1QZhtgsYL3mLrcPvPw8PSfzKI';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.chat.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});

// Any kind of message
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    if (msg.text.match(/watch/)) {
        var url = msg.text.split("watch ")[1];
        RobinHoodWatcher(url, function(data){
            console.log("success callback");
            var arr = [];
            if (data["p1"]) {
                arr.push("П1 - " + data["p1"]);
            }


            if (data["x"]) {
                arr.push("X - " + data["x"]);
            }


            if (data["p2"]) {
                arr.push("П2 - " + data["p2"]);
            }

            bot.sendMessage(chatId, arr.join(", "));
        });
    } else {
      bot.sendMessage(chatId, ';)');
    }
});

