module.exports = {
  name: 'meow_for_me',
  description: 'This is a meow command',
  execute(message, args) {
    if (message.member.id === process.env.CAT_OWNER_ID) {
      message.channel.send('Meow!');
    } else {
      message.channel.send(`No. I am not your cat.`);
    }
  },
};
