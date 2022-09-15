const { getImages } = require('../services/pixabay');
const { sample, handleError } = require('../utils');

module.exports = {
  name: 'image',
  description: 'image',
  async execute(message, args) {
    try {
      if (!args.length) {
        return message.channel.send(
          'format: !image {title}, example: !image flowers'
        );
      }

      const query = args.join(' ');

      const { hits = [] } = await getImages(query);

      const randomResult = sample(hits);

      const img =
        randomResult.webformatURL ||
        randomResult.largeImageURL ||
        randomResult.pageURL;

      return await message.channel.send({ files: [img] });
    } catch (error) {
      return handleError(message, error);
    }
  },
};
