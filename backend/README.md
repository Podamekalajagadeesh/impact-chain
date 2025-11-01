# Impact Chain Backend - AI Verification Service

A Python Flask backend that provides AI verification for impact reports.

## Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /verify
Verify an impact report using AI.

**Request Body:**
```json
{
  "description": "Built a school with 50 students enrolled",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "verified": true,
  "confidence": 0.87,
  "message": "Report appears legitimate. Description matches expected impact patterns."
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "AI Verification Service Running"
}
```

## Future Enhancements

For production, replace the mock verification with:
- Computer vision models (e.g., ResNet, YOLO) for image analysis
- NLP models (e.g., BERT, GPT) for text analysis
- Image authenticity detection
- Geolocation verification
- Cross-reference with public databases
