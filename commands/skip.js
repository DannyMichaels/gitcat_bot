module.exports = {
  // $TODO
  name: 'skip',
  description: 'skip song',
  execute(message, musicUrls) {
    if (!message.member.voice.channel)
      return message.channel.send(
        'You have to be in a voice channel to stop the music!'
      );
    if (!musicUrls)
      return message.channel.send('There is no song that I could skip!');
    // musicUrls.connection.dispatcher.end();
  },
};
