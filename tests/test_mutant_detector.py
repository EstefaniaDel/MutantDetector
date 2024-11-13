import unittest
from app import create_app, db
from app.mutant_models import DnaRecord
from app.mutant_service import MutantService


class TestMutantDetector(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.app_context = cls.app.app_context()
        cls.app_context.push()
        db.create_all()

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.drop_all()
        cls.app_context.pop()

    def setUp(self):
        DnaRecord.query.delete()
        db.session.commit()

    def test_is_mutant(self):
        mutant_service = MutantService()
        self.assertTrue(mutant_service.detect_mutant(["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]),
                        "Expected the DNA sequence to be identified as mutant.")

    def test_get_stats(self):
        mutant_service = MutantService()
        self.assertEqual(mutant_service.get_stats(), {"count_mutant_dna": 0, "count_human_dna": 0, "ratio": 0},
                         "Expected stats to be zero for no DNA records.")

    def test_multiple_mutants(self):
        mutant_service = MutantService()
        mutant_service.detect_mutant(["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"])
        mutant_service.detect_mutant(["ATGCGA", "CAGTGC", "TTATGT", "AGACGG", "CCCCCA", "TCACTG"])
        self.assertEqual(mutant_service.get_stats(), {"count_mutant_dna": 2, "count_human_dna": 0, "ratio": 1.0},
                         "Expected 1 mutant DNA record and 0 human DNA records.")


    def test_human_dna(self):
        mutant_service = MutantService()
        mutant_service.detect_mutant(["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"])
        mutant_service.detect_mutant(["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"])
        
        self.assertEqual(mutant_service.get_stats(), {"count_mutant_dna": 1, "count_human_dna": 1, "ratio": 0.5},
                         "Expected 1 mutant DNA record and 1 human DNA record.")

    def test_no_dna(self):
        mutant_service = MutantService()
        self.assertEqual(mutant_service.get_stats(), {"count_mutant_dna": 0, "count_human_dna": 0, "ratio": 0},
                         "Expected stats to be zero for no DNA records.")

if __name__ == '__main__':
    unittest.main()