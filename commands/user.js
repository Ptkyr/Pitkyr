const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const userInfo = new EmbedBuilder()
			.setTitle(interaction.user.tag)
			.setColor(0x3884ff)
			.addFields(
				// Convert these to strings by adding nothing because JavaScript
				{ name: 'Account created:', value: '' + interaction.member.user.createdAt },
				{ name: 'Joined on:', value: '' + interaction.member.joinedAt }
			);
		await interaction.reply({ embeds: [userInfo]} );
	},
};