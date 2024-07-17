const suggestions = require('../helpers/suggestions');

module.exports = {
    name: 'sugerir',
    description: 'Permite a los usuarios enviar sugerencias',
    execute(message, args) {
        const suggestion = args.join(' ').trim();

        if(!suggestion) return message.reply('Por favor proporcionar una sugerencia. \n EXAMPLE:  !sugerir y la sugerencia');

        suggestions.push({user: message.author.tag, suggestion});
        message.channel.send('¡Gracias por tu sugerencia!');
    }
}