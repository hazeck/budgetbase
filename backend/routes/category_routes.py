from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import Category, User
from extensions import db

category_bp = Blueprint('categories', __name__)

# GET all categories for the current user
@category_bp.route('/', methods=['GET'])
@jwt_required()
def get_categories():
    user_id = get_jwt_identity()
    categories = Category.query.filter_by(user_id=user_id).all()

    return jsonify([
        {"id": c.id, "name": c.name}
        for c in categories
    ]), 200

# POST: create a new category
@category_bp.route('/', methods=['POST'])
@jwt_required()
def create_category():
    user_id = get_jwt_identity()
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({"error": "Category name is required"}), 400

    category = Category(name=name, user_id=user_id)
    db.session.add(category)
    db.session.commit()

    return jsonify({
        "id": category.id,
        "name": category.name
    }), 201

# PUT: update category name
@category_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(id=id, user_id=user_id).first()

    if not category:
        return jsonify({"error": "Category not found"}), 404

    data = request.get_json()
    new_name = data.get('name')

    if not new_name:
        return jsonify({"error": "New name required"}), 400

    category.name = new_name
    db.session.commit()

    return jsonify({"id": category.id, "name": category.name}), 200

# DELETE a category
@category_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(id=id, user_id=user_id).first()

    if not category:
        return jsonify({"error": "Category not found"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({"msg": "Category deleted"}), 200
