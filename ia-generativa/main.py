from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)
qa_pipeline = pipeline("text-generation", model="distilgpt2")


@app.route("/responder", methods=["POST"])
def responder():
    return jsonify({"resposta": "resposta"})
    data = request.get_json()
    pergunta = data.get("pergunta", "")
    resposta = qa_pipeline(pergunta, max_length=100, num_return_sequences=1)[0][
        "generated_text"
    ]
    return jsonify({"resposta": resposta})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
