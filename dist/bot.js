(function() {
  var Imap, configFileContents, daemonConfig, fs, mailboxConnections, _;

  require('source-map-support').install();

  fs = require('fs');

  Imap = require('imap');

  _ = require('underscore');

  configFileContents = fs.readFileSync('/home/nigil/.imapbotrc.json');

  daemonConfig = JSON.parse(configFileContents);

  mailboxConnections = [];

  _.each(daemonConfig.mailboxes, function(mailbox) {
    var imapConnection;
    console.dir(mailbox);
    imapConnection = new Imap({
      user: mailbox.user,
      password: mailbox.password,
      host: mailbox.hostname,
      port: mailbox.port,
      tls: mailbox.secure
    });
    imapConnection.once('ready', function() {
      console.log('imap is ready');
      return imapConnection.openBox('INBOX', true, function(err, box) {
        if (err) {
          throw err;
        }
        console.log('inbox open');
        return imapConnection.search(['UNSEEN', ['SINCE', 'July 3, 2014']], function(err, results) {
          if (err) {
            throw err;
          }
          return console.dir(results);
        });
      });
    });
    imapConnection.connect();
    return mailboxConnections.push(imapConnection);
  });

}).call(this);

//# sourceMappingURL=bot.js.map
