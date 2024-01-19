module.exports = async (client, player) => {
  const { MessageEmbed } = require('discord.js');

  // jika tidak ada pemutar yang aktif dalam server, keluar
  if (!player) return;

  // tinggalkan voice channel jika tidak ada antrian selama 5 menit
  const time = 300000;
  setTimeout(() => {
    if (!player.queue.size && !player.playing) {
      player.destroy();
    }
  }, time);
};