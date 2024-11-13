from app.mutant_models import DnaRecord
from app.utils.mutant_detector import is_mutant
from app import db

class MutantService:
    def __init__(self):
        pass

    def detect_mutant(self, dna):
        is_mutant_result = is_mutant(dna)
        dna_sequence = ''.join(dna)

        existing_record = DnaRecord.query.filter_by(sequence=dna_sequence).first()
        if existing_record:
            return existing_record.is_mutant
        else:
            new_dna_record = DnaRecord(sequence=dna_sequence, is_mutant=is_mutant_result)
            db.session.add(new_dna_record)
            db.session.commit()
            return is_mutant_result

    def get_stats(self):
        count_mutant_dna = DnaRecord.query.filter_by(is_mutant=True).count()
        count_human_dna = DnaRecord.query.filter_by(is_mutant=False).count()
        total_dna = count_mutant_dna + count_human_dna
        ratio = count_mutant_dna / total_dna if total_dna > 0 else 0

        return {
            "count_mutant_dna": count_mutant_dna,
            "count_human_dna": count_human_dna,
            "ratio": ratio
        }
    
    