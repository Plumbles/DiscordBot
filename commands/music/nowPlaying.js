const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("np")
        .setDescription("Shows which song is currently playing"),

        execute: async({ client, interaction }) => {
            const queue = client.player.getQueue(interaction.guildId)

            if(!queue.playing) {
                await interaction.reply("There are nos songs currently playing");
                return;
            }

            // Get the current song
            const currentSong = queue.current


             // Embed
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`**Now Playing**\n` + 
                        (currentSong ?  `[${currentSong.title}](${currentSong.url}) \`[${currentSong.duration}]\` ~ <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n${queue.createProgressBar()}`
                    )
                ]
            })
        }
}