import os
import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()  

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    
    with app.app_context():
        from app import mutant_controller
        
        for _ in range(5):  
            try:
                db.create_all()
                break  
            except Exception as e:
                print(f"Error creating tables: {e}, retrying...")
                time.sleep(5)  

        mutant_controller.MutantController(app)
    
    return app