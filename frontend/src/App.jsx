import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Investment from "./CalculationTools/InvestmentVsDebtRepayment";
import BudgetPlanner from "./CalculationTools/BudgetPlanner";
import Scamprevent from "./ScamPreventionBot/scamprevention";
import Scamarticle from "./ScamPreventionBot/scampreventionarticle";
import Retirement from "./CalculationTools/RetirementPlanner";

// NavItem component for regular links
const NavItem = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="mb-1">
      <Link
        to={to}
        className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
          isActive
            ? "bg-blue-600 text-white font-medium"
            : "text-blue-100 hover:bg-blue-600/40"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

// NavSection component for sections with submenus
const NavSection = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if any child route is active
  const childPaths = React.Children.map(children, (child) => child.props.to);
  const isActive = childPaths.some((path) => location.pathname === path);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
          isActive
            ? "bg-blue-600/70 text-white font-medium"
            : "text-blue-100 hover:bg-blue-600/40"
        }`}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{title}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <ul className="mt-1 pl-6">{children}</ul>}
    </div>
  );
};

// Main App component
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-72 h-full bg-gradient-to-b from-blue-700 to-blue-900 shadow-xl">
            {/* Sidebar Header */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-lg">A</span>
                </div>
                <h1 className="text-xl font-bold text-white ml-3">
                  FinanceBuddy
                </h1>
              </div>
              <button
                onClick={toggleSidebar}
                className="text-blue-200 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6">
              <ul>
                {/* Tools Section */}
                <NavSection
                  title="Tools"
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  }
                >
                  <NavItem to="/budgetplanner">Budget Planner</NavItem>
                  <NavItem to="/invvsdebt">Invest vs Debt Repayment</NavItem>
                  <NavItem to="/retirementplanner">Retirement Plan</NavItem>
                </NavSection>

                {/* Scam Prevention Section */}
                <NavSection
                  title="Scam Prevention"
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  }
                >
                  <NavItem to="/scamprevention">Scam Prevention Bot</NavItem>
                  <NavItem to="/scamarticle">Scam Prevention Article</NavItem>
                </NavSection>

                {/* Settings */}
                <NavItem to="/settings">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </NavItem>
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with navigation */}
          <header className="bg-white shadow-sm px-6 py-4 flex items-center border-b border-gray-100">
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="mr-4 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}

            <h1 className="text-xl font-bold text-blue-900">Dashboard</h1>

            <div className="ml-auto flex items-center space-x-4">
              <button className="text-gray-500 hover:text-blue-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-blue-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            <Routes>
              {/* Tool routes */}
              <Route path="/budgetplanner" element={<BudgetPlanner />} />
              <Route path="/invvsdebt" element={<Investment />} />
              <Route path="/retirementplanner" element={<Retirement />} />

              {/* Scam Prevention routes */}
              <Route path="/scamprevention" element={<Scamprevent />} />
              <Route path="/scamarticle" element={<Scamarticle />} />

              {/* Default route */}
              <Route path="/" element={<BudgetPlanner />} />

              {/* Settings route */}
              <Route path="/settings" element={<div>Settings Page</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
