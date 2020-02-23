exports.run = function(Guard, message, args) {

    const database = require('../config/database.json');
    const fs = require("fs")
    const { RichEmbed } = require('discord.js')
    const colors = require('../config/colors.json')

    let cant = args[0];
    if (!cant || isNaN(cant)) {
        const embed = new RichEmbed()
        .setColor(colors["aqua"])
        .setDescription("Usage: set_spamTime 1000")
       return message.channel.send(embed).then(function(r) { r.delete(5000); });
    }
    
    let confirm = args[1];

    if (!confirm || !confirm == "yes" || !confirm == "accept") {
        return message.channel.send("  You need to confirm that the time is correct, use `accept` or `yes`.").then(function(r) {
            r.delete(5000);
        });
    };

    if (confirm === "yes" || confirm === "accept") {

        database['time'] = parseInt(cant);
        
        fs.writeFileSync('./config/database.json', JSON.stringify(database), function(err) {
            if (err) console.log(err)
        })

        var eEmbed = new RichEmbed()
        .setColor(colors["cyan"])
        .setTitle("Spam Channel Added!")
        .setDescription("You have added spam time is `" + cant + "`")
        .setTimestamp()

       return message.channel.send(eEmbed).then(function(r) {
         r.delete(50000)
       });
    };
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 4
};

exports.help = {
    name: 'set_spamTime',
    description: 'Escribe el tiempo de spam.',
    usage: 'set_spamTime'
};
