const { client, Message, MessageAttachment } = require("discord.js");
const { Canvas, author } = require("canvacord");

module.exports = {
  name: 'beautiful',
  aliases: [],
  permissions: [],
  cooldown: 0,
  async execute(client, message, cmd, args, Discord) {
    
    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({ format: 'png' });

    const image = await Canvas.beautiful(avatar);

    message.channel.send(new MessageAttachment(image, "image.gif"));

  }
};