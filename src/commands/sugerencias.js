const suggestions = require('../helpers/suggestions');

module.exports = {
    name: 'sugerencias',
    description: 'Muestra la lista de sugerencias recibidas',
    execute(message) {
        const suggestionList = suggestions.map((s, i) => `${i + 1}. ${s.user}: ${s.suggestion}`).join('\n');

        // Busca el canal de sugerencias
        const suggestionsChannel = message.guild.channels.cache.find(ch => ch.name === process.env.CHANNEL_SUGERENCIAS);
        if (!suggestionsChannel) {
            return message.reply('No se encontró el canal de sugerencias.');
        }

        // Envía el mensaje de sugerencias al canal de sugerencias
        suggestionsChannel.send(`Sugerencias recibidas:\n${suggestionList}`);
    }
}