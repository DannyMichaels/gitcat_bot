const { handleError } = require('../utils');
const { stopReminderCron } = require('../crons/remind');

module.exports = {
  name: 'remind-cancel',
  description: 'cancels a reminder',
  async execute(client, message, args) {
    try {
      stopReminderCron({ client, args, message });
    } catch (error) {
      return handleError(message, error);
    }
  },
};
