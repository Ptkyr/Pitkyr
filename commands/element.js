const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PT_API } = require('../util.js');

const parseOptions = ['atomicnumber', 'symbol', 'atomicname'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('element')
		.setDescription('Returns information about an element')
        .addStringOption(option =>
            option
            .setName('input')
            .setDescription('Atomic number, symbol, or name of an element')
            .setRequired(true)),
	async execute(interaction) {
        const input = interaction.options.getString('input');
        let json;

        for (const parser of parseOptions) {
            const request = await fetch(PT_API + parser + '?' + parser + '=' + input);
            if (!request.ok) {
                interaction.reply("API call failed: " + requestJSON.status);
                return;
            }
            const requestJSON = await request.json();
            if (requestJSON['name'] != undefined) {
                json = requestJSON;
                break;
            }
        }

        if (json === undefined) {
            interaction.reply("All parse options failed");
            return;
        }

        const element = new EmbedBuilder()
            .setColor(0xfccf03)
            .setTitle(json['name'])
            .setDescription(json['electronicConfiguration'])
            .addFields(
                { name: 'Symbol:', value: json['symbol'],                       inline: true },
                { name: 'Z:',      value: json['atomicNumber'].toString(),      inline: true },
                { name: 'M:',      value: json['atomicMass'].toString(),        inline: true }
            )
            .addFields(
                { name: 'EN:',     value: json['electronegativity'].toString(), inline: true },
                { name: 'EA:',     value: json['electronAffinity'].toString(),  inline: true },
                { name: 'IE:',     value: json['ionizationEnergy'].toString(),  inline: true }
            );

		await interaction.reply({ embeds: [element] });
	},
};
