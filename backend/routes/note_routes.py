from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Note, db

note_bp = Blueprint('notes', __name__)

@note_bp.route('/', methods=['GET'])
@jwt_required()
def get_notes():
    user_id = get_jwt_identity()
    notes = Note.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": n.id, "title": n.title, "content": n.content} for n in notes])

@note_bp.route('/', methods=['POST'])
@jwt_required()
def create_note():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_note = Note(title=data['title'], content=data['content'], user_id=user_id)
    db.session.add(new_note)
    db.session.commit()
    return jsonify({"msg": "Note created"}), 201

@note_bp.route('/<int:note_id>', methods=['PUT'])
@jwt_required()
def update_note(note_id):
    user_id = get_jwt_identity()
    note = Note.query.filter_by(id=note_id, user_id=user_id).first()
    if not note:
        return jsonify({"msg": "Note not found"}), 404
    data = request.get_json()
    note.title = data['title']
    note.content = data['content']
    db.session.commit()
    return jsonify({"msg": "Note updated"})

@note_bp.route('/<int:note_id>', methods=['DELETE'])
@jwt_required()
def delete_note(note_id):
    user_id = get_jwt_identity()
    note = Note.query.filter_by(id=note_id, user_id=user_id).first()
    if not note:
        return jsonify({"msg": "Note not found"}), 404
    db.session.delete(note)
    db.session.commit()
    return jsonify({"msg": "Note deleted"})
