const { MessageEmbed } = require('discord.js');

/**
 * @method sample
 * @param {Array} array
 * @return {Object} takes an array of elements and returns a random element, the random element being a object.
 */
const sample = (array) => array[Math.floor(Math.random() * array.length)];

/**
 * @method handleError
 * @param {Object} message
 * @param {String} error
 * @return {MessageEmbed}
 */
const handleError = async (message, error) =>
  message.channel.send(
    new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Error')
      .setDescription(error)
  );

module.exports = { sample, handleError };
