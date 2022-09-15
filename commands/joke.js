const { getRandomJoke } = require('../services/joke');
const { handleError } = require('../utils');

module.exports = {
  name: 'joke',
  description: 'Tell a random joke!',
  async execute(message, args) {
    try {
      const { joke, setup, delivery } = await getRandomJoke();

      if (joke) return sendJoke(message, joke);

      if (setup && delivery)
        return sendSetupAndDelivery(message, { setup, delivery });

      setTimeout(() => this.execute(), 100);
    } catch (error) {
      return handleError(message, error);
    }
  },
};

const sendJoke = async (message, joke) => {
  const msg = await message.channel.send(joke);
  await msg.react('👍');
  await msg.react('👎');
  return;
};

const sendSetupAndDelivery = async (message, { setup, delivery }) => {
  const _setupMsg = await message.channel.send(setup);

  setTimeout(async () => {
    const deliveryMsg = await message.channel.send(delivery);
    await deliveryMsg.react('👍');
    await deliveryMsg.react('👎');
  }, 2000);

  return;
};
