# Mutant Detector
---
## Description
This project is a simple tool to detect mutants in a given DNA sequence. It is able to detect horizontal, vertical and diagonal mutants. The project is written in Python and uses the Flask framework to expose a REST API. The API has two endpoints, one to check if a DNA sequence is mutant and another to get the statistics of the DNA sequences analyzed.

*The .env is visible since it is a test*
## Requirements

```bash
- Linux
- Docker
- Docker Compose
```

### Installation
1. Clone the repository
```bash
git clone 
```

## Usage with Docker

1. Run the application
```bash
docker-compose up --build
```

2. Down the application
```bash
docker-compose down
```

## API Endpoints

### Mutant Detection
- **URL**
```bash
POST /mutant/
```

- **Request**
```bash
{
    "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```

- **Response**
```bash
200 OK
```
```bash
403 Forbidden
```

### Statistics
- **URL**
```bash
GET /stats/
```

- **Response**
```bash
200 OK
```
```bash
{
    "count_mutant_dna": 40,
    "count_human_dna": 100,
    "ratio": 0.4
}
```

## Testing

1. Run the tests
```bash
python -m unittest tests/test_mutant_detector.py 
```

