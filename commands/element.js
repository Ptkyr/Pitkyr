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
        let request;
        let json;
        for (const parser of parseOptions) {
            request = await fetch(PT_API + parser + '?' + parser + '=' + input);
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
            .addFields(
                { name: 'Name:',  value: json['name'] },
                { name: 'Symbol', value: json['symbol'] },
                { name: 'Z:',     value: json['atomicNumber'].toString() },
                { name: 'M:',     value: json['atomicMass'].toString() },
                { name: 'EN:',    value: json['electronegativity'].toString() },
                { name: 'GSEC:',  value: json['electronicConfiguration'] },
                { name: 'EA:',    value: json['electronAffinity'].toString() },
                { name: 'IE:',    value: json['ionizationEnergy'].toString() }
            );
		await interaction.reply({ embeds: [element] });
	},
};
