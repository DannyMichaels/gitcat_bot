const { getRandomMeme } = require('../services/meme');
const { MessageEmbed } = require('discord.js');

const { handleError } = require('../utils');

module.exports = {
  name: 'meme',
  description: 'get random meme',
  async execute(message, args) {
    try {
      const meme = await getRandomMeme();

      const embed = new MessageEmbed()
        .setTitle(meme.title)
        .setURL(meme.url)
        .setAuthor(meme.author)
        .setImage(meme.preview[meme.preview.length - 1])
        .setDescription(`subreddit: ${meme.subreddit}`);

      return message.channel.send(embed);
    } catch (error) {
      return handleError(message, error);
    }
  },
};
