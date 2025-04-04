import { useState, useEffect } from "react";

function RetirementPlanner() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflationRate, setInflationRate] = useState(6);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(50000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const [results, setResults] = useState({
    yearsToRetirement: 0,
    projectedSavings: 0,
    monthlyIncomeFromSavings: 0,
    savingsGap: 0,
    additionalSavingsNeeded: 0,
  });

  const calculateRetirement = () => {
    if (retirementAge <= currentAge) {
      alert("Retirement age must be greater than current age");
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const yearsToRetirement = retirementAge - currentAge;
      const realReturnRate =
        (1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1;
      const monthlyRate = Math.pow(1 + realReturnRate, 1 / 12) - 1;

      const futureValueCurrentSavings =
        currentSavings * Math.pow(1 + realReturnRate, yearsToRetirement);
      const months = yearsToRetirement * 12;
      const futureValueContributions =
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

      const projectedSavings =
        futureValueCurrentSavings + futureValueContributions;
      const annualWithdrawal = projectedSavings * (withdrawalRate / 100);
      const monthlyIncomeFromSavings = annualWithdrawal / 12;

      const requiredSavings =
        (desiredMonthlyIncome * 12) / (withdrawalRate / 100);
      const savingsGap = Math.max(0, requiredSavings - projectedSavings);

      let additionalSavingsNeeded = 0;
      if (savingsGap > 0 && months > 0) {
        const pmt =
          savingsGap /
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) /
          (1 + monthlyRate);
        additionalSavingsNeeded = pmt;
      }

      setResults({
        yearsToRetirement,
        projectedSavings: Math.round(projectedSavings),
        monthlyIncomeFromSavings: Math.round(monthlyIncomeFromSavings),
        savingsGap: Math.round(savingsGap),
        additionalSavingsNeeded: Math.round(additionalSavingsNeeded),
      });

      setIsCalculating(false);
      setIsModalOpen(true);
    }, 1000);
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-2xl shadow-2xl z-10 max-w-4xl w-full mx-4 max-h-full overflow-y-auto relative border-t-4 border-blue-600">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-semibold text-blue-900 tracking-tight">
            Retirement Planning Calculator
          </h1>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Your Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Current Age
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="18"
                    max="80"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    years
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Retirement Age
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="45"
                    max="90"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    years
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Current Savings
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={monthlyContribution}
                    onChange={(e) =>
                      setMonthlyContribution(Number(e.target.value))
                    }
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Financial Assumptions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Annual Return
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="15"
                      step="0.1"
                      value={expectedReturn}
                      onChange={(e) =>
                        setExpectedReturn(Number(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      %
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Inflation Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="15"
                      step="0.1"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      %
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Desired Monthly Income in Retirement
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={desiredMonthlyIncome}
                      onChange={(e) =>
                        setDesiredMonthlyIncome(Number(e.target.value))
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Annual Withdrawal Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={withdrawalRate}
                      onChange={(e) =>
                        setWithdrawalRate(Number(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={calculateRetirement}
                disabled={isCalculating}
                className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center
                  ${
                    isCalculating
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:bg-blue-700 hover:shadow-lg"
                  }`}
              >
                {isCalculating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Calculating...
                  </>
                ) : (
                  "Calculate Retirement Plan"
                )}
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Retirement Plan Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Years until retirement</p>
                <p className="text-2xl font-bold text-blue-900">
                  {results.yearsToRetirement} years
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Projected savings at retirement
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{results.projectedSavings.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Monthly income from savings
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{results.monthlyIncomeFromSavings.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Savings gap</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{results.savingsGap.toLocaleString()}
                </p>
              </div>
            </div>

            {results.savingsGap > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium">
                  To meet your desired income of ₹
                  {desiredMonthlyIncome.toLocaleString()}, you'll need an
                  additional monthly contribution of:
                </p>
                <p className="text-2xl font-bold text-yellow-900 mt-2">
                  ₹{results.additionalSavingsNeeded.toLocaleString()}
                </p>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-600">
              <p>
                *These calculations are estimates based on your inputs and
                assumptions.
              </p>
              <p>
                *Actual results may vary due to market conditions and other
                factors.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default RetirementPlanner;
