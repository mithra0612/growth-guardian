// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useLocation,
// } from "react-router-dom";
// import Investment from "./CalculationTools/InvestmentVsDebtRepayment";
// import BudgetPlanner from "./CalculationTools/BudgetPlanner";
// import Scamprevent from "./ScamPreventionBot/scamprevention";
// import Scamarticle from "./ScamPreventionBot/scampreventionarticle";
// import Retirement from "./CalculationTools/RetirementPlanner";
// import Stock from './StocksAnalysis/stockanalysis';
// import StockingBot from "./StockBot/stockbot";
// // import Learning from "./LearningModules/LearningModules";
// import Learning from "./LearningModules/LearningModulesNew";
// import Stockchart from "./StocksAnalysis/stockchart";

// const NavItem = ({ to, children }) => {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   const [stock, SetStock] = useState("TATASTEEL");
//   console.log(stock);
//   return (
//     <li className="mb-1">
//       <Link
//         to={to}
//         className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
//           isActive
//             ? "bg-blue-600 text-white font-medium"
//             : "text-blue-100 hover:bg-blue-600/40"
//         }`}
//       >
//         {children}
//       </Link>
//     </li>
//   );
// };

// // NavSection component for sections with submenus
// const NavSection = ({ title, children, icon }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   // Check if any child route is active
//   const childPaths = React.Children.map(children, (child) => child.props.to);
//   const isActive = childPaths.some((path) => location.pathname === path);

//   return (
//     <div className="mb-3">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
//           isActive
//             ? "bg-blue-600/70 text-white font-medium"
//             : "text-blue-100 hover:bg-blue-600/40"
//         }`}
//       >
//         <div className="flex items-center">
//           {icon}
//           <span className="ml-3">{title}</span>
//         </div>
//         <svg
//           className={`w-4 h-4 transition-transform duration-200 ${
//             isOpen ? "transform rotate-180" : ""
//           }`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </button>
//       {isOpen && <ul className="mt-1 pl-6">{children}</ul>}
//     </div>
//   );
// };

// // Main App component
// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-50">
//         {/* Sidebar */}
//         {sidebarOpen && (
//           <div className="w-72 h-full bg-gradient-to-b from-blue-700 to-blue-900 shadow-xl">
//             {/* Sidebar Header */}
//             <div className="p-6 flex items-center justify-between">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
//                   <span className="text-blue-700 font-bold text-lg">A</span>
//                 </div>
//                 <h1 className="text-xl font-bold text-white ml-3">
//                   Growth Guardian
//                 </h1>
//               </div>
//               <button
//                 onClick={toggleSidebar}
//                 className="text-blue-200 hover:text-white transition-colors"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Navigation */}
//             <nav className="px-4 py-6">
//               <ul>
//                 <NavItem to="/investmentsimulator">
//                   <svg
//                     className="w-5 h-5 mr-3"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13 10V3L4 14h7v7l9-11h-7z"
//                     />
//                   </svg>
//                   Investment Simulator
//                 </NavItem>
//                 {/* Tools Section */}
//                 <NavSection
//                   title="Tools"
//                   icon={
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
//                       />
//                     </svg>
//                   }
//                 >
//                   <NavItem to="/budgetplanner">Budget Planner</NavItem>
//                   <NavItem to="/invvsdebt">Invest vs Debt Repayment</NavItem>
//                   <NavItem to="/retirementplanner">Retirement Plan</NavItem>
//                 </NavSection>

//                 {/* Scam Prevention Section */}
//                 <NavSection
//                   title="Scam Prevention"
//                   icon={
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       />
//                     </svg>
//                   }
//                 >
//                   <NavItem to="/scamprevention">Scam Prevention Bot</NavItem>
//                   <NavItem to="/scamarticle">Scam Prevention Article</NavItem>
//                 </NavSection>

//                 {/* Stocks Section */}
//                 <NavItem to="/stocks">
//                   <svg
//                     className="w-5 h-5 mr-3"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 10h2l1 2h13l1-2h2m-2 0l-1 2m-1 2h-2l-1 2H8l-1-2H5l-1 2H3m0 0l1-2m1-2h2l1-2h8l1 2h2l1-2h2m-2 0l-1 2m-1 2h-2l-1 2H8l-1-2H5l-1 2H3m0 0l1-2"
//                     />
//                   </svg>
//                   Stocks
//                 </NavItem>

//                 {/* StockBot Section */}
//                 <NavItem to="/stockingbots">
//                   <svg
//                     className="w-5 h-5 mr-3"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   StockBot
//                 </NavItem>
//               </ul>
//             </nav>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Header with navigation */}
//           <header className="bg-white shadow-sm px-6 py-4 flex items-center border-b border-gray-100">
//             {!sidebarOpen && (
//               <button
//                 onClick={toggleSidebar}
//                 className="mr-4 text-blue-600 hover:text-blue-800 transition-colors"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             )}

//             <h1 className="text-xl font-bold text-blue-900">Dashboard</h1>

//             <div className="ml-auto flex items-center space-x-4">
//               <button className="text-gray-500 hover:text-blue-600 transition-colors">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                   />
//                 </svg>
//               </button>
//               <button className="text-gray-500 hover:text-blue-600 transition-colors">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </header>

//           <main className="flex-1 overflow-auto bg-gray-50">
//             <Routes>
//               {/* Tool routes */}
//               <Route path="/budgetplanner" element={<BudgetPlanner />} />
//               <Route path="/investmentsimulator" element={<Learning />} />
//               <Route path="/invvsdebt" element={<Investment />} />
//               <Route path="/retirementplanner" element={<Retirement />} />

//               {/* Scam Prevention routes */}
//               <Route path="/scamprevention" element={<Scamprevent />} />
//               <Route path="/scamarticle" element={<Scamarticle />} />

//               {/* Default route */}
//               <Route path="/" element={<BudgetPlanner />} />
//               <Route path="/stockingbots" element={<StockingBot />} />

//               {/* Settings route */}
//               <Route
//                 path="/stocks"
//                 element={
//                   <Stock/>
//                 }
//               />
//               <Route
//                 path="/stockschart"
//                 element={
//                   <Stockchart/>
//                 }
//               />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react'
import AssetReturnForecast from "./AssetForecast/AssetReturnForecast";
function App() {
  return (
    <div>
      <AssetReturnForecast/>
    </div>
  )
}

export default App
