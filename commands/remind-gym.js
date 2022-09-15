const { startGymReminderCron } = require('../crons/remindGym');
const { handleError } = require('../utils');

module.exports = {
  name: 'remind-gym',
  description: 'reminds you to go jim!',
  async execute(client, message, args) {
    try {
      startGymReminderCron({ client, args, message });
    } catch (error) {
      return handleError(message, error);
    }
  },
};
