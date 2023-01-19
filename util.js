require('dotenv').config()
const BYTE_LEN = parseInt(process.env.BYTE_LEN);
const LEARNED = parseInt(process.env.LEARNED);
const PT_API = process.env.PERIODIC_TABLE;

module.exports = {
    BYTE_LEN,
    LEARNED,
    PT_API,
    getByte: function(index) {
        const i = parseInt(index);
        return process.env.PI.substring(i, i + BYTE_LEN);
    },
    getSequence: function(index, jump) {
        const i = parseInt(index);
        const j = parseInt(jump);
        return process.env.PI.substring(i, index + j);
    },
    getIndex: function(byte) {
        return process.env.PI.indexOf(byte);
    },
    randomLearned: function() {
        return Math.floor(Math.random() * (LEARNED- 2 * BYTE_LEN));
    }
};


