(function() {
  var Imap, Mailbox;

  Imap = require('imap');

  Mailbox = (function() {
    function Mailbox(options) {
      this.imapConnection = new Imap({
        user: options.user,
        password: options.password,
        host: options.hostname,
        port: options.port,
        tls: options.secure
      });
      this.imapConnection.once('ready', (function(_this) {
        return function(err) {
          if (err) {
            throw err;
          }
          console.log('Connected to server: %s', options.hostname);
          return _this.imapConnection.openBox('INBOX', false, function(err, box) {
            if (err) {
              throw err;
            }
            return _this.imapConnection.on('mail', function(id) {
              return console.log(id);
            });
          });
        };
      })(this));
      this.imapConnection.connect();
    }

    return Mailbox;

  })();

  module.exports = Mailbox;

}).call(this);

//# sourceMappingURL=mailbox.js.map
