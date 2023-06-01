const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the latency of the bot (only for admins)")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

        execute: async({ interaction }) => {

            // Embed
            const sent = await interaction.deferReply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`Pinging...`)
                ], fetchReply: true
            })

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`)
                ]
            })

        }
}