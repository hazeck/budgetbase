import React from 'react';

function ExpenseItem({ expense, deleteExpense }) {
  return (
    <div className="expense-item">
      <div>
        <strong>{expense.description}</strong> — ${expense.amount.toFixed(2)}
        <span className="category">({expense.category})</span>
      </div>
      <button onClick={() => deleteExpense(expense.id)}>Delete</button>
    </div>
  );
}

export default ExpenseItem;
