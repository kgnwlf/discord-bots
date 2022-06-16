const plagueis = (msg) => {
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
};

module.exports = {
  plagueis
}