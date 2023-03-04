const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows the queue")
        .addNumberOption(option =>
            option.setName("page").setDescription("Page number of queue").setRequired(false)
        ),

    execute: async ({ client, interaction }) => {
        let page = (await interaction.options.getNumber("page", false)) ?? 1;

        const queue = useQueue(interaction.guildId);

        // check if there are songs in the queue
        if (!queue) {
            await interaction.reply("There are no songs in the queue");
            return;
        }

        const multiple = 5;

        const maxPages = Math.ceil(queue.tracks.size / multiple);

        if (page < 1 || page > maxPages) page = 1;

        const end = page * multiple;
        const start = end - multiple;

        // Create array of tracks
        const tracks = queue.tracks.toArray().map((track, i) => `${(i++) + 1}  -  [${track.title}](${track.url}) \`[${track.duration}]\` ~ <@${track.requestedBy.id}>`);
        let queueString

        for (let i = 0; i < maxPages; i++) {
            queueString = tracks.slice(start, end).join("\n")
        }



        // Get the current song
        const currentSong = queue.currentTrack;

        if (queue.tracks.size < 1) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`**Queue**\n` + 
                        (currentSong ?  `[${currentSong.title}](${currentSong.url}) \`[${currentSong.duration}]\` ~ <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n${queue.node.createProgressBar()}`
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
                        `\n\n${queue.node.createProgressBar()}` +
                        `\n\n**Queue**\n${queueString}`
                    )
                    .setFooter(
                        {text: `Page ${page} of ${maxPages} | song ${start + 1} to ${end > queue.tracks.size ? `${queue.tracks.size}` : `${end}`} of ${queue.tracks.size}`},
                        interaction.user.displayAvatarURL({ dynamic: true })
                    )
            ]
        })
        

    }
}