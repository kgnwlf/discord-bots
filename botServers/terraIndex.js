const express = require("express");
const mongoose = require('mongoose');
const { Client, Intents } = require("discord.js");
require('dotenv').config();

const common = require('../utils/common/commonFuncs.js');
const schema = require('../utils/common/commonSchema.js');
const terra = require('../utils/terraBotUtils/terraFuncs.js');

const app = express();
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

app.listen(8081, () => {
  console.log("Terra bot is online!");
});

var react = false;
var poll = false;
var parrot = false;
var aOrB = false;

var hangman = {
  status: false,
  word: '',
  display: '',
  guesses: {
    letters: [],
    words: [],
    number: 0
  }
};

let terraCommands, modCommands, reactions, id;

let blink = 'https://tenor.com/view/will-smith-men-in-black-gif-4907321';

client.on('ready', async () => {
  await mongoose.connect('mongodb://localhost:27017/terra');

  // let terraBotCommands = new schema.commands({
  //   bot: 'terra',
  //   reactions: reactions,
  //   neutralCommands: terraCommands,
  //   partyCommands: modCommands,
  //   misc: {'NONE HERE': 'YET'}
  // });

  // console.log(terraBotCommands);

  // await terraBotCommands.save();

  // console.log('done')

  let dbCommands = await schema.commands.find({bot: 'terra'});

  dbCommands = dbCommands[0];

  terraCommands = dbCommands.neutralCommands;
  modCommands = dbCommands.partyCommands;
  reactions = dbCommands.reactions;
  id = dbCommands._id;

  // console.log(modCommands);
  console.log(terraCommands);

  // await schema.commands.updateOne({ bot: 'terra' }, { $set: { neutralCommands: terraCommands } });
  // await schema.commands.updateOne({ bot: 'terra' }, { $set: { partyCommands: modCommands } })


});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			return;
		}
	}

  if (reaction.message.author.id === '935416368499675177') {
    let msgContent = reaction.message.content.toLowerCase();

    if (msgContent.includes('playstation role')) {
      common.giveRole(user.id, '857670905743147048', client);

    } else if (msgContent.includes('xbox role')) {
      common.giveRole(user.id, '857670639716270110', client);

    } else if (msgContent.includes('switch role')) {
      common.giveRole(user.id, '858539883689672734', client);

    } else if (msgContent.includes('pc role')) {
      common.giveRole(user.id, '857671055980101682', client);

    } else if (reaction.message.content.toLowerCase().includes('market role')) {
      common.giveRole(user.id, '983901311013638164', client);

    }

  }
});

client.on('messageReactionRemove', async (reaction, user) => {

  if (reaction.message.author.id === '935416368499675177') {
    let msgContent = reaction.message.content.toLowerCase();

    if (msgContent.includes('playstation role')) {
      common.removeRole(user.id, '857670905743147048', client);

    } else if (msgContent.includes('xbox role')) {
      common.removeRole(user.id, '857670639716270110', client);

    } else if (msgContent.includes('switch role')) {
      common.removeRole(user.id, '858539883689672734', client);

    } else if (msgContent.includes('pc role')) {
      common.removeRole(user.id, '857671055980101682', client);

    } else if (reaction.message.content.toLowerCase().includes('market role')) {
      common.removeRole(user.id, '983901311013638164', client);

    }
  }
});

