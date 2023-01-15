require('dotenv').config();

const BYTE_LEN = parseInt(process.env.BYTE_LEN);
const LEARNED = parseInt(process.env.LEARNED);

module.exports = {
    BYTE_LEN,
    LEARNED,
    getByte: function(index) {
        const i = parseInt(index);
        return process.env.PI.substring(i, i + BYTE_LEN);
    },
    getSequence: function(index, jump) {
        const i = parseInt(index);
        const j = parseInt(jump);
        return process.env.PI.substring(i, index + j);
    },
    randomLearned: function() {
        return Math.floor(Math.random() * (LEARNED- 2 * BYTE_LEN));
    }
};


