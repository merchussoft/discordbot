const { Client, GatewayIntentBits } = require('discord.js');

const suggestions = [];

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('guildMemberAdd', member => {

    // asignar un rol especifico a los usuarios nuevos

    const role = member.guild.roles.cache.find(r => r.name === process.env.ROL_MIEMBRO);
    if(role) member.roles.add(role).catch(console.error);

    // busca el canal de bienvenida
    const welcome_channel = member.guild.channels.cache.find(ch => ch.name === process.env.CHANNEL_WELCOME);
    welcome_channel.send(`Bienvenido al servidor, ${member}`);
});

client.on('guildMemberRemove', member => {
    // Busca el canal de bienvenida
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name === 'bienvenida');
    if (!welcomeChannel) {
        console.error('No se pudo encontrar el canal de bienvenida');
        return;
    }
    // Envía un mensaje de despedida al canal
    welcomeChannel.send(`${member} ha salido del servidor. ¡Hasta luego!`);
});


client.on('messageCreate', message => {

    if(message.author.bot) return;


    if(message.content.startsWith('!sugerir')) {
        const suggestion = message.content.slice(9).trim();
        if(!suggestion) return message.reply('Por favor proporcionar una sugerencia. \n EXAMPLE:  !sugerir y la sugerencia');

        suggestions.push({ user: message.author.tag, suggestion});
        message.channel.send('¡Gracias por tu sugerencia!')
    }


    if (message.content === '!sugerencias') {
        const suggestionList = suggestions.map((s, i) => `${i + 1}. ${s.user}: ${s.suggestion}`).join('\n');

        // Busca el canal de sugerencias
        const suggestionsChannel = message.guild.channels.cache.find(ch => ch.name === process.env.CHANNEL_SUGERENCIAS);
        if (!suggestionsChannel) {
            return message.reply('No se encontró el canal de sugerencias.');
        }

        // Envía el mensaje de sugerencias al canal de sugerencias
        suggestionsChannel.send(`Sugerencias recibidas:\n${suggestionList}`);
    }

    if (message.content === '!hola') {
        message.channel.send(`Hola, ${message.author}!`);
    }
})



module.exports = client;