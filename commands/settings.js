exports.run = function(Guard, message, args) {

    const database = require('../config/database.json');
    const settings = require("../config/settings.json");
    const colors = require('../config/colors.json')
    const { RichEmbed } = require('discord.js')

    let prefix = database['prefix'];

    let currentCounter = database['currentCounter'];
    let lastCounter = database['lastCounter'];

    let statusBot = database['status']
    if (statusBot === 'off') statusBot = 'OFF'
    else statusBot = 'ON'

    let sMessage = database['message']
    if (sMessage === null) sMessage = 'Not meessage personalizable'
    else sMessage = database['mesage']

    let spamChannel = database['spamchannel']
    if (spamChannel === 'none') spamChannel = 'None'
    else spamChannel = '<#' + spamChannel + '>'

    const embed = new RichEmbed()
    .setColor(colors["greenyellow"])
    .setAuthor( message.guild.name, message.guild.iconURL)
    .addField("Prefix", prefix)
    .addField("Spam Channel", spamChannel, true)
    .addField("Spam Status", statusBot, true)
    .addField("Spam Message", sMessage, true)
    .addBlankField()
    .addField("Current counter", currentCounter)
    .addField("Last Counter", lastCounter)
    .addBlankField()
    .addField("BOT", true)


    message.channel.send(embed)

},

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['settings', 'config'],
    permLevel: 0
};

exports.help = {
    name: 'settings',
    description: 'Obten datos precisos de la configuración del bot en el servidor.',
    usage: 'settings',
    category: 'config'
};
