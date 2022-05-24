const express = require("express");
const Discord = require("discord.js");
require('dotenv').config();

const app = express();
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

app.listen(8080, () => {
  console.log("Praetor is online!");
});

const praetorCommands = {
  'oh': 'Pls No',
  'for who': '***FOR THE REPUBLIC***',
  'bing': 'bong',
  'bong': "Barbarian! That's my line!"
};

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
      setTimeout(() => {
        msg.channel.send('Have you ever heard the Tragedy of Darth Plagueis the Wise?')
      }, 250);
      setTimeout(() => {
        msg.channel.send('I thought not.\n\n');
      }, 2500);
      setTimeout(() => {
        msg.channel.send("It's not a story the Jedi would tell you. It's a Sith legend.");
      }, 4000);
      setTimeout(() => {
        msg.channel.send('Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep.')
      }, 6500);
      setTimeout(() => {
        msg.channel.send('Ironic.')
      }, 12000);
      setTimeout(() => {
        msg.channel.send('He could save others from death, but not himself.')
      }, 13500);
    } else if (msg.content.toLowerCase() === 'do you have a business card?' && msg.author.id !== '935614070957158410' && msg.author.id !== '935416368499675177') {
      setTimeout(() => {
        msg.channel.send("https://i.imgur.com/1gP1Krn.jpg")
      }, 500);
    }
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "what does praetor do?") {
    whatTheBotDo(msg);
  }
})

client.login(process.env.PRAETOR);