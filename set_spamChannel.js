exports.run = function(Guard, message, args) {

    const database = require('../config/database.json');
    const fs = require("fs")
    const { RichEmbed } = require('discord.js')
    const colors = require('../config/colors.json')

    let channel = message.mentions.channels.first();
    if (!channel) {
        const embed = new RichEmbed()
        .setColor(colors["greenyellow"])
        .setDescription("Usage: set_spamChannel [@channel | id]")
       return message.channel.send(embed).then(function(r) {
            r.delete(5000)
          });

    }

    let confirm = args[1];

    if (!confirm || !confirm == "yes" || !confirm == "accept") {
        return message.channel.send("You need to confirm that you want to deactivate the welcome message, type `accept` or `yes`.").then(function(r) {
            r.delete(5000);
        });
    };

    if (confirm === "yes" || confirm === "accept") {

        database["spamchannel"] = channel.id;

        fs.writeFileSync('./config/database.json', JSON.stringify(database), function(err) {
            if (err) console.log(err)
        })

        var eEmbed = new RichEmbed()
        .setColor(colors["cyan"])
        .setTitle("Spam Channel Added!")
        .setDescription("You have added a new spam channel <#" + channel.id + ">")
        .setTimestamp()

       return message.channel.send(eEmbed).then(function(r) {
         r.delete(50000)
       });
    };

}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['set_spamChannel'],
    permLevel: 4
};

exports.help = {
    name: 'set_spamChannel',
    description: 'Selecciona donde será enviado el spam',
    usage: 'set_spamChannel',
    category: 'config'
};