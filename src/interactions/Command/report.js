const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a bug or user to the developers')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of your report')
                .setRequired(true)
                .addChoices(
                    { name: 'Bug', value: 'bug' },
                    { name: 'User', value: 'user' }
                )
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Description of your report')
                .setRequired(true)
        ),

    run: async (client, interaction) => {
        try {
            await interaction.deferReply({ fetchReply: true });

            // Ensure webhook data is available
            const webhookId = client.webhooks?.bugReportLogs?.id;
            const webhookToken = client.webhooks?.bugReportLogs?.token;

            if (!webhookId || !webhookToken) {
                throw new Error('Webhook data is invalid or not available.');
            }

            // Create WebhookClient with correct ID and token
            const webhookClient = new WebhookClient(webhookId, webhookToken);

            const type = interaction.options.getString('type');
            const desc = interaction.options.getString('description');

            // Create a basic embed for bug and user reports
            const embed = new MessageEmbed()
                .setTitle(`📣・New ${type} report!`)
                .addFields(
                    { name: "Report category", value: type, inline: true },
                    { name: "Submitted by", value: `${interaction.user.tag}`, inline: true },
                )
                .setDescription(`${desc}`)
                .setColor(client.config.colors.normal);

            // Send the report using WebhookClient
            await webhookClient.send({
                username: 'Bot Reports',
                embeds: [embed],
            });

            // Respond to the user with a success message
            interaction.followUp({
                content: `Report successfully sent to the developers!`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in the "report" command:', error);
          interaction.followUp(`An error occurred while processing your report. Please DM our Developer ${client.users.cache.get('356770140110454784').tag} for assistance.
          or you can join our server support https://discord.gg/fwM4X6ctsD`);
        }
    },
};
