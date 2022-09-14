const { getOPGGData } = require('../services/opgg');

module.exports = {
  name: 'opgg-search',
  description: 'Search a summoner and retrieve op.gg data',
  async execute(message, args) {
    const summonerName = args[0];
    const region = args[1] || 'NA';

    if (!args.length) {
      return message.channel.send(
        'format: !op.gg {summonerName} {region (default: NA)}'
      );
    }

    try {
      const data = await getOPGGData(summonerName, region);

      const rank = `${data.solo_tier_info.tier} ${data.solo_tier_info.division} ${data.solo_tier_info.lp}LP`;
      return message.channel.send(
        `Name: ${data.name} 
        \nLevel: ${data.level} 
        \nRank: ${rank}`,
        { files: [data.profile_image_url] }
      );
    } catch (error) {
      return message.channel.send('error', JSON.stringify(error));
    }
  },
};
