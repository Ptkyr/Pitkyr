const { SlashCommandBuilder } = require('discord.js');
const { BYTE_LEN, getByte, randomLearned } = require('../util.js');

const WAIT_TIME = 20;
const WRONG_ANSWER = 1;
const RIGHT_ANSWER = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rand')
		.setDescription('Prompts with a random, learnt byte and waits ' + WAIT_TIME + 's for the next byte'),
	async execute(interaction) {
		// Retrieve random byte from learnt digits
        const index = randomLearned();
        const prompt = getByte(index);
        const answer = getByte(index + BYTE_LEN);
		await interaction.reply(prompt);

        const sentBySlasher = m => m.author.id == interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ sentBySlasher, time: WAIT_TIME * 1000, max: 1 });

        let status = RIGHT_ANSWER;

        collector.on('collect', m => {
            if (m.content != answer) {
                status = WRONG_ANSWER;
            }
        });

        collector.on('end', collected => {
            if (collected.size == 0) {
                interaction.followUp('Timed out! Answer: ' + answer);
            } else if (status == WRONG_ANSWER) {
                interaction.followUp('Incorrect. Answer: ' + answer);
            } else {
                interaction.followUp('Correct!');
            }
        });
	},
};
