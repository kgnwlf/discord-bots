const express = require("express");
const Discord = require("discord.js");
require('dotenv').config();

const app = express();
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

app.listen(8082, () => {
  console.log("Acolyte ready!");
});

client.on("message", msg => {
  msg.react("<:praisethesun:879443542324428812>");
})

// client.on("message", msg => {
//   if (msg.author.id !== '935614070957158410' && msg.author.id !== '935416368499675177') {
//     setTimeout(() => {
//       msg.channel.send({files: ["https://i.imgur.com/1gP1Krn.jpg"]})
//     }, 1000);
//   }
// })

////////////////////////////////////////////////////

var msgIDs = ['933132744542781500', '933132826570809426', '921812547986944030'];

var blink = 'https://tenor.com/view/will-smith-men-in-black-gif-4907321';

client.on("message", msg => {
  // if (msg.content === "stop") {
  //   return;
  // //purges the bot messages from the last 100 messages
  // } else if (msg.content === blink || msg.content === 'purge') {
  //   msg.channel.messages.fetch({limit: 100}).then(messages => msg.channel.bulkDelete(messages.filter(m => m.author.id.includes('935614070957158410') || m.author.id.includes('935416368499675177'))));

  // //purges messages from yens server
  // } else if (msg.content === 'asdf') {
  //   msg.channel.send('Let the sun cleanse what was taken into the dark!')
  //   msg.channel.messages.fetch({limit: 100}).then(messages => msg.channel.bulkDelete(messages.filter(m => msgIDs.includes(m.id))))
  //   msg.delete();
  // } else if (msg.content.includes('bong')) {
  //   setTimeout(() => {msg.channel.send('bing')}, 850)
  // }

});

// client.on('message', msg => {
//   if (msg.type === 'REPLY' && msg.mentions.repliedUser.id === '935614070957158410' && msg.content === 'no') {
//     msg.channel.send('I thought not. \n\nIt’s not a story the Jedi would tell you. \n\nIt’s a Sith legend. \n\nDarth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.');
//   }
// });

client.login(process.env.SUNGOD);