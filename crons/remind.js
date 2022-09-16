const cron = require('node-cron');
const {
  compareDateWithCurrentTime,
} = require('./../utils/compareDateWithCurrentTime');
const { uuid } = require('uuidv4');
const parser = require('cron-parser');
const moment = require('moment');

let jobs = {};

const startReminderCron = ({ client, args, message }) => {
  const argsStr = args.join(' ');

  let [cronTab, reminderMsg] = argsStr.split('>');

  cronTab = cronTab.replace('<', '');
  reminderMsg = reminderMsg.replaceAll('"', '');

  const nextRun = parser.parseExpression(cronTab);

  const nextRunIso = nextRun.next().toISOString();

  if (compareDateWithCurrentTime(nextRunIso) >= 1) {
    return message.channel.send(`You can't send a reminder to the past!`);
  }

  const momentNextRun = moment(nextRunIso).format(
    'dddd, MMMM Do yyyy: hh:mm A'
  );

  const guid = uuid();

  jobs[guid] = cron.schedule(
    cronTab,
    async (currentTimeIso) => {
      message.channel.send(`<@${message.author.id}> ${reminderMsg}`);

      stopReminderCron({ message, guid });

      console.log(`Ended reminder for ${guid}`);
    },
    {
      timezone: 'America/New_York',
    }
  );

  message.channel.send(
    `
    Created a reminder at ${momentNextRun}!
your reminder guid is: ${guid}.
to cancel your reminder, type !reminder_cancel ${guid}
  `
  );

  return jobs[guid].start();
};

async function stopReminderCron({ args, message, guid }) {
  const guidResult = guid ? guid : args[0] || '';

  if (!guidResult) {
    return message.channel.send('Error: guid must be provided!');
  }

  if (!jobs[guidResult]) {
    return message.channel.send(
      "Can't find an existing reminder for this guid!"
    );
  }

  await jobs[guidResult].stop();
  jobs[guidResult] = null;

  if (args[0]) {
    await message.channel.send('Cancelled reminder');
  }

  return;
}

module.exports = {
  startReminderCron,
  stopReminderCron,
};
