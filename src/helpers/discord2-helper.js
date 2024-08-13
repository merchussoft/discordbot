const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ],
    ws: {
        properties: {
            $browser: 'Discord iOS'
        }
    },
    presence: {
        status: 'online'
    }
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
    console.log(`Bot ${client.user.tag} está listo y conectado!`);

    // Simula actividad enviando un ping cada 5 minutos
    setInterval(() => {
        console.log('Enviando ping para mantener la conexión activa');
        client.guilds.cache.forEach(guild => {
            guild.members.fetch();  // Realiza una acción para mantener la conexión activa
        });
    }, 300000); // Cada 5 minutos
});

client.on('error', (error) => {
    console.error('Error de conexión:', error);
});


module.exports = client;