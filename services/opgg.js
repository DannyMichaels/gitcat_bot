const axios = require('axios');

const getOPGGData = async (summonerName, region = 'na') => {
  try {
    const response = await axios.get(
      `https://lol-api-summoner.op.gg/api/${region}/complete/summoners?keyword=${summonerName}`
    );

    // returns an array, but because we pass the exact region and name, we return the first result.
    return response.data.data[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOPGGData,
};
