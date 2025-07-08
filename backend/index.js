const axios = require("axios");
const { Telegraf } = require("telegraf");

const TOKEN = "7962867612:AAGpKPeD-wBHWDQfRdNK0Dg0TN0d11-_1Y4";
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

bot.on("text", async (ctx) => {
  const message = ctx.message.text;
  const firstWord = message.split(" ")[0];
  if (firstWord === "Responda") {
    const pergunta = message.substring(firstWord.length).trim();
    console.log(`Pergunta recebida: ${pergunta}`);
    try {
      const res = await axios.post("http://localhost:5001/responder", {
        pergunta,
      });
      console.log(res.data);
      await ctx.reply(
        res.data?.resposta || "Resposta recebida, mas não entendi o formato."
      );
    } catch (err) {
      console.error("Erro ao enviar pergunta:", err);
      await ctx.reply("Erro ao enviar a pergunta para o servidor.");
    }
    return;
  }
  ctx.reply(`Você disse: ${ctx.message.text}`);
});

bot.launch();
