const { SlashCommandBuilder } = require('discord.js');

const DIGITS = 770;
const BYTE_LEN = 8;
const PI = "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595"

function getByte(index) {
    return PI.substring(index, index + BYTE_LEN);
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
	},
};
