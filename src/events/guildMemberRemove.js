module.exports = (client, member) => {
    // Busca el canal de bienvenida
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name === process.env.CHANNEL_WELCOME);
    if (!welcomeChannel) {
        console.error('No se pudo encontrar el canal de bienvenida');
        return;
    }
    // Envía un mensaje de despedida al canal
    welcomeChannel.send(`${member} ha salido del servidor. ¡Hasta luego!`);
}