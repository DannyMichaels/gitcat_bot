const { handleError } = require('../utils');
const { startReminderCron } = require('../crons/remind');

module.exports = {
  name: 'remind',
  description: 'reminds you your message',
  async execute(client, message, args) {
    try {
      if (!args.length) {
        return message.channel.send(
          'format: !reminder <cron-tab> "message", example: !remind <0 0 7 * * *> "hello go to gym now"'
        );
      }

      startReminderCron({ client, args, message });
    } catch (error) {
      return handleError(message, error);
    }
  },
};
