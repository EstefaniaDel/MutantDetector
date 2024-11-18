FROM python:3.12.4-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

COPY script/wait-for-it.sh .
RUN chmod +x script/wait-for-it.sh

CMD ["./wait-for-it.sh", "db:3306", "--", "gunicorn", "-b", "0.0.0.0:8080", "run:app"]
