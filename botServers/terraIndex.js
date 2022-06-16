const express = require("express");
const { Client, Intents } = require("discord.js");
require('dotenv').config();
const common = require('../utils/commonFuncs.js');
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

var blink = 'https://tenor.com/view/will-smith-men-in-black-gif-4907321';

const terraCommands = {
  'bing': 'bong',
  'can i get the seed to the realm?': 'lol, no.',
  'take me out to dinner': 'ayyyyooooo',
  'who is your favorite mod?': 'Boobject.',
  'who is your favourite mod?': 'Boobcat.',
  'what god do you worship?': 'The one true God, the Sun God <:praisethesun:879443542324428812>',
  'where is flerp?': 'who?',
  'who are burdened with glorious purpose?': 'Bobcat and Oh Pls No.',
  'where is rubix?': 'Some say he\'s dead, others say he\'s muted.',
  'where is traveler?': 'Being horny.',
  'what are you terra bot?': 'I\'m a bot that helps and entertains the people of Terra.',
  'what do we do with new people?': 'We eat them.',
  'what did pedro say?': 'Idk, he deleted it.',
  'where is the shopkeeper?': 'Probably at Walmart or the fortress.'
};

const modCommands = {
  'toggle reactions': 'toggle reactions',
  'parrot': 'parrot',
  'purge': 'purge',
  'https://tenor.com/view/will-smith-men-in-black-gif-4907321': 'https://tenor.com/view/will-smith-men-in-black-gif-4907321'
};

const reactions = {
  '823739605424668702': '<:Aye:932391784779231332>',
  '704002978234761296': '<:nohorny:879441537929453628>',
  '749292732920365186': '<:doubt:935305896165277758>',
  '277258154012835843': '<:praisethesun:879443542324428812>',
  '756776639853232138': '<:hmmhang:931307625533030410>',
  '182930766483685376': '<:pepesad:935726518578081862>',
  '982347783988215849': '<:pain:932391703455858698>'
};

const modIDs = {
  '749292732920365186': 'Bobcat',
  '277258154012835843': 'Object',
  '586549627667480621': 'Oh Pls No',
  '182930766483685376': 'Rhi'
}

//use indexOf to find if person is allowed in the server
const bannedIDs = ['92613585871581184','225454854892552194','865741136755949648','778172078314618930','932416042062454784','792548790501769226','344289425712349186','838521227382358017','898607216146399272','778258537201008670','258280240038543360','726052644355047494','811779947614044180','583419372408668169','663087618661023766','884245156100984932','884214336229347342','585097762299707402','836729183253299211','730957129967468704','778550387585187861','792443094833823754','605881628350349346','836999523896393738','759527976924217354','846840966697713728','280790589107208192','672961519058944001','717118525675667487','932419434696568943','180611136452952064','665619907207233599','562118561917698048'];

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
  if (msg.guild.id === '857035524716232744') {
    // CHECK FOR PIONEER ROLE
    if (!msg.member.roles.cache.has('857095884319752222')) {
      msg.member.roles.add('857095884319752222');
    }

    // ADD REACTIONS
    if (react) {
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
      terra.whatTheBotDo(msg);
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
      // if (!common.botIds[msg.author.id]) {
      //   terra.handleHangman(msg, hangman, client);

      // }

      msg.channel.send('Hangman hurts to play, maybe later.');

    }
    //commands for mods
    if (modCommands[msg.content.toLowerCase()]) {
        if (msg.member.roles.cache.has('877005135421796413')) {

          if (msg.content === blink || msg.content === 'purge') {
            msg.channel.messages.fetch({limit: 100}).then(messages => msg.channel.bulkDelete(messages.filter(m => m.author.id.includes('704002978234761296') || m.author.id.includes('935416368499675177'))));
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
Assign roles based on reaction to a message, opt-in roles

*/