import React, { useState } from 'react';

function CategoryForm({ addCategory }) {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim()) {
      addCategory(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="New Category"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Add Category</button>
    </form>
  );
}

export default CategoryForm;
