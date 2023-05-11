const express = require("express");
const Discord = require("discord.js");
require('dotenv').config();

const common = require('../utils/common/commonFuncs.js');
const praetor = require('../utils/praetorBotUtils/praetorUtils.js');

const app = express();
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

app.listen(8083, () => {
  console.log("Praetor is online!");
});

const praetorCommands = {
  'oh': 'Pls No',
  'for who': '***FOR THE REPUBLIC***',
  'bing': 'bong',
  'bong': "Barbarian! That's my line!",
  'fuck the 49ers': 'For life.'
};

const imperiumCommands = {
  'boticus, get the cross': 'Aye sir',
  'praise sol!': 'Bless the Imperium!',
  'boticus??': 'Apologies, I was fighting ***furries***.',
  'boticus': 'Sir.',
  'get the cross': 'Aye sir.'

}

var whatTheBotDo = (msg) => {
  var commands = Object.keys(praetorCommands);
  var returnStr = "Try sending ";
  commands.forEach(command => {
    returnStr += `'${command}', `;
  })
  returnStr = returnStr.slice(0, returnStr.length - 2)
  returnStr += ", 'tell me a story', 'do you have a business card?'."
  msg.channel.send(returnStr);
};

client.on("message", msg => {
  if (msg.author.id !== '936831625378037821') {
    if (praetorCommands[msg.content.toLowerCase()]) {
      msg.channel.send(praetorCommands[msg.content.toLowerCase()]);
    } else if (msg.content.toLowerCase() === "tell me a story") {
      // praetor.plagueis(msg);

      msg.channel.send('There once was an ugly barnacle. He was so ugly that everyone died. The end.');

    } else if (msg.content.toLowerCase() === 'do you have a business card?' && !common.botIds[msg.author.id]) {
      setTimeout(() => {
        msg.channel.send("https://i.imgur.com/1gP1Krn.jpg")
      }, 500);
    } else if (msg.member.roles.cache.has('857096434460786748')) {

      if (imperiumCommands[msg.content.toLowerCase()]) {
        msg.channel.send(imperiumCommands[msg.content.toLowerCase()]);

      } else if (praetorCommands[msg.content.toLowerCase()]) {
        msg.channel.send(praetorCommands[msg.content.toLowerCase()]);

      }
    }
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "what does praetor do?") {
    whatTheBotDo(msg);
  }
})

client.login(process.env.PRAETOR);