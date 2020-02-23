exports.run = function(Guard, message, args) {

    const fs = require("fs")
    const { RichEmbed } = require('discord.js');
    const database = require('../config/database.json');
    const colors = require('../config/colors.json');

    let confirm = args[0]

    if (!confirm === 'on' || !confirm === 'off' || !confirm) {
        const embed = new RichEmbed()
        .setColor(colors["cyan"])
        .setDescription("Usage: set_status [ON or OFF]")
        message.channel.send(embed).then(function(r) { r.delete(5000) });
    };

    if (database['status'] === 'on') {

        if (confirm === 'on') {
            return message.channel.send("the bot is already activated, you need to deactivate it in order to use this command back").then(function(r) { r.delete(10000) });
        }
    } else if (database['status'] === 'off') {

        if (confirm === 'off') {
            return message.channel.send("the bot is already deactivated you need to activate it and then deactivate it").then(function(r) { r.delete(10000) });
        }
    };

    if (database['status'] === 'off') {

        if (confirm === 'on') {
            database['status'] = 'on'

            fs.writeFileSync('./config/database.json', JSON.stringify(database), function(err) {
                if (err) console.log(err)
            })

            const embed = new RichEmbed()
            .setColor(colors['aquamarine'])
            .setTitle(`Update Bot [${database['status']}]`)
            .setTimestamp()

           return message.channel.send(embed).then(function(r) {
                r.delete(5000)
              });
        };

    } else if (database['status'] === 'on') {

        if (confirm === 'off') {
            database['status'] = 'off'

            fs.writeFileSync('./config/database.json', JSON.stringify(database), function(err) {
                if (err) console.log(err)
            })

            const embed = new RichEmbed()
            .setColor(colors['aquamarine'])
            .setTitle(`Update Bot [${database['status']}]`)
            .setTimestamp()

           return message.channel.send(embed).then(function(r) {
                r.delete(5000)
              });
        };
    };


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['setstatus'],
    permLevel: 4
};

exports.help = {
    name: 'set_status',
    description: 'Activa el bot o desactivalo',
    usage: 'set_status',
    category: 'config'
};
