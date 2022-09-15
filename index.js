const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

const prefix = process.env.PREFIX;

const fs = require('fs');
const { startGreetingCrons } = require('./crons/greeting');
const { stopGymReminderCron } = require('./crons/remindGym');

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

  if (command === 'remind_gym') {
    client.commands.get('remind-gym').execute(client, message, args);
  }

  if (command === 'stop_remind_gym') {
    stopGymReminderCron(message);
  }

  if (command === 'joke') {
    await client.commands.get('joke').execute(message, args);
  }

  if (command === 'image') {
    await client.commands.get('image').execute(message, args);
  }
});

client.login(process.env.TOKEN);
