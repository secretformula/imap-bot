Imap = require 'imap'

class Mailbox
  constructor: (options) ->
    # TODO: Validate input parameters
    @imapConnection = new Imap(
      user: options.user
      password: options.password
      host: options.hostname
      port: options.port
      tls: options.secure
    )

    @imapConnection.once 'ready', (err) =>
      if err then throw err
      console.log 'Connected to server: %s', options.hostname
      @imapConnection.openBox 'INBOX', false, (err, box) =>
        if err then throw err

        @imapConnection.on 'mail', (id) ->
          console.log id
    @imapConnection.connect()

module.exports = Mailbox
