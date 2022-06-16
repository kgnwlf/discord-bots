const common = require('../commonFuncs.js');

const handleHangman = (msg, hangman, client) => {
  let msgContent = '';
  let newDisplay = '';

  if (msg.content.toLowerCase().includes('start hangman') && hangman.status) {
    msg.channel.send('There is already a hangman game in progress.');

  } else if (msg.content.toLowerCase().includes('start hangman')) {
    hangman.status = true;
    common.giveRole(msg.author.id, '984457746147598366', client);

    msg.channel.send('Please go to #hangman to enter your word.');
    msg.channel.send("Everyone else, use 'guess:' to guess words and 'check:' to check letters.");

  } else if (msg.channel.id === '984457852250914866') { // CHANNEL ID THAT HANGMAN WORD IS TAKEN FROM
    msgContent = msg.content.toLowerCase().split(' ');

    if (msgContent.length === 1) {
      msg.channel.send('Thank you!');
      common.removeRole(msg.author.id, '984457746147598366', client);

      hangman.word = msgContent[0].split('');

      for (var i = 0; i < hangman.word.length; i++) {
        hangman.display += '*';

      }

      hangman.display = hangman.display.split('');

    } else {
      msg.channel.send('Please send just one word.');

    }

  } else if (msg.member.roles.cache.has('984457746147598366')) {
    common.removeRole(msg.author.id, '984457746147598366', client);

  }

  msgContent = msg.content.split(' ');

  if (msgContent[0] === 'guess:') {
    msgContent.shift();
    hangman.guesses.number += 1;

    if (msgContent.length > 1) {
      msg.channel.send('Please guess one word.');

    } else if (msgContent[0] === hangman.word.join('')) {
      msg.channel.send(`${msg.author.username} figured out the word! The word was "${hangman.word.join('')}" and was guessed in ${hangman.guesses.number} guesses.`);

      return {
        status: false,
        word: '',
        display: '',
        guesses: {
          number: 0,
          words: [],
          letters: []
        }
      };
    } else if (msgContent[0] !== hangman.word) {
      hangman.guesses.words.push(msgContent[0]);
      hangman.guesses.number += 1;

      msg.channel.send(`"${msgContent[0]}" was not the word.`);

      return hangman;
    }

  } else if (msgContent[0] === 'check:') {
    msgContent.shift();

    if (msgContent[0].length > 1) {
      msg.channel.send('Please only check one letter');

    } else if (msgContent[0].length > 1) {
      msg.channel.send('That is a word, please use "guess:" to guess a word.');

    } else {
      let letter = msgContent[0];
      let correctCheck = false;

      hangman.guesses.number += 1;
      hangman.guesses.letters.push(letter);

      for (var i = 0; i < hangman.word.length; i++) {
        if (hangman.word[i] === letter) {
          correctCheck = true;

          hangman.display[i] = letter;
        }
      }

      if (hangman.display.indexOf('*') === -1) {
        msg.channel.send(`Game over, ${hangman.word.join('')} was the word and was figured out in ${hangman.guesses.number} guesses.`);

        return {
          status: false,
          word: '',
          display: '',
          guesses: {
            number: 0,
            words: [],
            letters: []
          }
        }

      } else {

        msg.channel.send(`
        "${letter}" was ${correctCheck ? 'a correct check' : 'an incorrect check'}.
        \n${hangman.display.join(' ')}
        \n${hangman.guesses.letters.length > 0 ? `These letters have been guessed: ${hangman.guesses.letters.join(', ')}.` : ''}
        ${hangman.guesses.words.length > 0 ? `These words have been guessed: ${hangman.guesses.words.join(', ')}.` : ''}`
        );

        return hangman;
      }

    }
  }

}

var whatTheBotDo = (msg) => {
  var commands = Object.keys(terraCommands);
  var returnStr = "Try sending ";
  commands.forEach(command => {
    returnStr += `'${command}', `;
  })
  returnStr = returnStr.slice(0, returnStr.length - 2)
  returnStr += '.';
  msg.channel.send(returnStr);
  msg.channel.send("Try creating a poll by saying 'poll:' then what you want the poll to be about.");
  msg.channel.send("Try creating an option poll by sending 'ab:' and then your two options separated by 'or'.");
  msg.channel.send("Start a game of hangman by saying 'start hangman'.");
};

module.exports = {
  handleHangman,
  whatTheBotDo
};