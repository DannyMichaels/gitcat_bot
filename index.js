const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

const prefix = process.env.PREFIX;

const fs = require('fs');
const { startTestCron, testCron, startGreetingCrons } = require('./crons/test');

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`${client.user.username} is online!`);
  // testCron(client, process.env.TEST_CHANNEL_ID).start();
  startGreetingCrons(client, process.env.CAT_OWNER_ID);
  // if (process.env.NODE_ENV === 'production') {
  //   client.channels.cache
  //     .get(process.env.GENERAL_CHANNEL_ID)
  //     .send('GitCat online here!');
  // }
});

// client.once('disconnect', () => {
//   client.channels.cache.get(process.env.GENERAL_CHANNEL_ID).send('Good bye!');
// });

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    client.commands.get('ping').execute(message, args);
  }

  if (command === 'meow_for_me') {
    client.commands.get('meow_for_me').execute(message, args);
  }

  if (command === 'op.gg' || command === 'opgg') {
    await client.commands.get('opgg-search').execute(message, args);
  }
});

client.login(process.env.TOKEN); // when starting from terminal
