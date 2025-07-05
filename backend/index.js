const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/questionarios", (req, res) => {
  res.json({
    perguntas: [
      {
        id: 1,
        enunciado: "Qual a velocidade máxima em vias urbanas?",
        alternativas: ["30km/h", "50km/h", "80km/h"],
        resposta: 1,
      },
    ],
  });
});

app.post("/responder", (req, res) => {
  const { respostas } = req.body;
  res.json({ acertos: respostas.filter((r) => r === 1).length });
});

app.post("/duvida", async (req, res) => {
  try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ erro: "Campo 'pergunta' é obrigatório." });
    }

    const resposta = await axios.post("http://ia_generativa:5001/responder", {
      pergunta,
    });

    res.json({ resposta: resposta.data.resposta });
  } catch (error) {
    console.error("Erro ao consultar IA generativa:", error.message);
    res.status(500).json({ erro: "Erro interno ao processar a dúvida." });
  }
});

app.get("/duvida", async (req, res) => {
  const resposta = await axios.post("http://ia_generativa:5001/responder", {
    pergunta: {},
  });
  res.json({ resposta: resposta.data.resposta });
});

app.post("/voz", async (req, res) => {
  const { audioBase64 } = req.body;
  const transcricao = await axios.post("http://ia_audio:5002/transcrever", {
    audioBase64,
  });
  res.json({ texto: transcricao.data.texto });
});

app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
