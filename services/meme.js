const axios = require('axios');

const getRandomMeme = async () => {
  const url = 'https://meme-api.herokuapp.com/gimme';

  const { data } = await axios.get(url);

  return data;
};

module.exports = {
  getRandomMeme,
};
