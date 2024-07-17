const express = require('express');
const client = require('./helpers/discord2-helper');


const app = express();


app.set('port', process.env.PORT || 3070);



client.login(process.env.DISCORD_TOKEN);


module.exports = app;