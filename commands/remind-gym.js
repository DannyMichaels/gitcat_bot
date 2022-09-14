const { startGymReminderCron } = require('../crons/remindGym');

module.exports = {
  name: 'remind-gym',
  description: 'reminds you to go jim!',
  execute(client, message, args) {
    startGymReminderCron({ client, args, message });
  },
};
