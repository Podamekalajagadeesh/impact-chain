from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Mock AI verification - replace with real AI model in production
def verify_impact_report(description, image_url):
    """
    Mock AI verification function.
    In production, this would:
    1. Download and analyze the image using computer vision
    2. Use NLP to analyze the description
    3. Check for consistency between image and description
    4. Detect potential fraud or manipulation
    """
    time.sleep(1)  # Simulate processing time
    
    # Mock verification logic
    keywords = ['school', 'hospital', 'water', 'food', 'shelter', 'education', 'medical', 'aid']
    has_keywords = any(keyword in description.lower() for keyword in keywords)
    
    # Simulate confidence score
    confidence = random.uniform(0.7, 0.95) if has_keywords else random.uniform(0.3, 0.6)
    verified = confidence > 0.65
    
    if verified:
        message = "Report appears legitimate. Description matches expected impact patterns."
    else:
        message = "Report requires manual review. Insufficient evidence or unclear description."
    
    return {
        'verified': verified,
        'confidence': round(confidence, 2),
        'message': message
    }

@app.route('/verify', methods=['POST'])
def verify():
    """Endpoint to verify impact reports"""
    data = request.json
    description = data.get('description', '')
    image_url = data.get('imageUrl', '')
    
    if not description or not image_url:
        return jsonify({
            'error': 'Missing description or imageUrl'
        }), 400
    
    result = verify_impact_report(description, image_url)
    return jsonify(result)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'AI Verification Service Running'})

if __name__ == '__main__':
    print("🤖 Starting AI Verification Backend on http://localhost:5000")
    print("📝 Endpoints:")
    print("   POST /verify - Verify impact reports")
    print("   GET /health - Health check")
    app.run(debug=True, port=5000)
