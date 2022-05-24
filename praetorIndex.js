const express = require("express");
const Discord = require("discord.js");
require('dotenv').config()

const app = express();
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

app.listen(8080, () => {
  console.log("For the Glory of Rome!");
})

app.get("/", (req, res) => {
  res.send("Ready");
})

client.on("message", msg => {
  if (msg.author.id !== '936831625378037821') {
    if (msg.content === "tell me a story") {
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
    } else if (msg.content === 'oh' || msg.content === 'Oh') {
      msg.channel.send('Pls No');
    } else if (msg.content === 'for who?') {
      msg.channel.send('***FOR THE REPUBLIC***');
    } else if (msg.content === ('bing')) {
      msg.channel.send('bong');
    } else if (msg.content === "bong") {
      msg.channel.send("Barbarian! That's my line!");
    } else if (msg.content === 'do you have a business card?' && msg.author.id !== '935614070957158410' && msg.author.id !== '935416368499675177') {
      setTimeout(() => {
        msg.channel.send({files: ["https://i.imgur.com/1gP1Krn.jpg"]})
      }, 500)
    } else if (msg.content.toLowerCase === 'where is rubix?') {
      msg.channel.send("Muted");
    }
  }
})

client.on("message", msg => {
  if (msg.content === "what does Praetor Boticus Maximus do?") {
    msg.channel.send("Try sending 'bing', 'tell me a story', 'oh', 'for who?', 'do you have a business card?', 'where is rubix?");
  }
})

client.login(process.env.PRAETOR);