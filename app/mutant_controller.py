from flask import request, jsonify
from app.mutant_service import MutantService

class MutantController:
    def __init__(self, app):
        self.app = app
        self.mutant_service = MutantService()
        self.init_routes()

    def init_routes(self):
        @self.app.route('/mutant', methods=['POST'])
        def post_mutant():
            data = request.json
            dna = data.get('dna')

            if not isinstance(dna, list) or not all(isinstance(seq, str) for seq in dna):
                return jsonify({"error": "La entrada debe ser una lista de cadenas de ADN"}), 400
            
            try:
                if self.mutant_service.detect_mutant(dna):
                    return jsonify({"message": "Mutant detected"}), 200
                else:
                    return jsonify({"message": "Not a mutant"}), 403
            except ValueError as e:
                return jsonify({"error": str(e)}), 400

        @self.app.route('/stats', methods=['GET'])
        def get_stats():
            try:
                stats = self.mutant_service.get_stats()
                return jsonify(stats)
            except ValueError as e:
                return jsonify({"error": str(e)}), 400
