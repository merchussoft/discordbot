const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

client.commands = new Collection();

// aqui se cargan los commandos 
const command_files = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));
for(const file of command_files) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
}

// aqui vamos a cargar los eventos que se van generando.
const event_files = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.js'));
for(const file of event_files) {
    const event = require(`../events/${file}`);
    const event_name = file.split('.')[0];
    client.on(event_name, event.bind(null, client))
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


module.exports = client;