const cron = require('node-cron');
const parser = require('cron-parser');
const moment = require('moment');

/*
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
*/

const sevenAM = '0 0 7 * * *';

let jobs = {};

const startGymReminderCron = ({ client, args = sevenAM, message }) => {
  const actualArgs = args?.length ? args : sevenAM.split(' ');

  const time = actualArgs.join(' ');

  if (jobs[message.author.id]) {
    return message.channel.send(
      'You already have a reminder, use !stop_remind_gym to remove that one and start over.'
    );
  }

  jobs[message.author.id] = cron.schedule(
    time,
    (currentTimeIso) => {
      client.channels.cache
        .get(process.env.GYM_CHANNEL_ID || process.env.GENERAL_CHANNEL_ID)
        .send(`<@${message.author.id}> It's time to go JIM!`);
    },
    {
      timezone: 'America/New_York',
    }
  );

  const nextRun = parser.parseExpression(time);
  const momentNextRun = moment(nextRun.next().toISOString()).format(
    'dddd, MMMM Do yyyy: hh:mm A'
  );

  message.channel.send(`Sent a gym reminder, next run: ${momentNextRun}!`);

  return jobs[message.author.id].start();
};

const stopGymReminderCron = async (message) => {
  if (!jobs[message.author.id]) {
    return message.channel.send(
      "Can't find an existing gym reminder for this user!"
    );
  }

  const msg = await message.channel.send('Cancelled reminder');

  setTimeout(() => {
    msg.delete();
  }, 5000);

  jobs[message.author.id].stop();

  return (jobs[message.author.id] = null);
};

module.exports = {
  startGymReminderCron,
  stopGymReminderCron,
};
