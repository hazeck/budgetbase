from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import Expense, Category
from extensions import db
from datetime import datetime

expense_bp = Blueprint('expenses', __name__)

# GET all expenses for the current user
@expense_bp.route('/', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": e.id,
            "amount": e.amount,
            "description": e.description,
            "date": e.date.isoformat(),
            "category_id": e.category_id
        }
        for e in expenses
    ]), 200

# POST: Create a new expense
@expense_bp.route('/', methods=['POST'])
@jwt_required()
def create_expense():
    user_id = get_jwt_identity()
    data = request.get_json()

    try:
        amount = float(data.get('amount'))
    except:
        return jsonify({"error": "Amount must be a number"}), 400

    category_id = data.get('category_id')
    description = data.get('description')
    date_str = data.get('date')  # optional

    category = Category.query.filter_by(id=category_id, user_id=user_id).first()
    if not category:
        return jsonify({"error": "Category not found or unauthorized"}), 404

    try:
        date = datetime.fromisoformat(date_str).date() if date_str else datetime.utcnow().date()
    except:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

    expense = Expense(
        amount=amount,
        description=description,
        date=date,
        user_id=user_id,
        category_id=category_id
    )
    db.session.add(expense)
    db.session.commit()

    return jsonify({
        "id": expense.id,
        "amount": expense.amount,
        "description": expense.description,
        "date": expense.date.isoformat(),
        "category_id": expense.category_id
    }), 201

# PUT: Update an expense
@expense_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_expense(id):
    user_id = get_jwt_identity()
    expense = Expense.query.filter_by(id=id, user_id=user_id).first()

    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    data = request.get_json()

    if 'amount' in data:
        try:
            expense.amount = float(data['amount'])
        except:
            return jsonify({"error": "Amount must be a number"}), 400

    if 'description' in data:
        expense.description = data['description']

    if 'date' in data:
        try:
            expense.date = datetime.fromisoformat(data['date']).date()
        except:
            return jsonify({"error": "Invalid date format"}), 400

    if 'category_id' in data:
        new_category = Category.query.filter_by(id=data['category_id'], user_id=user_id).first()
        if not new_category:
            return jsonify({"error": "Category not found or unauthorized"}), 404
        expense.category_id = new_category.id

    db.session.commit()

    return jsonify({"msg": "Expense updated"}), 200

# DELETE: Remove an expense
@expense_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_expense(id):
    user_id = get_jwt_identity()
    expense = Expense.query.filter_by(id=id, user_id=user_id).first()

    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    db.session.delete(expense)
    db.session.commit()

    return jsonify({"msg": "Expense deleted"}), 200
