const { SlashCommandBuilder, messageLink } = require('discord.js');

require('dotenv').config();

const DIGITS = 770;
const BYTE_LEN = 8;

function getByte(index) {
    return process.env.PI.substring(index, index + BYTE_LEN);
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pi')
		.setDescription('Returns a prompt byte and waits for the next byte.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
        const index = Math.floor(Math.random() * (DIGITS - 2 * BYTE_LEN));
        const clue = getByte(index);
        const check = getByte(index + BYTE_LEN);
        console.log(clue);
        console.log(check);
		await interaction.reply(clue);

        // Wait for a single response from the slash command user
        const filter = m => m.author.id == interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 20000, max: 1 });

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
