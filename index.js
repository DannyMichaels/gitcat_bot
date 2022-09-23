const discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const { startGreetingCrons } = require('./crons/greeting');
const { stopGymReminderCron } = require('./crons/remindGym');
global.AbortController = require('node-abort-controller').AbortController;

const client = new discord.Client();

const prefix = process.env.PREFIX;

client.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

var musicUrls = [];

client.once('ready', () => {
  console.log(`${client.user.username} is online!`);
  // testCron(client, process.env.TEST_CHANNEL_ID).start();
  startGreetingCrons(client, process.env.CAT_OWNER_ID);

  // if (process.env.NODE_ENV === 'production') {
  //   client.channels.cache
  //     .get(process.env.GENERAL_CHANNEL_ID)
  //     .send('GitCat online here!');
  // }

  const userName = client.users.cache.get(process.env.CAT_OWNER_ID).username;

  if (process.env.CAT_OWNER_ID) {
    client.user.setActivity(`${userName}`, { type: 'LISTENING' });
  } else {
    // Listening to xxx users
    client.user.setActivity(
      `to ${client.guilds.cache
        .map((guild) => guild.memberCount)
        .reduce((acc, cv) => acc + cv)} users`,
      { type: 'LISTENING' }
    );
  }
});

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    client.commands.get('ping').execute(message, args);
  }

  if (command === 'avatar') {
    await client.commands.get('avatar').execute(message, args);
  }

  if (command === 'queue') {
    await client.commands
      .get('queue')
      .execute(client, message, args, musicUrls);
  }

  if (command === 'op.gg' || command === 'opgg') {
    await client.commands.get('opgg-search').execute(message, args);
  }

  if (command === 'remind_gym') {
    await client.commands.get('remind-gym').execute(client, message, args);
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

  if (command === 'meme') {
    await client.commands.get('meme').execute(message, args);
  }

  if (command === 'reminder' || command === 'remind') {
    await client.commands.get('remind').execute(client, message, args);
  }

  if (command === 'reminder_cancel') {
    await client.commands.get('remind-cancel').execute(client, message, args);
  }

  if (command === 'meow_for_me') {
    await client.commands.get('meow_for_me').execute(message, args);
  }
});

client.login(process.env.TOKEN);
