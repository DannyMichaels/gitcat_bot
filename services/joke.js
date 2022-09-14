const axios = require('axios');

const getRandomJoke = async () => {
  try {
    const sfwQuery = '?safe-mode';

    const { data } = await axios.get(
      `https://v2.jokeapi.dev/joke/Any${sfwQuery}`
    );

    return {
      joke: data?.joke,
      setup: data?.setup,
      delivery: data?.delivery,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRandomJoke,
};
