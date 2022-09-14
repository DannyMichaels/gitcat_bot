module.exports = {
  name: "youtube",
  description: "sends the youtube link!",
  execute(message, args) {
    if (message.member.roles.cache.has('767065215040618506')) {
      message.channel.send("https://www.youtube.com/c/danielmichael");
    } else {
      message.channel.send(
        `You cant send this command because you don't have the right permissions!. Read the rules and try again later!`
      );
    }
  },
};
