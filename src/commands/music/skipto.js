const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `Anda tidak berada di voice channel!`,
        type: 'editreply'
    }, interaction);

    if (player && channel.id !== player.voiceChannel) return client.errNormal({
        error: `Anda tidak berada di voice channel yang sama!`,
        type: 'editreply'
    }, interaction);

    if (!player || !player.queue.current) return client.errNormal({
        error: "Tidak ada lagu yang sedang diputar di server ini",
        type: 'editreply'
    }, interaction);

    const number = interaction.options.getNumber('number');

    if (number < 1 || number > player.queue.size) {
        return client.errNormal({
            error: "Nomor lagu yang diminta tidak valid",
            type: 'editreply'
        }, interaction);
    }

    player.queue.splice(0, number - 1); // Melewati lagu-lagu sebelum nomor yang diminta
    player.stop(); // Menghentikan pemutaran lagu saat ini
    client.succNormal({ 
        text: `Melewati musik ke **${number}**`, 
        type: 'editreply'
    }, interaction);
}
