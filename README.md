### ✅ `README.md`

# Sistema Inteligente de Apoio a Provas do DETRAN

## 📌 Problema

Estudantes que se preparam para a prova teórica do DETRAN muitas vezes têm dúvidas que não são sanadas em tempo hábil, além da dificuldade em encontrar simulados interativos e contextualizados. Este sistema visa oferecer:

- Questionários simulados e correção automática.
- Atendimento a dúvidas por áudio ou texto com resposta automática por IA generativa.

## 🎯 Objetivos

- Fornecer um sistema distribuído com múltiplos agentes de IA.
- Captação e transcrição de áudio.
- Geração de respostas com IA generativa.
- Correção automatizada de simulados.

## 🧱 Arquitetura Inicial

- `/backend`: Node.js + Express (orquestra a aplicação)
- `/ia-generativa`: Microserviço em Python (modelo LLM)
- `/ia-audio`: Microserviço Python (captura e transcrição com Whisper)

## 🛠️ Como rodar

docker-compose up --build

## 🔗 Referências

- [DETRAN-MG Simulados](https://www.detran.mg.gov.br/)
- [OpenAI Whisper](https://github.com/openai/whisper)
- [GPT2 HuggingFace](https://huggingface.co/gpt2)
