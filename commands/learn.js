const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { BYTE_LEN, LEARNED, getSequence } = require('../util.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('learn')
		.setDescription('Returns the next unlearned word'),
	async execute(interaction) {
		const nextWord = getSequence(LEARNED, 4 * BYTE_LEN);
		const word = new EmbedBuilder();
		for (let i = 0; i < 4; ++i) {
			word.addFields(
				{ 
					name: 'Byte ' + i, 
					value: nextWord.substring(i * BYTE_LEN, (i + 1) * BYTE_LEN)
				}
			);
		}
		await interaction.reply({ embeds: [word] });
	},
};
