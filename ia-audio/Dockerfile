FROM python:3.10

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y ffmpeg && apt-get clean
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5002
CMD ["python", "main.py"]