module.exports = {
  name: "kick",
  description: "kick a member",
  execute(message, args) {
    if (message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.send("You have the permission to kick members");
    } else {
      message.channel.send(`You don't have the permissions for this command!`);
    }
  },
};