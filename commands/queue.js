const ytdl = require('ytdl-core');
const discord = require('discord.js');
const { handleError } = require('../utils');
require('ffmpeg-static');
require('@discordjs/opus');

module.exports = {
  name: 'queue',
  description: 'queue a song',
  async execute(client, message, args, musicUrls) {
    try {
      const musicChannelId = '875569218257575976';
      let url = args[0];

      let voiceChannel = client.channels.cache.get(musicChannelId);

      if (!ytdl.validateURL(url)) {
        return handleError(message, 'Invalid URL!');
      }

      const isAlreadyInThere = musicUrls.some((element) => element === url);

      if (isAlreadyInThere) {
        return handleError(message, 'Song is already in queue!');
      }

      musicUrls.push(url);

      // if the bot is in the voice channel
      if (voiceChannel !== null) {
        if (voiceChannel.connection) {
          const embed = new discord.MessageEmbed();
          embed.setAuthor(client.user.username, client.user.displayAvatarURL);
          embed.setDescription("You've successfully added to the queue!");
          message.channel.send(embed);
        } else {
          // if not in the channel
          await playSong(message, voiceChannel, musicUrls);
        }
      }
    } catch (error) {
      return handleError(message, error);
    }
  },
};

const playSong = async (message, voiceChannel, musicUrls) => {
  const streamOptions = {
    seek: 0,
    volume: 1,
  };

  try {
    const voiceConnection = await voiceChannel.join();

    const stream = ytdl(musicUrls[0], { filter: 'audioonly' });
    const dispatcher = voiceConnection.play(stream, streamOptions);

    //    const embed = new discord.MessageEmbed();
    // embed.setAuthor(client.user.username, client.user.displayAvatarURL);
    // embed.setDescription("Currrently playing...");
    // message.channel.send(embed);

    dispatcher.on('end', () => {
      // play the next song
      musicUrls.shift();

      if (!musicUrls.length) {
        voiceChannel.leave();
      } else {
        const songWaitTimeout = 5000;

        setTimeout(() => {
          playSong(message, voiceChannel, musicUrls);
        }, songWaitTimeout);
      }
    });
  } catch (error) {
    throw error;
  }
};
