const axios = require('axios');

const getImages = async (title) => {
  const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${title}&image_type=photo`;
  const { data } = await axios.get(url);

  return data;
};

module.exports = { getImages };
