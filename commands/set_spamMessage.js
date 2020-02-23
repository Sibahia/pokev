exports.run = function(Guard, message, args) {

    const settings = require('../config/settings.json');
    const fs = require("fs")
    const { RichEmbed } = require('discord.js')
    const colors = require('../config/colors.json')

    let slot = args[0]
    if (!slot  || isNaN(slot) && !parseInt(slot) <= 4) {
        const embed = new RichEmbed()
        .setColor(colors["aqua"])
        .setDescription("Usage: set_spamMessage [message] [slot 1/4]")
       return message.channel.send(embed).then(function(r) { r.delete(5000); });
    };

    let sMessage = args[1]
    if (!sMessage) {
        const embed = new RichEmbed()
        .setColor(colors["greenyellow"])
        .setDescription("Usage: set_spamMessage [message] [slot 1/4] [yes or accept]")
        return message.channel.send(embed).then(function(r) {
            r.delete(5000)
          });

    }

    let confirm = args[2]

    if (!confirm || !confirm == "yes" || !confirm == "accept") {
        return message.channel.send("You need to confirm the message that will be sent, use `accept` or `yes`.").then(function(r) { r.delete(5000); });
    };

    if (confirm === "yes" || confirm === "accept") {

        settings[`bot ${parseInt(slot)}`].spamMessage = sMessage;

        fs.writeFile("./config/database.json", JSON.stringify(settings), function(err) {
            if (err) console.log(err);
        });

        var eEmbed = new RichEmbed()
        .setColor(colors["cyan"])
        .setTitle("Spam Channel Added!")
        .setDescription("You have added the spam message `" + sMessage + "` in slot `" + parseInt(slot) + "`")
        .setTimestamp()

       return message.channel.send(eEmbed).then(function(r) {
         r.delete(50000)
       });
    };

}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['set_spamMessage'],
    permLevel: 4
};

exports.help = {
    name: 'set_spamMessage',
    description: 'Escribe el mensaje que se va a estar enviando.',
    usage: 'set_spamMessage',
    category: 'config'
};
