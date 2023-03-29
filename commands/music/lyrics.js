const { lyricsExtractor } = require('@discord-player/extractor');
const { EmbedBuilder } = require('@discordjs/builders');
const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Finds the lyrics of current song"),

    execute: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId);
        const lyricsFinder = lyricsExtractor(/* 'optional genius API key' */);
        const currentSong = queue.currentTrack;
 
        const lyrics = await lyricsFinder.search(currentSong.author + ' ' + currentSong.title).catch(() => null);
        if (!lyrics) return interaction.reply({ content: 'No lyrics found', ephemeral: true });
 
        const trimmedLyrics = lyrics.lyrics.substring(0, 1997);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(lyrics.title)
                .setURL(lyrics.url)
                .setThumbnail(lyrics.thumbnail)
                .setAuthor({
                    name: lyrics.artist.name,
                    iconURL: lyrics.artist.image,
                    url: lyrics.artist.url
                })
                .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
                
            ]
        })


    }
}