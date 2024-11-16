from app import db

class Mutant(db.Model):
    __tablename__ = 'dna_record'
    
    id = db.Column(db.Integer, primary_key=True)
    sequence_dna = db.Column(db.String(255), nullable=False)
    is_mutant = db.Column(db.Boolean, nullable=False)
    
    def __init__(self, sequence_dna, is_mutant):
        self.sequence_dna = sequence_dna
        self.is_mutant = is_mutant

