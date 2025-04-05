import React, { useState, useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  Pie,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Cell,
} from "recharts";
import {
  IndianRupeeIcon,
  DollarSign,
  ShoppingCart,
  BarChart2,
  CheckCircle,
  Target,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

const FinancialDashboard = () => {
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    income: 74700, // 900 * 83 (was 5200 * 83)
    expenses: 53950, // 650 * 83 (was 3700 * 83)
    budget: 62250, // 750 * 83 (was 4500 * 83)
    savings: {
      current: 166000, // 2000 * 83 (was 12500 * 83)
      goal: 415000, // 5000 * 83 (was 20000 * 83)
    },
    familyMembers: [
      { name: "Alex Johnson", savings: 166000, savingsGoal: 4150 }, // 2000, 5000 * 83
      { name: "Taylor Johnson", savings: 124500, savingsGoal: 3320 }, // 1500, 4000 * 83
      { name: "Riley Johnson", savings: 83000, savingsGoal: 2075 }, // 1000, 2500 * 83
      { name: "Jordan Johnson", savings: 62250, savingsGoal: 1660 }, // 750, 2000 * 83
    ],
modules: [
  { name: "Budgeting", progress: 50 },
  { name: "Saving", progress: 25 },
  { name: "Investing", progress: 0 },
  { name: "Taxes", progress: 0 },
  { name: "Credit", progress: 0 },
  { name: "Financial Security", progress: 0 },
],

familyModuleProgress: [
  {
    member: "Alex Johnson",
    modules: [
      { name: "Budgeting", progress: 50 },
      { name: "Saving", progress: 25 },
      { name: "Investing", progress: 0 },
      { name: "Taxes", progress: 0 },
      { name: "Credit", progress: 0 },
      { name: "Financial Security", progress: 0 },
    ],
  },
  {
    member: "Taylor Johnson",
    modules: [
      { name: "Budgeting", progress: 75 },
      { name: "Saving", progress: 50 },
      { name: "Investing", progress: 0 },
      { name: "Taxes", progress: 0 },
      { name: "Credit", progress: 25 },
      { name: "Financial Security", progress: 0 },
    ],
  },
  {
    member: "Riley Johnson",
    modules: [
      { name: "Budgeting", progress: 25 },
      { name: "Saving", progress: 0 },
      { name: "Investing", progress: 0 },
      { name: "Taxes", progress: 0 },
      { name: "Credit", progress: 0 },
      { name: "Financial Security", progress: 0 },
    ],
  },
  {
    member: "Jordan Johnson",
    modules: [
      { name: "Budgeting", progress: 0 },
      { name: "Saving", progress: 0 },
      { name: "Investing", progress: 0 },
      { name: "Taxes", progress: 0 },
      { name: "Credit", progress: 0 },
      { name: "Financial Security", progress: 0 },
    ],
  },
],
  });
  const [showCharts, setShowCharts] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShowCharts(true);
    }, 300);
  }, []);

  const expenseData = [
    { name: "Housing", value: 20750, color: "#3B82F6" }, // 250 * 83 (was 1500 * 83)
    { name: "Food", value: 12450, color: "#60A5FA" }, // 150 * 83 (was 800 * 83)
    { name: "Transport", value: 8300, color: "#93C5FD" }, // 100 * 83 (was 600 * 83)
    { name: "Utilities", value: 6225, color: "#BFDBFE" }, // 75 * 83 (was 350 * 83)
    { name: "Insurance", value: 4150, color: "#2563EB" }, // 50 * 83 (was 200 * 83)
    { name: "Others", value: 2075, color: "#1D4ED8" }, // 25 * 83 (was 250 * 83)
  ];

  const monthlyData = [
    { month: "Jan", income: 70550, expenses: 49800, savings: 20750 }, // 850, 600, 250 * 83
    { month: "Feb", income: 72225, expenses: 51475, savings: 20750 }, // 870, 620, 250 * 83
    { month: "Mar", income: 73060, expenses: 53950, savings: 19110 }, // 880, 650, 230 * 83
    { month: "Apr", income: 74700, expenses: 53950, savings: 20750 }, // 900, 650, 250 * 83
    { month: "May", income: 75535, expenses: 49800, savings: 25735 }, // 910, 600, 310 * 83
    { month: "Jun", income: 76370, expenses: 55625, savings: 20745 }, // 920, 670, 250 * 83
  ];

  const savingsHistory = [
    { month: "Jan", amount: 83000 }, // 1000 * 83 (was 8000 * 83)
    { month: "Feb", amount: 103750 }, // 1250 * 83 (was 9500 * 83)
    { month: "Mar", amount: 124500 }, // 1500 * 83 (was 10850 * 83)
    { month: "Apr", amount: 166000 }, // 2000 * 83 (was 12500 * 83)
    { month: "May", amount: 191750 }, // 2310 * 83 (was 14350 * 83)
    { month: "Jun", amount: 207500 }, // 2500 * 83 (was 15750 * 83)
  ];

  // Format currency to INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const remainingBudget = userData.budget - userData.expenses;
  const budgetStatus = remainingBudget >= 0 ? "text-green-600" : "text-red-600";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-700">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8 bg-white rounded-3xl shadow-lg p-6 transform transition-all duration-500 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome back, {userData.name}
              </h1>
              <p className="text-gray-500">{formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "Total Income",
              value: userData.income,
              icon: <IndianRupeeIcon size={20} />,
              color: "from-blue-400 to-blue-500",
            },
            {
              title: "Total Expenses",
              value: userData.expenses,
              icon: <ShoppingCart size={20} />,
              color: "from-red-400 to-red-500",
            },
            {
              title: "Monthly Budget",
              value: userData.budget,
              icon: <BarChart2 size={20} />,
              color: "from-purple-400 to-purple-500",
            },
            {
              title: "Remaining Budget",
              value: remainingBudget,
              icon: <CheckCircle size={20} />,
              color:
                remainingBudget >= 0
                  ? "from-green-400 to-green-500"
                  : "from-red-400 to-red-500",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md pb-2 pt-5 px-3 py-3 transition-all duration-300 transform 
                          ${
                            activeCard === index
                              ? "scale-105 shadow-xl"
                              : "hover:scale-105 hover:shadow-lg"
                          }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm text-gray-500 font-medium">
                  {card.title}
                </h2>
                <div
                  className={`text-white p-2 rounded-lg bg-gradient-to-r ${card.color}`}
                >
                  {card.icon}
                </div>
              </div>
              <p
                className={`text-2xl font-bold ${
                  card.title === "Remaining Budget"
                    ? budgetStatus
                    : "text-gray-800"
                }`}
              >
                {formatCurrency(card.value)}
              </p>
            </div>
          ))}
        </div>

        {/* Transactions and Expense Breakdown Section */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transition-opacity duration-1000 ${
            showCharts ? "opacity-100 " : "opacity-0"
          }`}
        >
          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Transactions
              </h2>
              <div className="text-blue-600 text-xs font-medium px-2 py-1 rounded-full border border-blue-200 hover:bg-blue-50 cursor-pointer transition-all">
                See All →
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  name: "Grocery Shopping",
                  date: "April 4, 2025",
                  amount: -2075, // -25 * 83 (was -85 * 83)
                },
                {
                  name: "Salary Deposit",
                  date: "April 2, 2025",
                  amount: 37350, // 450 * 83 (was 2600 * 83)
                },
                {
                  name: "Utility Bills",
                  date: "April 1, 2025",
                  amount: -3320, // -40 * 83 (was -145 * 83)
                },
                {
                  name: "Restaurant",
                  date: "April 3, 2025",
                  amount: -1245, // -15 * 83 (was -62 * 83)
                },
              ].map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-100 pb-2 transition-all duration-200 hover:bg-gray-50 hover:pl-2 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <ArrowDown size={16} className="text-green-500" />
                      ) : (
                        <ArrowUp size={16} className="text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        {transaction.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-medium ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium transition-all transform hover:translate-y-px hover:shadow-lg">
              View All Transactions
            </button>
          </div>

          {/* Expense Breakdown Pie Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Expense Breakdown
              </h2>
              <div className="bg-red-50 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                April 2025
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    animationBegin={300}
                    animationDuration={1500}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Family Member Savings Section */}
        <div
          className={`grid grid-cols-1 mb-8 transition-opacity duration-1000 ${
            showCharts ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Family Savings Progress
                </h2>
                <p className="text-gray-500 text-sm">
                  Track savings goals for each family member
                </p>
              </div>
              <div className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                Family Plan
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userData.familyMembers.map((member, index) => (
                <div
                  key={index}
                  className={`border rounded-xl p-4 transition-all duration-300 transform hover:shadow-md 
                             ${
                               index === 0
                                 ? "border-blue-300 bg-blue-50"
                                 : "border-gray-200"
                             }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold mr-3">
                      {member.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {member.name}
                      </h3>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 mr-2">
                          Savings Goal:
                        </span>
                        <span className="font-medium text-blue-600">
                          {formatCurrency(member.savingsGoal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Progress</span>
                      <span className="text-sm font-medium text-blue-600">
                        {Math.round(
                          (member.savings / member.savingsGoal) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (member.savings / member.savingsGoal) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        Current: {formatCurrency(member.savings)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Goal: {formatCurrency(member.savingsGoal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Literacy Learning Modules */}
        <div
          className={`mb-8 transition-opacity duration-1000 ${
            showCharts ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Family Financial Literacy Progress
                </h2>
                <p className="text-gray-500 text-sm">
                  Track each family member's learning progress
                </p>
              </div>
              <div className="flex space-x-2">
                {userData.familyMembers.map((member, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all 
                              ${
                                selectedFamilyMember === index
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                    onClick={() => setSelectedFamilyMember(index)}
                  >
                    {member.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {userData.familyModuleProgress[selectedFamilyMember].modules.map(
                (module, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl border shadow-sm p-5 transition-all duration-300 transform hover:shadow-md hover:border-blue-300 cursor-pointer 
                             ${
                               module.progress > 0
                                 ? "border-l-4 border-blue-500"
                                 : "border"
                             }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800">
                        {module.name}
                      </h3>
                      {module.progress === 0 ? (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          Not Started
                        </span>
                      ) : module.progress === 100 ? (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${
                              module.progress > 0
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                : "bg-gray-300"
                            } h-2 rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {module.progress}%
                      </span>
                    </div>
                    <button
                      className={`mt-3 w-full text-center text-xs font-medium py-1 rounded-lg 
                                     ${
                                       module.progress === 0
                                         ? "bg-blue-500 text-white hover:bg-blue-600"
                                         : module.progress === 100
                                         ? "border border-gray-200 text-gray-500 hover:bg-gray-50"
                                         : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                     } 
                                     transition-all`}
                    >
                      {module.progress === 0
                        ? "Start Module"
                        : module.progress === 100
                        ? "Review"
                        : "Continue"}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;