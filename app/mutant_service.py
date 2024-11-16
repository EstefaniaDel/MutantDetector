from app.mutant_models import Mutant
from app.utils.mutant_detector import is_mutant
from app import db
from sqlalchemy.exc import SQLAlchemyError
import logging

class MutantService:
    def __init__(self):
        pass

    def detect_mutant(self, dna):
        is_mutant_result = is_mutant(dna)
        dna_sequence = ''.join(dna)
        existing_record = Mutant.query.filter_by(sequence_dna=dna_sequence).first()
        try:
            if existing_record:
                logging.info(f"El registro ya existe en la base de datos: {existing_record.id}")
                return existing_record.is_mutant
            else:
                new_dna_record = Mutant(sequence_dna=dna_sequence, is_mutant=is_mutant_result)
                db.session.add(new_dna_record)
                db.session.commit()
                logging.info(f"Nuevo registro creado en la base de datos: {new_dna_record.id}")
                return is_mutant_result
        except SQLAlchemyError as e:
            raise ValueError(f"Error al detectar mutante: {e}")

    def get_stats(self):
        try:
            count_mutant_dna = Mutant.query.filter_by(is_mutant=True).count()
            count_human_dna = Mutant.query.filter_by(is_mutant=False).count()
            total_dna = count_mutant_dna + count_human_dna
            ratio = count_mutant_dna / total_dna if total_dna > 0 else 0
        except SQLAlchemyError as e:
            raise ValueError(f"Error al obtener estadísticas de la base de datos: {e}")
    

        return {
            "count_mutant_dna": count_mutant_dna,
            "count_human_dna": count_human_dna,
            "ratio": ratio
        }
    
    