// Generated by CoffeeScript 1.10.0
(function() {
  var Recorder, RobinHoodWatcher, Spooky, config;

  Spooky = require('spooky');

  config = require('config');

  Recorder = require('./recorder');

  RobinHoodWatcher = (function() {
    function RobinHoodWatcher(gameUrl, callback) {
      var spooky;
      console.log("watch start " + gameUrl);
      this.gameUrl = gameUrl;
      this.callback = callback;
      spooky = new Spooky({
        child: {
          transport: 'http'
        },
        casper: {
          logLevel: 'debug',
          verbose: true,
          remoteDebuggerAutorun: true,
          remoteDebuggerPort: 9000,
          pageSettings: {
            javascriptEnabled: true
          }
        },
        clientScripts: ["build/client/viewer.js"]
      }, (function(_this) {
        return function(err) {
          var e;
          if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
          }
          spooky.on('game-is-ready', function(data) {
            Recorder.push(_this.gameUrl, data);
            return _this.callback(data);
          });
          spooky.start(_this.gameUrl, function() {
            var func;
            func = (function() {
              var data;
              console.log('interval func');
              try {
                data = JSON.parse(this.fetchText("#robinhood-info-module"));
                return this.emit('game-is-ready', data);
              } catch (undefined) {}
            }).bind(this);
            setInterval(func, 5000);
            return this.wait(100000, function() {
              this.capture('out/result.png', {
                top: 0,
                left: 0,
                width: 2000,
                height: 1000
              });
              return console.log('done');
            });
          });
          spooky.run();
          spooky.on('error', function(e, stack) {
            console.error(e);
            if (stack) {
              return console.log(stack);
            }
          });
          spooky.on('console', function(line) {
            return console.log(line);
          });
          spooky.on('remote.message', function(message) {
            return console.log(message);
          });
          return spooky.on("page.error", function(msg, trace) {
            this.echo("Error:    " + msg, "ERROR");
            this.echo("file:     " + trace[0].file, "WARNING");
            this.echo("line:     " + trace[0].line, "WARNING");
            this.echo("function: " + trace[0]["function"], "WARNING");
            return errors.push(msg);
          });
        };
      })(this));
    }

    return RobinHoodWatcher;

  })();

  module.exports = RobinHoodWatcher;

}).call(this);
