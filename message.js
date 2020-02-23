module.exports = async function(Guard, message) {

    const { prefix } = require('../config/database.json')

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix));

    const command = message.content.split(' ')[0].slice(prefix.length);
    const params = message.content.split(' ').slice(1);
    const perms = Guard.elevation(message);

    let cmd;
    if (Guard.commands.has(command)) {
        cmd = Guard.commands.get(command);
    } else if (Guard.aliases.has(command)) {
        cmd = Guard.commands.get(Guard.aliases.get(command));
    }

    if (cmd) {
        if (perms < cmd.conf.permLevel) return;
        cmd.run (Guard, message, params, perms)
    }

};