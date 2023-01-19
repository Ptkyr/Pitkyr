const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { BYTE_LEN, getSequence, getIndex } = require('../util.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lookup')
		.setDescription('Returns the word following the given byte')
        .addStringOption(option =>
            option
            .setName('input')
            .setDescription('The byte preceding the fetched word')
            .setRequired(true)),
	async execute(interaction) {
        const input = interaction.options.getString('input');
        const byteLocation = getIndex(input);
		const nextWord = getSequence(byteLocation + input.length, 4 * BYTE_LEN);
		const word = new EmbedBuilder()
			.setTitle(input)

		for (let i = 0; i < 4; ++i) {
			word.addFields({ 
				name: 'Byte ' + i, 
				value: nextWord.substring(i * BYTE_LEN, (i + 1) * BYTE_LEN),
				inline: (i == 2 ? false : true) // Why the fuck doesn't this split into 2x2
			});
		}

		await interaction.reply({ embeds: [word] });
	},
};
