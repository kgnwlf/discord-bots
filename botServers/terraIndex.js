const express = require("express");
const Discord = require("discord.js");
require('dotenv').config();

const app = express();
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

app.listen(8081, () => {
  console.log("Terra bot is online!");
});

app.get("/", (req, res) => {
  res.send("Bot man online");
});

var react = false;

const terraCommands = {
  'bing': 'bong',
  'can i get the seed to the realm?': 'lol, no',
  'take me out to dinner': 'ayyyyooooo',
  'who is your favorite mod?': 'Boobject',
  'who is your favourite mod?': 'Boobcat',
  'what god do you worship?': 'The one true God, the Sun God <:praisethesun:879443542324428812>',
  'where is flerp?': 'who?',
  'who are burdened with glorious purpose?': 'Bobcat and Oh Pls No',
  'where is rubix?': 'Some say he\'s dead, others say he\'s muted'
}

const modIDs = {
  '749292732920365186': 'Bobcat',
  '277258154012835843': 'Object',
  '586549627667480621': 'Oh Pls No',
  '182930766483685376': 'Rhi'
}

//use indexOf to find if person is allowed in the server
const bannedIDs = ['92613585871581184','225454854892552194','865741136755949648','778172078314618930','932416042062454784','792548790501769226','344289425712349186','838521227382358017','898607216146399272','778258537201008670','258280240038543360','726052644355047494','811779947614044180','583419372408668169','663087618661023766','884245156100984932','884214336229347342','585097762299707402','836729183253299211','730957129967468704','778550387585187861','792443094833823754','605881628350349346','836999523896393738','759527976924217354','846840966697713728','280790589107208192','672961519058944001','717118525675667487','932419434696568943','180611136452952064','665619907207233599','562118561917698048'
];

var whatTheBotDo = (msg) => {
  var commands = Object.keys(terraCommands);
  var returnStr = "Try sending ";
  commands.forEach(command => {
    returnStr += `'${command}', `;
  })
  returnStr = returnStr.slice(0, returnStr.length - 2)
  returnStr += '.'
  msg.channel.send(returnStr);
};

client.on("message", msg => {
  if (react) {
    if (msg.author.id === '823739605424668702' || msg.author.id === '704002978234761296') {
      msg.react('<:nohorny:879441537929453628>');
    }
  }
});

client.on("message", msg => {
    if (terraCommands[msg.content.toLowerCase()]) {
      msg.channel.send(terraCommands[msg.content]);
    } else if (msg.content === "what does terra bot do?") {
      whatTheBotDo(msg);
    } else if (msg.content.toLowerCase() === 'hi terra bot') {
      msg.channel.send(`Hi ${msg.author.username}`);
    }
    //commands for mods
    if (modIDs[msg.author.id]) {
      if (msg.content.toLowerCase() === 'toggle reactions') {
        react = !react;

        if (react) {
          msg.channel.send('Reactions are on');
        } else {
          msg.channel.send('Reactions are off');
        }
      }
    }
    //set commands, mods only
      //update commands needs to be improved before this can be done. currently sets db commands to commands object, would just override set commands
});

client.login(process.env.TERRA);