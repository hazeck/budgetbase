import React, { useState } from 'react';

function ExpenseForm({ addExpense, categories }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (description && amount && category) {
      addExpense({
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category
      });
      setDescription('');
      setAmount('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Expense Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