client.on("message", msg => {
  console.log(msg.content)

  if (msg.guild.id === '857035524716232744') { // CHECK FOR PIONEER ROLE

    if (!msg.member.roles.cache.has('857095884319752222')) {
      msg.member.roles.add('857095884319752222');
    }

    if (react) { // ADD REACTIONS
      if (reactions[msg.author.id]) {
        msg.react(reactions[msg.author.id]);
      }
    }

    if (parrot && msg.author.id === '823739605424668702' || parrot && msg.author.id === '704002978234761296') {
      msg.channel.send(msg.content);
    }

    if (msg.author.id === '935416368499675177' && poll) {
      poll = false;

      msg.react('👍');
      msg.react('👎');
    } else if (msg.author.id === '935416368499675177' && aOrB) {
      aOrB = false;

      msg.react('🅰️');
      msg.react('🅱️');
    }

    // REPLY TO SPECIFIC MESSAGES
    if (msg.author.id === '182930766483685376' && msg.content.includes('echo')) {

      let msgContent = msg.content.split(' ');
      msgContent.shift();
      client.channels.cache.get('935580742539419721').send(msgContent.join(' '));

    }

    if (terraCommands[msg.content.toLowerCase()]) {
      msg.channel.send(terraCommands[msg.content]);
    } else if (msg.content === "what does terra bot do?") {
      terra.whatTheBotDo(msg, terraCommands);
    } else if (msg.content.toLowerCase() === 'hi terra bot') {
      msg.channel.send(`Hi ${msg.author.username}`);
    } else if (msg.content.toLowerCase().includes('poll:') && msg.author.id !== '935416368499675177') {
      poll = true;

      let content = msg.content;

      msg.delete();

      content = content.split(' ');
      content.shift();
      content = content.join(' ');

      msg.channel.send(content);
    } else if (msg.content.toLowerCase().includes('ab:') && msg.author.id !== '935416368499675177') {
      aOrB = true;
      let ontoB = false;
      let a = [];
      let b = [];

      let content = msg.content;

      msg.delete();

      content = content.slice(4, content.length);
      content = content.split(' ');

      for (var i = 0; i < content.length; i++) {
        if (content[i] === 'or') {
          ontoB = true;
          continue;
        } else if (ontoB) {
          b.push(content[i])
        } else {
          a.push(content[i]);
        }
      }

      let response = `A: ${a.join(' ')} or B: ${b.join(' ')}`;
      msg.channel.send(response);

    } else if (msg.content.toLowerCase().includes('where is') && msg.author.id !== '935416368499675177') {
      msg.channel.send(Math.floor(Math.random() * 5000) + ', ' + Math.floor(Math.random() * 60) + ', ' + Math.floor(Math.random() * 5000));

    } else if (msg.content.toLowerCase().includes('start hangman') || hangman.status && msg.author.id !== '935416368499675177') {
      // if (!common.botIds[msg.author.id] && msg.content.includes('guess:') || msg.content.includes('check:')) {
      //   terra.handleHangman(msg, hangman, client);

      // }

      msg.channel.send('Hangman hurts to play, maybe later.');

    }

    // COMMANDS FOR MODS
    console.log('checking for mod');
    console.log(msg.content.includes(modCommands[msg.content.toLowerCase()]));
    console.log(modCommands[msg.content.toLowerCase()])
    if (modCommands[msg.content.toLowerCase()] || msg.content.includes(modCommands[msg.content.toLowerCase()])) {
      console.log('mod command');
        if (msg.member.roles.cache.has('877005135421796413')) {

          if (msg.content === blink || msg.content === 'purge') {
            msg.channel.messages.fetch({limit: 100}).then(messages => msg.channel.bulkDelete(messages.filter(m => common.botIds[m.author.id])));

          } else if (msg.content.toLowerCase() === 'parrot') {
            parrot = !parrot;

            if (parrot) {
              msg.channel.send('Parroting.');
            } else {
              msg.channel.send('Parroting off.');
            }
          } else if (msg.content.toLowerCase() === 'toggle reactions') {
            react = !react;

            if (react) {
              msg.channel.send('Reactions are on.');
            } else {
              msg.channel.send('Reactions are off.');
            }
          } else if (msg.content.toLowerCase().split(' ')[0] === 'command:') {
            console.log('lets create a command')
            let key = [];
            let value = [];
            let ontoValue = false;

            let msgContent = msg.content.split(' ');

            msgContent.shift();

            for (var i = 0; i < msgContent.length; i++) {
              if (msgContent[i] === 'response:') {
                ontoValue = true;
              } else if (ontoValue) {
                value.push(msgContent[i]);

              } else {
                key.push(msgContent[i]);

              }
            }

            terraCommands[key.join(' ')] = value.join(' ');

            msg.channel.send(`"${value.join(' ')}" will be the response to "${key.join(' ')}"`);
          }


      } else {
        msg.channel.send('https://cdn.discordapp.com/attachments/935580742539419721/979793289781837874/IMG_4282.gif');
      }
    };

  } else if (!common.botIds[msg.author.id]) {
    msg.channel.send("You'll have to pay Rhi#5705 a significant amount of money to make me acknowledge messages in this Discord.");
  }
});

client.login(process.env.TERRA);

/*

Future improvements:
Randomly assign roles for tribunals, rule debate

*/