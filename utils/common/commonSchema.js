const mongoose = require('mongoose');

const commandsSchema = new mongoose.Schema({
  bot: String,
  reactions: mongoose.Schema.Types.Mixed,
  neutralCommands:  mongoose.Schema.Types.Mixed,
  partyCommands:  mongoose.Schema.Types.Mixed,
  misc:  mongoose.Schema.Types.Mixed
}, { collection: 'commandsAndUtils' });

const commands = mongoose.model('commandsAndUtils', commandsSchema);

module.exports = {
  commands
};