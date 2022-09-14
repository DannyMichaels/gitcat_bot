const cron = require('node-cron');

const testCron = (client, channelId) =>
  cron.schedule('5 * * * * *', (currentTimeIso) => {
    console.log('running a task every minute at the 5th second');

    client.channels.cache
      .get(channelId)
      .send(
        `running a task every minute at the 5th second \ncurrent time: ${currentTimeIso}`
      );
  });

const goodMorningCron = (client, userId) => {
  const eightAM = '0 8 * * * *';

  return cron.schedule(
    eightAM,
    (currentTimeIso) => {
      client.channels.cache
        .get(process.env.GENERAL_CHANNEL_ID)
        .send(`<@${userId}> Good morning${process.env.GREETING_AFTER || ''}!`);
    },
    {
      timezone: 'America/New_York',
    }
  );
};

const goodAfterNoonCron = (client, userId) => {
  const onePM = '0 13 * * * *'; // 1pm everyday

  return cron.schedule(
    onePM,
    (currentTimeIso) => {
      client.channels.cache
        .get(process.env.GENERAL_CHANNEL_ID)
        .send(
          `<@${userId}> Good afternoon${process.env.GREETING_AFTER || ''}!`
        );
    },
    {
      timezone: 'America/New_York',
    }
  );
};

const goodEveningCron = (client, userId) => {
  const sixPM = '0 18 * * * *';

  return cron.schedule(
    sixPM,
    (currentTimeIso) => {
      client.channels.cache
        .get(process.env.GENERAL_CHANNEL_ID)
        .send(`<@${userId}> Good evening${process.env.GREETING_AFTER || ''}!`);
    },
    {
      timezone: 'America/New_York',
    }
  );
};

const goodNightCron = (client, userId) => {
  const tenPM = '0 22 * * * *';

  return cron.schedule(
    tenPM,
    (currentTimeIso) => {
      client.channels.cache
        .get(process.env.GENERAL_CHANNEL_ID)
        .send(`<@${userId}> Good night${process.env.GREETING_AFTER || ''}!`);
    },
    {
      timezone: 'America/New_York',
    }
  );
};

const startGreetingCrons = (client, userId) => {
  goodMorningCron(client, userId).start();
  goodAfterNoonCron(client, userId).start();
  goodEveningCron(client, userId).start();
  goodNightCron(client, userId).start();
};

module.exports = {
  testCron,
  goodMorningCron,
  goodAfterNoonCron,
  goodEveningCron,
  goodNightCron,
  startGreetingCrons,
};
