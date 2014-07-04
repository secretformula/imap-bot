# require('source-map-support').install()


fs = require 'fs'
Imap = require 'imap'
Mailbox = require './mailbox'
_ = require 'underscore'

configFileContents = fs.readFileSync '/home/nigil/.imapbotrc.json'
daemonConfig = JSON.parse configFileContents

mailboxes = []

_.each daemonConfig.mailboxes, (mailboxConfig) ->
  console.dir mailboxConfig
  mailbox = new Mailbox(mailboxConfig)
  mailboxes.push mailbox
