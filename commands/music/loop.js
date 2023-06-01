const { QueueRepeatMode, useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Loops")
        .addSubcommand(subcommand =>
            subcommand
                .setName("mode")
                .setDescription("Shows current set loop mode.")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("off")
                .setDescription("Turns the looping off")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("queue")
                .setDescription("Loops the queue (all songs)")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("track")
                .setDescription("Repeats the current song")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("autoplay")
                .setDescription("Autoplays related songs when queue ends")
        ),
	execute: async ({ interaction }) => {
        // Get the queue for the server
		const queue = useQueue(interaction.guildId);

        // Check if the queue is empty
		if (!queue) {
			await interaction.reply("There are no songs to be looped")
			return;
		}

        let md = "none";
        if (queue.repeatMode === 3) {
            md = "autoplay";
        } else if (queue.repeatMode == 2) {
            md = "queue";
        } else if (queue.repeatMode == 1) {
            md = "track";
        } else if (queue.repeatMode == 0) {
            md = "off";
        }
        
        if (interaction.options.getSubcommand() === "mode") {
            return interaction.reply(`Currently set to: **\`${md}\`** `)
        }
        else if (interaction.options.getSubcommand() === "off") {
            queue.setRepeatMode(QueueRepeatMode.OFF);
            return interaction.reply(`Loop mode set to: **\`off\`**`)
        }
        else if (interaction.options.getSubcommand() === "queue") {
            queue.setRepeatMode(QueueRepeatMode.QUEUE);
            return interaction.reply(`Loop mode set to: **\`queue\`**`)
        }
        else if (interaction.options.getSubcommand() === "track") {
            queue.setRepeatMode(QueueRepeatMode.TRACK);
            return interaction.reply(`Loop mode set to: **\`track\`**`)
        }
        else if (interaction.options.getSubcommand() === "autoplay") {
            queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
            return interaction.reply(`Loop mode set to: **\`autoplay\`**`)
        }
	}
}
