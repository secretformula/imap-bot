(function() {
  var Imap, Mailbox, configFileContents, daemonConfig, fs, mailboxes, _;

  fs = require('fs');

  Imap = require('imap');

  Mailbox = require('./mailbox');

  _ = require('underscore');

  configFileContents = fs.readFileSync('/home/nigil/.imapbotrc.json');

  daemonConfig = JSON.parse(configFileContents);

  mailboxes = [];

  _.each(daemonConfig.mailboxes, function(mailboxConfig) {
    var mailbox;
    console.dir(mailboxConfig);
    mailbox = new Mailbox(mailboxConfig);
    return mailboxes.push(mailbox);
  });

}).call(this);

//# sourceMappingURL=bot.js.map
