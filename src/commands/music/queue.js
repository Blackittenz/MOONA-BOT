const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;

    if (!channel) {
        return client.errNormal({
            error: `Anda tidak berada dalam saluran suara!`,
            type: 'editreply'
        }, interaction);
    }

    if (!player || !player.queue || player.queue.length === 0) {
        return client.errNormal({
            error: "Tidak ada lagu yang sedang diputar di server ini",
            type: 'editreply'
        }, interaction);
    }

    if (channel.id !== player.voiceChannel) {
        return client.errNormal({
            error: `Anda tidak berada dalam saluran suara yang sama!`,
            type: 'editreply'
        }, interaction);
    }

    let count = 0;
    let status;

    if (player.queue.length === 0) {
        status = "Tidak ada lagu lain dalam antrian";
    } else {
        status = player.queue.map((track) => {
            count += 1;
            return (`**[#${count}]**┆${track.title.length >= 45 ? `${track.title.slice(0, 45)}...` : track.title} (Diminta oleh <@!${track.requester.id}>)`);
        }).join("\n");
    }

    const thumbnail = player.queue.current.thumbnail || interaction.guild.iconURL({ size: 1024 });

    client.embed({
        title: `${client.emotes.normal.music}・Antrian Lagu - ${interaction.guild.name}`,
        desc: status,
        thumbnail: thumbnail,
        fields: [
            {
                name: `${client.emotes.normal.music} Lagu Saat Ini:`,
                value: `${player.queue.current.title} (Diminta oleh <@!${player.queue.current.requester.id}>)`
            }
        ],
        type: 'editreply'
    }, interaction);
}