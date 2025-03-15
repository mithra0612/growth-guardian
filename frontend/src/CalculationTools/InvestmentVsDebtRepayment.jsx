import { useState } from 'react';

function InvestmentVsDebtRepayment() {
  const [formData, setFormData] = useState({
    principal: '',
    interestRate: '',
    tenure: '',
    type: 'investment',
    frequency: 'yearly',
    additional: '',
  });
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateResults = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    const principal = parseFloat(formData.principal);
    const rate = parseFloat(formData.interestRate) / 100;
    const time = parseFloat(formData.tenure);
    const additional = parseFloat(formData.additional) || 0;
    const freqMap = { yearly: 1, quarterly: 4, monthly: 12 };
    const n = freqMap[formData.frequency];

    if (!principal || !rate || !time || isNaN(principal) || isNaN(rate) || isNaN(time)) {
      alert('Please fill all required fields with valid numbers');
      setIsCalculating(false);
      return;
    }

    // Reduced delay to 500ms for better UX while still showing loading state
    setTimeout(() => {
      let calculation;
      if (formData.type === 'investment') {
        const periods = time * n;
        const periodRate = rate / n;
        let futureValue = principal * Math.pow(1 + periodRate, periods);
        
        if (additional > 0) {
          const monthlyFactor = n === 12 ? 1 : n === 4 ? 3 : 12;
          for (let i = 1; i <= periods; i++) {
            futureValue += additional * monthlyFactor * Math.pow(1 + periodRate, periods - i);
          }
        }

        const interest = futureValue - principal - (additional * periods * (n === 12 ? 1 : n === 4 ? 3 : 12));
        calculation = {
          principal: principal.toFixed(2),
          total: futureValue.toFixed(2),
          interest: interest.toFixed(2),
          monthlyReturn: time > 0 ? (futureValue / (time * 12)).toFixed(2) : '0.00',
          roi: ((futureValue - principal) / principal * 100).toFixed(2)
        };
      } else {
        const monthlyRate = rate / 12;
        const months = time * 12;
        const baseEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                       (Math.pow(1 + monthlyRate, months) - 1);
        const emi = baseEmi + additional;
        const totalPayable = emi * months;
        const interest = totalPayable - principal;

        calculation = {
          principal: principal.toFixed(2),
          emi: emi.toFixed(2),
          total: totalPayable.toFixed(2),
          interest: interest.toFixed(2),
          interestPercentage: (interest / principal * 100).toFixed(2)
        };
      }

      setResult(calculation);
      setShowModal(true);
      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
        <h1 className="text-4xl font-extrabold text-primary-blue text-center mb-8 bg-gradient-to-r from-primary-blue to-blue-hover text-transparent bg-clip-text">
          Financial Analyzer (₹)
        </h1>

        <form onSubmit={calculateResults} className="space-y-6">
          {/* Form fields remain the same */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-primary-blue font-semibold mb-2">Principal Amount (₹)*</label>
              <input
                type="number"
                name="principal"
                value={formData.principal}
                onChange={handleInputChange}
                placeholder="Enter amount"
                min="0"
                step="1000"
                required
                className="w-full p-3 bg-blue-50 border-2 border-light-blue rounded-lg focus:outline-none focus:border-blue-hover focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            {/* ... other form fields ... */}
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className={`w-full p-4 bg-gradient-to-r from-primary-blue to-blue-hover text-white rounded-lg font-semibold text-lg transition-all ${
              isCalculating ? 'opacity-70 cursor-not-allowed animate-pulse' : 'hover:shadow-lg'
            }`}
          >
            {isCalculating ? 'Calculating...' : 'Calculate'}
          </button>
        </form>

        {showModal && result && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl max-w-md w-full shadow-2xl">
              {/* Modal content remains the same */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestmentVsDebtRepayment;