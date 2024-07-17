module.exports = {
    name: 'rules',
    description: 'Reglas del servidor',
    execute(message) {
        message.channel.send('Por favor, sigue estas reglas: \n1. Respeto mutuo. \n2. No spam. \n3. Usa los canales adecuados.');
    },
};