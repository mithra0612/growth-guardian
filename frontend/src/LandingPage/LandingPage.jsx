import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const GrowthGuardianLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [spotlightColor, setSpotlightColor] = useState(
    "rgba(29, 78, 216, 0.15)"
  );
  const handleClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Change color based on mouse position
      // This maps x position to the hue value in HSL color
      const hue = e.clientX % 360; // 0-360 range for hue
      const saturation = 80; // Keep relatively high saturation
      const lightness = 60; // Keep moderate lightness
      const alpha = 0.15; // Keep same transparency

      setSpotlightColor(
        `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const subscriptions = [
    {
      tier: "Basic",
      price: "$9.99",
      period: "monthly",
      features: [
        "Financial literacy courses",
        "Basic investment guides",
        "Limited stock simulations",
        "Email support",
      ],
      color: "bg-blue-500",
      hover: "hover:bg-blue-600",
    },
    {
      tier: "Pro",
      price: "$19.99",
      period: "monthly",
      features: [
        "All Basic features",
        "Advanced investment strategies",
        "Unlimited stock simulations",
        "Family account creation",
        "Priority support",
      ],
      color: "bg-purple-500",
      hover: "hover:bg-purple-600",
      popular: true,
    },
    {
      tier: "Advanced",
      price: "$29.99",
      period: "monthly",
      features: [
        "All Pro features",
        "AI stock predictions",
        "Family finance management",
        "Personalized investment advice",
        "Scam alerts",
        "24/7 priority support",
      ],
      color: "bg-green-500",
      hover: "hover:bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mr-2"
            >
              <div className="w-10 h-10 bg-green-500 rounded-lg transform rotate-12 relative">
                <div className="absolute w-6 h-6 bg-blue-500 rounded-md transform rotate-45 left-4 top-1"></div>
              </div>
            </motion.div>
            <span className="font-bold text-xl text-green-600">
              Growth Guardian
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="hover:text-green-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#simulations"
              className="hover:text-green-600 transition-colors"
            >
              Simulations
            </a>
            <a
              href="#pricing"
              className="hover:text-green-600 transition-colors"
            >
              Pricing
            </a>
            <a href="#about" className="hover:text-green-600 transition-colors">
              About
            </a>
          </div>
          <div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg mr-2 transition-colors">
              Login
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerChildren}
            className="flex flex-col md:flex-row items-center"
          >
            <div className="md:w-1/2 mb-12 md:mb-0">
              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              >
                Master Your{" "}
                <span className="text-green-500">Financial Future</span> With
                Growth Guardian
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg text-gray-600 mb-8"
              >
                Learn financial literacy, simulate investments, and grow your
                wealth with our all-in-one platform.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <button 
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg transition-all transform hover:scale-105"
    >
      Start Free Trial
    </button>
                <button className="border border-green-500 text-green-500 hover:bg-green-50 font-medium px-6 py-3 rounded-lg transition-all">
                  Watch Demo
                </button>
              </motion.div>
            </div>

            <div className="md:w-1/2 perspective-1000">
              <motion.div
                initial={{ rotateY: 15, rotateX: 15, scale: 0.9 }}
                animate={{ rotateY: 0, rotateX: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="h-4 w-32 bg-green-200 rounded-full mb-2"></div>
                    <div className="h-32 bg-blue-100 rounded-lg relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-green-500 to-green-200 opacity-70"></div>
                      <div className="absolute bottom-0 left-0 w-3/4 h-16 bg-blue-500 opacity-80"></div>
                      <div className="absolute bottom-0 left-0 w-1/2 h-12 bg-purple-500 opacity-80"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-12 bg-green-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-blue-50 rounded-lg border border-blue-100"></div>
                    <div className="h-16 bg-green-50 rounded-lg border border-green-100"></div>
                    <div className="h-16 bg-purple-50 rounded-lg border border-purple-100"></div>
                    <div className="h-16 bg-yellow-50 rounded-lg border border-yellow-100"></div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full opacity-30 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-40 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-lg"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Powerful <span className="text-green-500">Features</span> To
              Empower Your Finances
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Growth Guardian equips you with everything you need to understand,
              plan, and grow your financial future.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.356 1.115a1 1 0 00.175.239l3.5 3.5a1 1 0 001.414 0l3.5-3.5a1 1 0 00.175-.239l.356-1.115-2.328-.996a1 1 0 11.788-1.838l4 1.714a1 1 0 01.356.257l2.644-1.131a1 1 0 000-1.84l-7-3z" />
                  <path d="M4 11.794V16a1 1 0 001 1h10a1 1 0 001-1v-4.206l-2.018.306a6 6 0 01-7.292-2.047L4 11.794z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Financial Education
              </h3>
              <p className="text-gray-600">
                Interactive courses and tutorials to build your financial
                literacy from basics to advanced concepts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Investment Simulator
              </h3>
              <p className="text-gray-600">
                Test investment strategies in a risk-free environment before
                committing real money to the market.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Stock Predictions</h3>
              <p className="text-gray-600">
                AI-powered analysis tools to predict potential stock returns and
                market movements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Family Finance Manager
              </h3>
              <p className="text-gray-600">
                Tools to manage household budgets, track expenses, and plan for
                your family's financial goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Portfolio Tracker</h3>
              <p className="text-gray-600">
                Monitor your investments in real-time with customizable
                dashboards and performance metrics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-indigo-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Guides</h3>
              <p className="text-gray-600">
                In-depth guides written by financial experts to help you make
                informed decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simulation Preview Section */}
      <section id="simulations" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="flex flex-col md:flex-row items-center"
          >
            <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Test Before You <span className="text-green-500">Invest</span>
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-gray-600 mb-8"
              >
                Our advanced simulation platform lets you practice investing
                with virtual money. Test strategies, learn from mistakes, and
                gain confidence before putting real money on the line.
              </motion.p>
              <motion.ul variants={staggerChildren} className="space-y-4">
                <motion.li variants={fadeIn} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Realistic market conditions with historical data
                  </p>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Track performance with detailed analytics
                  </p>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Compare different investment strategies
                  </p>
                </motion.li>
                <motion.li variants={fadeIn} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">
                    AI recommendations based on your risk profile
                  </p>
                </motion.li>
              </motion.ul>
            </div>

            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gray-800 h-12 flex items-center px-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="ml-4 text-gray-300 text-sm">
                      Stock Simulator
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h4 className="text-lg font-semibold">
                          Portfolio Performance
                        </h4>
                        <p className="text-green-500 text-lg font-medium">
                          +12.4%
                        </p>
                      </div>
                      <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        Outperforming Market
                      </div>
                    </div>

                    <div className="h-48 bg-gray-50 rounded-lg mb-6 relative overflow-hidden">
                      {/* Simulated Chart */}
                      <div className="absolute bottom-0 left-0 w-full h-full">
                        <svg viewBox="0 0 100 40" className="w-full h-full">
                          <path
                            d="M0,35 L5,32 L10,33 L15,30 L20,28 L25,25 L30,28 L35,25 L40,20 L45,15 L50,18 L55,15 L60,10 L65,12 L70,8 L75,5 L80,8 L85,7 L90,5 L95,2 L100,0"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M0,35 L5,32 L10,33 L15,30 L20,28 L25,25 L30,28 L35,25 L40,20 L45,15 L50,18 L55,15 L60,10 L65,12 L70,8 L75,5 L80,8 L85,7 L90,5 L95,2 L100,0 L100,40 L0,40 Z"
                            fill="url(#gradientGreen)"
                            fillOpacity="0.2"
                          />
                          <defs>
                            <linearGradient
                              id="gradientGreen"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#10B981"
                                stopOpacity="0.7"
                              />
                              <stop
                                offset="100%"
                                stopColor="#10B981"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 text-sm">Total Value</p>
                        <p className="font-semibold">$15,420</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 text-sm">Invested</p>
                        <p className="font-semibold">$12,000</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 text-sm">Gain/Loss</p>
                        <p className="font-semibold text-green-500">+$3,420</p>
                      </div>
                    </div>

                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-colors">
                      Try Simulation
                    </button>
                  </div>
                </div>

                <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 bg-green-200 rounded-full blur-xl"></div>
                <div className="absolute -z-10 -bottom-10 -right-10 w-36 h-36 bg-blue-200 rounded-full blur-xl"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Choose Your <span className="text-green-500">Plan</span>
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Select the perfect subscription that fits your financial journey
              and goals.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {subscriptions.map((sub, index) => (
              <motion.div
                key={sub.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className={`relative rounded-2xl shadow-lg overflow-hidden border ${
                  sub.popular ? "border-purple-400" : "border-gray-100"
                }`}
              >
                {sub.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{sub.tier}</h3>
                  <div className="flex items-end mb-6">
                    <span className="text-3xl md:text-4xl font-bold">
                      {sub.price}
                    </span>
                    <span className="text-gray-500 ml-1">/{sub.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {sub.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-3 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full ${sub.color} ${sub.hover} text-white font-medium py-3 rounded-lg transition-all transform hover:scale-105`}
                  >
                    Choose {sub.tier}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Our <span className="text-green-500">Users</span> Say
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Join thousands who have transformed their financial future with
              Growth Guardian.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-gray-500 text-sm">Beginner Investor</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-600">
                "Before Growth Guardian, investing seemed overwhelming. Now I
                understand the basics and have started building my portfolio
                with confidence. The simulation feature was a game-changer for
                me."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">SS</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Smith</h4>
                  <p className="text-gray-500 text-sm">
                    Family Financial Planner
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-600">
                "The family finance management tools have been invaluable. We've
                paid off debt, started college funds for our kids, and are
                actually saving for retirement. Couldn't have done it without
                Growth Guardian."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">MT</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Thompson</h4>
                  <p className="text-gray-500 text-sm">Experienced Trader</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-600">
                "Even as an experienced trader, I've found the AI stock
                predictor incredibly useful. The accuracy is impressive, and
                it's helped me optimize my portfolio allocation. Worth every
                penny."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-500 to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Financial Journey Today
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of users who have transformed their financial
              future with Growth Guardian. Try it risk-free for 14 days.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105">
                Get Started Free
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-lg transition-all">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GrowthGuardianLanding;
