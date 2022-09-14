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

      const { tier, division, lp = 0 } = data.solo_tier_info;

      const rank = !tier ? 'Unranked' : `${tier} ${division} ${lp}LP`;

      return message.channel.send(
        `Name: ${data?.name}\nLevel: ${data?.level || '0'}\nRank: ${rank}`,
        { files: [data.profile_image_url] }
      );
    } catch (error) {
      console.log('opgg search error', error);
      return message.channel.send('error', JSON.stringify(error));
    }
  },
};
