FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN python treinar.py

EXPOSE 5001
CMD ["python", "main.py"]
