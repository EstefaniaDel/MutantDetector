from app.mutant_service import MutantService
from app import app
from flask import request, jsonify

@app.route('/mutant', methods=['POST'])
def post_mutant():
    data = request.json
    dna = data.get('dna')

    if MutantService().detect_mutant(dna):
        return jsonify({"message": "Mutant detected"}), 200
    else:
        return jsonify({"message": "Not a mutant"}), 403

@app.route('/stats', methods=['GET'])
def get_stats():
    mutant_service = MutantService()
    stats = mutant_service.get_stats()
    return jsonify(stats)