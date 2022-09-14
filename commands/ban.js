module.exports = {
  name: "ban",
  description: "kick a member",
  execute(message, args) {
    if (message.member.permissions.has("BAN_MEMBERS")) {
      message.channel.send("You have the permission to ban members");
    } else {
      message.channel.send(`You don't have the permissions for this command!`);
    }
  },
};