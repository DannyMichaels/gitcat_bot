module.exports = {
  name: 'ping',
  description: 'this is a ping command',
  execute(message, args) {
    console.log('msg', message);
    message.channel.send('pong!');
  },
};
