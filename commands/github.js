module.exports = {
  name: "github",
  description: "github link",
  execute(message, args) {
    if (message.member.roles.cache.has("767065215040618506")) { // member code
      message.channel.send("https://github.com/DannyMichaels/DanielBot");
    } else {
      message.channel.send(
        `You don't have the permissions to use this command!`
      );
    }
  },
};