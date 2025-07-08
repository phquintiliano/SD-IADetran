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

//redireicona o audio para a ia de audio e depois chama a ia que responde
bot.on("voice", async (ctx) => {
  const fileId = ctx.message.voice.file_id;
  try {
    const fileLink = await ctx.telegram.getFileLink(fileId);
    console.log(`Link do arquivo de áudio: ${fileLink}`);

    // Baixa o arquivo como arraybuffer
    const fileResponse = await axios.get(fileLink.href, {
      responseType: "arraybuffer",
    });
    const audioBase64 = Buffer.from(fileResponse.data, "binary").toString(
      "base64"
    );

    const audioConvertido = await axios.post(
      "http://localhost:5002/transcrever",
      {
        audioBase64,
      }
    );

    const res = await axios.post("http://localhost:5001/responder", {
      pergunta: "Estacionar o veículo na contramão de direção será punido com:",
    });

    await ctx.reply(
      res.data?.resposta || "Resposta recebida, mas não entendi o formato."
    );

    return;

    // ...processa a resposta...
  } catch (error) {
    console.error(error);
  }
});

bot.launch();
