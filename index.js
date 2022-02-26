require("dotenv").config();
const { Client, Intents } = require("discord.js");
const axios = require("axios");
const { persist } = require("./persist.js");

const inspy = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

inspy.on("messageCreate", function (message) {
  if (message.content == ".quote") {
    axios
      .request({
        method: "GET",
        url: "https://zenquotes.io/api/random",
      })
      .then(function (response) {
        let q = response.data[0].q;
        let a = response.data[0].a;
        message.reply(`"${q}", by ${a}`);
      })
      .catch(function (error) {
        if (error) throw error;
      });
  }
});

inspy.once("ready", function () {
  console.log("Inspy online ...");
});
inspy.login(process.env.TOKEN);
