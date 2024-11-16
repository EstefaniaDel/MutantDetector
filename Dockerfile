FROM python:3.12.4-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

# CMD ["python", "run.py"]
CMD ["flask", "run", "--host=0.0.0.0"]