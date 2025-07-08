import requests
from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)
qa_pipeline = pipeline("text-generation", model="distilgpt2")


@app.route("/responder", methods=["POST"])
def responder():
    print("Requisição recebida")
    data = request.get_json()
    pergunta = data.get("pergunta", "") 
    api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    api_key = "CHAVE_API"
    headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": api_key
    }
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": pergunta
                    }
                ]
            }
        ]
    }

    response = requests.post(api_url, headers=headers, json=payload)
    if response.ok:
        resposta_json = response.json()
        # Extraia o texto gerado (ajuste conforme o formato real da resposta)
        try:
            resposta_texto = resposta_json["candidates"][0]["content"]["parts"][0]["text"]
            resposta = {"resposta": resposta_texto}
        except (KeyError, IndexError):
            resposta = {"error": "Formato inesperado na resposta da API Gemini"}
    else:
        resposta = {"error": "Erro ao chamar a API Gemini"}
    print(response)
    return jsonify(resposta)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

   