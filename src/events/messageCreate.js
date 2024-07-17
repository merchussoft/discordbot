module.exports = (client, message) => {
    if (message.author.bot) return;

    const prefix = '!';
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command_name = args.shift().toLowerCase();

    const command = client.commands.get(command_name);

    if(!command) return;

    try {
        command.execute(message, args);
    } catch (e) {
        console.log('mirando el error => ', e);
        message.reply('Hiubo un error ejecutando ese comando.')
    }
}