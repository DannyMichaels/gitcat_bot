const { getCatImage } = require('../services/catapi');

module.exports = {
  name: 'meow_for_me',
  description: 'This is a meow command',
  async execute(message, args) {
    const { url } = await getCatImage();

    if (message.member.id === process.env.CAT_OWNER_ID) {
      try {
        await message.channel.send('Meow!', {
          files: [url],
        });
      } catch (error) {
        return message.channel.send('Meow!');
      }
    } else {
      message.channel.send(`No. I am not your cat.`);
    }
  },
};
