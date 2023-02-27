const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows the queue")
        .addNumberOption(option =>
            option.setName("page").setDescription("Page number of queue").setRequired(false)
        ),

    execute: async ({ client, interaction }) => {
        let page = (await interaction.options.getNumber("page", false)) ?? 1;

        const queue = client.player.getQueue(interaction.guildId)

        // check if there are songs in the queue
        if (!queue) {
            await interaction.reply("There are no songs in the queue");
            return;
        }

        const multiple = 5;

        const maxPages = Math.ceil(queue.tracks.length / multiple);

        if (page < 1 || page > maxPages) page = 1;

        const end = page * multiple;
        const start = end - multiple;

        // Get the first 5 songs in the queue
        const queueString = queue.tracks.slice(start, end).map((song, i) => {
            return `${(start + i) + 1}  -  [${song.title}](${song.url}) \`[${song.duration}]\` ~ <@${song.requestedBy.id}>`
        }).join("\n")

        // Get the current song
        const currentSong = queue.current

        if (queue.tracks.length < 1) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`**Queue**\n` + 
                        (currentSong ?  `[${currentSong.title}](${currentSong.url}) \`[${currentSong.duration}]\` ~ <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n${queue.createProgressBar()}`
                    )
                ]
            }) 
            return;
        }

        // Embed
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`**Currently Playing**\n` + 
                        (currentSong ?  `[${currentSong.title}](${currentSong.url}) \`[${currentSong.duration}]\` ~ <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n${queue.createProgressBar()}` +
                        `\n\n**Queue**\n${queueString}`
                    )
                    .setFooter(
                        {text: `Page ${page} of ${maxPages} | song ${start + 1} to ${end > queue.tracks.length ? `${queue.tracks.length}` : `${end}`} of ${queue.tracks.length}`},
                        interaction.user.displayAvatarURL({ dynamic: true })
                    )
            ]
        })




        /*await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Currently Playing**\n` + 
                        (currentSong ?  `[${currentSong.title}](${currentSong.url}) \`[${currentSong.duration}]\` ~ <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n**Queue**\n${queueString}`
                    )
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })*/
    }
}