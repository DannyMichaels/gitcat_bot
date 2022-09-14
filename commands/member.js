module.exports = {
  name: "member",
  description: "I read the rules",
  execute(message, args) {
    if (message.member.roles.cache.has("767065215040618506")) {
      message.channel.send("You are already a member!");
    } else {
      message.channel.send(
        `Thank you for reading the rules, you are now a member!`
      );
      message.member.roles.add("767065215040618506").catch(console.error);
    }
  },
};
