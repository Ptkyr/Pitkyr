const { SlashCommandBuilder, messageLink } = require('discord.js');
const { BYTE_LEN, getByte, randomLearned } = require('../util.js');

const WAIT_TIME = 20;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pi')
		.setDescription('Returns a prompt byte and waits ' + WAIT_TIME + 's for the next byte.'),
	async execute(interaction) {
		// Retrieve random byte from learnt digits
        const index = randomLearned()
        const clue = getByte(index);
        const check = getByte(index + BYTE_LEN);
		await interaction.reply(clue);

        // Wait for a single response from the slash command user
        const filter = m => m.author.id == interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: WAIT_TIME * 1000, max: 1 });

        let status = 0;

        collector.on('collect', m => {
            if (m.content != check) {
                status = 1;
            }
        });

        collector.on('end', collected => {
            if (collected.size > 0) {
                if (status == 1) {
                    interaction.followUp('Incorrect. Answer: ' + check);
                } else {
                    interaction.followUp('Correct!');
                }
            } else {
                interaction.followUp('Timed out! Answer: ' + check);
            }
        });
	},
};
