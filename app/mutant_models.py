from app import db

class DnaRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sequence = db.Column(db.String(255), unique=True, nullable=False)
    is_mutant = db.Column(db.Boolean, nullable=False)