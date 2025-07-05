const axios = require("axios");
const { Telegraf } = require("telegraf");
require("dotenv").config();

const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply(`Fala aí, ${ctx.from.first_name}! 👋`));
bot.help((ctx) => ctx.reply("Me mande uma mensagem e eu respondo!"));

bot.command("cotacao", async (ctx) => {
  try {
    const response = await axios.get(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL"
    );
    const valor = response.data.USDBRL.bid;
    await ctx.reply(`💵 Cotação do Dólar: R$ ${valor}`);
  } catch (error) {
    await ctx.reply("😬 Erro ao buscar cotação. Tenta de novo mais tarde!");
    console.error(error);
  }
});

bot.on("text", (ctx) => ctx.reply(`Você disse: ${ctx.message.text}`));

bot.launch();
