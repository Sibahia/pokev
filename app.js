const { Client, Collection } = require('discord.js');
const fs = require('fs');

const { token, owner, owner2} = require('./config/database.json')

const Guard = new Client();

Guard.commands = new Collection();
Guard.aliases = new Collection();

fs.readdir('./events/', function(err, files) {
    if (err) return console.error;

    files.forEach( function(file) {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        Guard.on(evtName, evt.bind(null, Guard));
    });
});

fs.readdir('./commands/', async function(err, files)  {
    if (err) return console.error(err);
    console.log(`Loading a total of ${files.length} commands.`)
    files.forEach( function (file) {
      const props = require(`./commands/${file}`);
      console.log(`Loading command: '${props.help.name}'. `);
      Guard.commands.set(props.help.name, props);
      props.conf.aliases.forEach(function(alias) {
        Guard.aliases.set(alias, props.help.name);
    });
  });
});

  Guard.elevation = function(message) {
    let permlvl = 0;
    if (message.author.id === owner || message.author.id === owner2) permlvl = 4;
    return permlvl;
  }

const { status, time, spamChannel } = require('./config/database.json')
const settings = require('./config/settings.json')

if (status === "on" || !status === "off") {

    setInterval(function() {
        if (!Guard.guilds.get(settings.guild)) return;
        Guard.channels.get(spamChannel).send(settings["bot 1"].spamMessage);
    }, time)
}

Guard.login(token);