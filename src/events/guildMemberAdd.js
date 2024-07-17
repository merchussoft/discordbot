module.exports = (client, member) => {
    // asignar un rol especifico a los usuarios nuevos

    const role = member.guild.roles.cache.find(r => r.name === process.env.ROL_MIEMBRO);
    if(role) member.roles.add(role).catch(console.error);

    // busca el canal de bienvenida
    const welcome_channel = member.guild.channels.cache.find(ch => ch.name === process.env.CHANNEL_WELCOME);
    welcome_channel.send(`Bienvenido al servidor, ${member}`);
}