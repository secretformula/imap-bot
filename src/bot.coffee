require('source-map-support').install()

fs = require 'fs'
Imap = require 'imap'
_ = require 'underscore'

configFileContents = fs.readFileSync '/home/nigil/.imapbotrc.json'
daemonConfig = JSON.parse configFileContents

mailboxConnections = []

_.each daemonConfig.mailboxes, (mailbox) ->
  console.dir mailbox
  imapConnection = new Imap(
    user: mailbox.user
    password: mailbox.password
    host: mailbox.hostname
    port: mailbox.port
    tls: mailbox.secure
  )

  imapConnection.once 'ready', () ->
    console.log 'imap is ready'
    imapConnection.openBox 'INBOX', true,  (err, box) ->
      if err then throw err
      console.log 'inbox open'
      imapConnection.search ['UNSEEN', ['SINCE', 'July 3, 2014']], \
      (err, results) ->
        if err then throw err
        console.dir results

  imapConnection.connect()
  mailboxConnections.push imapConnection


