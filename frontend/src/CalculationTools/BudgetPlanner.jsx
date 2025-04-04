import { useState, useEffect } from 'react';

function BudgetPlanner() {
    // State management remains the same
    const [budget, setBudget] = useState(150000);
    const [expenses, setExpenses] = useState([]);
    const [remaining, setRemaining] = useState(budget);
    const [spent, setSpent] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(budget);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('groceries');
  
    // Calculate spent and remaining amounts
    useEffect(() => {
      const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);
      setSpent(totalSpent);
      setRemaining(budget - totalSpent);
    }, [expenses, budget]);
  
    // Handlers remain the same
    const handleBudgetSubmit = (e) => {
      e.preventDefault();
      updateBudget(Number(newBudget));
      setIsEditing(false);
    };
  
    const updateBudget = (newBudgetAmount) => {
      setBudget(newBudgetAmount);
    };
  
    const handleExpenseSubmit = (e) => {
      e.preventDefault();
      if (name.trim() === '' || amount <= 0) return;
      
      addExpense({
        name,
        amount: Number(amount),
        category,
        date: new Date().toISOString().slice(0, 10)
      });
      
      setName('');
      setAmount('');
      setCategory('groceries');
    };
  
    const addExpense = (expense) => {
      setExpenses([...expenses, { ...expense, id: Date.now() }]);
    };
  
    const deleteExpense = (id) => {
      setExpenses(expenses.filter(expense => expense.id !== id));
    };
  
    const formatINR = (num) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(num);
    };
  
    // Calculate percentage for progress bar
    const spentPercentage = Math.min((spent / budget) * 100, 100);
    const remainingPercentage = remaining > 0 ? (remaining / budget) * 100 : 0;
  
    return (
      <div className="min-h-screen bg-blue-50 p-0">
        {/* Header remains the same */}
        <header className="bg-blue-700 text-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center">Budget Planner</h1>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Budget Summary and Forms remains the same */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-800">Budget Summary</h2>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {isEditing ? 'Cancel' : 'Edit Budget'}
                  </button>
                </div>
  
                {isEditing ? (
                  <form onSubmit={handleBudgetSubmit} className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={newBudget}
                        onChange={(e) => setNewBudget(e.target.value)}
                        className="border border-blue-300 rounded p-2 mr-2 w-full"
                        min="0"
                      />
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 rounded-lg p-4 text-center">
                      <p className="text-blue-700 text-sm font-medium">BUDGET</p>
                      <p className="text-2xl font-bold text-blue-800">{formatINR(budget)}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-blue-700 text-sm font-medium">REMAINING</p>
                      <p className="text-2xl font-bold text-blue-800">{formatINR(remaining)}</p>
                    </div>
                    <div className="bg-blue-200 rounded-lg p-4 text-center">
                      <p className="text-blue-700 text-sm font-medium">SPENT</p>
                      <p className="text-2xl font-bold text-blue-800">{formatINR(spent)}</p>
                    </div>
                  </div>
                )}
              </div>
  
              {/* Expense Form remains the same */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Add New Expense</h2>
                <form onSubmit={handleExpenseSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                        Expense Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-blue-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Groceries, Rent, etc."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="amount">
                        Amount (₹)
                      </label>
                      <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border border-blue-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                        min="1"
                        step="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
                        Category
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-blue-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="groceries">Groceries</option>
                        <option value="housing">Housing & Rent</option>
                        <option value="utilities">Utilities</option>
                        <option value="transport">Transportation</option>
                        <option value="dining">Dining Out</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Add Expense
                      </button>
                    </div>
                  </div>
                </form>
              </div>
  
              {/* Expense List remains the same */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Your Expenses</h2>
                {expenses.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No expenses recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-blue-200">
                      <thead className="bg-blue-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-blue-100">
                        {expenses.map((expense) => (
                          <tr key={expense.id} className="hover:bg-blue-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {expense.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {expense.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                              {formatINR(expense.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => deleteExpense(expense.id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Custom Progress Bar Visualization */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Budget Overview</h2>
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                            Spending Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {spentPercentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-100">
                        <div 
                          style={{ width: `${spentPercentage}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            spentPercentage > 80 ? 'bg-red-500' : 'bg-blue-600'
                          } transition-all duration-500`}
                        ></div>
                      </div>
                    </div>
                  </div>
  
                  {/* Summary Stats */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Budget:</span>
                      <span className="text-sm font-medium text-blue-800">{formatINR(budget)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Spent:</span>
                      <span className="text-sm font-medium text-blue-800">{formatINR(spent)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Remaining:</span>
                      <span className={`text-sm font-medium ${
                        remaining >= 0 ? 'text-blue-800' : 'text-red-600'
                      }`}>
                        {formatINR(remaining)}
                      </span>
                    </div>
                  </div>
  
                  {/* Status Message */}
                  <div className="text-center">
                    <p className={`text-sm ${
                      remaining > 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {remaining > 0 ? 
                        `You still have ${formatINR(remaining)} left to spend` :
                        `You've exceeded your budget by ${formatINR(Math.abs(remaining))}`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default BudgetPlanner;

