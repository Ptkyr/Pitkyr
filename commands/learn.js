const { SlashCommandBuilder, messageLink } = require('discord.js');
const { BYTE_LEN, LEARNED, getSequence } = require('../util.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('learn')
		.setDescription('Returns the next unlearned word'),
	async execute(interaction) {
		await interaction.reply(getSequence(LEARNED, 4 * BYTE_LEN));
	},
};
