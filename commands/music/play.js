const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")
const { SpotifyExtractor, SoundCloudExtractor } = require('@discord-player/extractor')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from YouTube.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("search")
				.setDescription("Searches for a song and plays it")
				.addStringOption(option =>
					option.setName("searchterms").setDescription("search keywords").setRequired(true)
				)
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("playlist")
				.setDescription("Plays a playlist from either YT or Spotify")
				.addStringOption(option => option.setName("url").setDescription("the playlist's url").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("song")
				.setDescription("Plays a single song from either YT or Spotify")
				.addStringOption(option => option.setName("url").setDescription("the song's url").setRequired(true))
		),

	execute: async ({ client, interaction }) => {
        // Make sure the user is inside a voice channel
		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");

        
        // Create a play queue for the server
		const queue = await client.player.nodes.create(interaction.channel, {
            metadata: {
                channel: interaction.channel,
                requestedBy: interaction.user,
                client: interaction.guild.members.me
            },
            selfDeaf: true,
            leaveOnEmpty: true,
            leaveOnEnd: true,
        });

        await client.player.extractors.register(SpotifyExtractor, {});
        await client.player.extractors.register(SoundCloudExtractor, {});

        // Wait until you are connected to the channel
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        // Normalize the queue dB-levels
        if (queue.tracks.size == 0 && !queue.node.isPlaying()) await queue.filters.ffmpeg.toggle(['normalizer']);

		let embed = new EmbedBuilder()


        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            
            // Search for the song using the discord-player
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            // finish if no tracks were found
            if (result.tracks.size === 0)
                return interaction.reply("No results")

            // Add the track to the queue
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})

		}

        else if (interaction.options.getSubcommand() === "playlist") {

            // Search for the playlist using the discord-player
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.size === 0)
                return interaction.reply(`No playlists found with ${url}`)
            
            // Add the tracks to the queue
            const playlist = result.playlist
            await queue.addTrack(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)

		} 
        
        else if (interaction.options.getSubcommand() === "search") {

            let terms = interaction.options.getString("searchterms")
            
            // Search for the song using the discord-player
            const result = await client.player.search(terms, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            // Finish if no tracks were found
            if (result.tracks.size === 0)
                return interaction.editReply("No results")

            // Add the track to the queue
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})

		}

        // Play the song
        if (!queue.node.isPlaying()) queue.node.play()

        
        // Respond with the embed containing information about the player
        await interaction.reply({
            embeds: [embed]
        })
	},
}