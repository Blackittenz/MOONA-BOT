const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  client.embed({
    title: `📘・Owner information`,
    //desc: `Test`,
    thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
    fields: [{
      name: "👑┆Owner name",
      value: `BLACKITTEN`,
      inline: true,
    },
    {
      name: "🏷┆Discord tag",
      value: `blackitten_`,
      inline: true,
    },
    {
      name: "🏢┆Organization",
      value: `MUFFIN`,
      inline: true,
    },
    {
      name: "🌐┆Join Our Server",
      value: `https://discord.gg/fwM4X6ctsD`,
      inline: true,
    }],
    type: 'editreply'
  }, interaction)
}

