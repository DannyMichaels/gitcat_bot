const discord = require('discord.js');
require('dotenv').config();

const sendMsg = async (client, msg) => {
  setTimeout(() => {
    client.channels.cache.get(process.env.GENERAL_CHANNEL_ID).send(msg);
  }, 3000);
};

const run = async () => {
  const client = new discord.Client();
  await client.login(process.env.TOKEN);

  // https://stackoverflow.com/questions/63329199/how-can-i-pass-an-argument-into-my-javascript-code-from-command-line
  const [_a, _b, ...message] = process.argv;

  await sendMsg(client, message);
};

run();
