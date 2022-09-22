const discord = require('discord.js');
const { handleError } = require('../utils');

module.exports = {
  name: 'avatar',
  description: 'get a users avatar!',
  async execute(message, args) {
    try {
      let user = message.author;
      let avatar;

      //when args are given, set user to mentioned user
      if (args.length > 0 && message.mentions.members.first()) {
        user = message.mentions.members.first().user;
      }

      avatar = getUserAvatar(user);

      let embed = new discord.MessageEmbed()
        .setTitle(`${user.tag}'s Avatar`)
        .setURL(avatar)
        .setImage(avatar)
        .setColor('RANDOM')
        .setDescription(`${user.tag}'s Avatar :`);
      message.channel.send(embed);
    } catch (error) {
      handleError(message, error);
    }
  },
};

//This returns the AvatarURL of the user
function getUserAvatar(user) {
  let avatar = user.avatarURL();

  return avatar;
}
