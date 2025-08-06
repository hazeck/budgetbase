from flask import Flask
from extensions import db, bcrypt, jwt
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    CORS(
    app,
    origins=["http://localhost:5173/"],
    methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True
)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

   

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    from routes.auth_routes import auth_bp
    from routes.expense_routes import expense_bp
    from routes.category_routes import category_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(expense_bp, url_prefix="/expenses")
    app.register_blueprint(category_bp, url_prefix="/categories")

    @app.route("/")
    def index():
        return {"msg": "BudgetBase API is running!"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
