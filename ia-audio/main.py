from flask import Flask, request, jsonify
import whisper
import base64
import io
import torch

app = Flask(__name__)
model = whisper.load_model("base")


@app.route("/transcrever", methods=["POST"])
def transcrever():
    data = request.get_json()
    audio_bytes = base64.b64decode(data["audioBase64"])
    audio_io = io.BytesIO(audio_bytes)
    audio_path = "temp_audio.wav"

    with open(audio_path, "wb") as f:
        f.write(audio_io.read())

    result = model.transcribe(audio_path)
    return jsonify({"texto": result["text"]})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
