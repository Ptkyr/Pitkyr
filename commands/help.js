const fs = require('fs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists available commands'),
	async execute(interaction) {
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        const info = new EmbedBuilder();

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            info.addFields({
                name: command.data.name, value: command.data.description
            });
        }

        await interaction.reply({
            embeds: [info],
            ephemeral: true,
        });
	},
};
