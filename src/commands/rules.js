const { rulesMessage } = require("../interfaces/rulesMessage");

module.exports = {
    name: 'rules',
    description: 'Reglas del servidor',
    execute(message) {

        const RulesChannel = message.guild.channels.cache.find(ch => ch.name === "rules");
        if (!RulesChannel) {
            return message.reply('No se encontró el canal de Reglas.');
        }

        RulesChannel.send(rulesMessage);
    },
};