const Discord = require("discord.js")
const client = new Discord.Client()

/*//      SELF BOT of Tatsumaki      \\*/
 
var count = 0;
  /*function accountable(){
        count++;
    };*/

    setInterval(function() {
        client.channels.get("ID SERVER").send("t!fish");
 /*accountable();*/
    }, 36000);

client.login("TOKEN user")
