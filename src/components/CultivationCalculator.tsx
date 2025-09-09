import React, { useState } from 'react';
import { Calculator, MapPin, DollarSign, Package, TrendingUp } from 'lucide-react';

export default function CultivationCalculator() {
  const [acres, setAcres] = useState<number>(1);
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const crops = {
    rice: {
      name: 'Rice',
      seedsPerAcre: 40, // kg
      seedPricePerKg: 180,
      fertilizer: { type: 'NPK + Urea', quantity: 150, pricePerKg: 25 },
      pesticide: { quantity: 2, pricePerLiter: 450 },
      expectedYield: 2500, // kg per acre
      marketPrice: 2850, // per quintal
      duration: '120 days'
    },
    wheat: {
      name: 'Wheat',
      seedsPerAcre: 50, // kg
      seedPricePerKg: 45,
      fertilizer: { type: 'DAP + Urea', quantity: 120, pricePerKg: 28 },
      pesticide: { quantity: 1.5, pricePerLiter: 380 },
      expectedYield: 2000, // kg per acre
      marketPrice: 2150, // per quintal
      duration: '150 days'
    },
    cotton: {
      name: 'Cotton',
      seedsPerAcre: 1.5, // kg
      seedPricePerKg: 850,
      fertilizer: { type: 'NPK Complex', quantity: 200, pricePerKg: 35 },
      pesticide: { quantity: 3, pricePerLiter: 600 },
      expectedYield: 400, // kg per acre
      marketPrice: 6200, // per quintal
      duration: '180 days'
    },
    sugarcane: {
      name: 'Sugarcane',
      seedsPerAcre: 4000, // kg (setts)
      seedPricePerKg: 2,
      fertilizer: { type: 'NPK + Micronutrients', quantity: 300, pricePerKg: 32 },
      pesticide: { quantity: 4, pricePerLiter: 520 },
      expectedYield: 40000, // kg per acre
      marketPrice: 350, // per quintal
      duration: '365 days'
    }
  };

  const calculateCost = () => {
    const crop = crops[selectedCrop as keyof typeof crops];
    
    // Seed cost
    const seedCost = crop.seedsPerAcre * crop.seedPricePerKg * acres;
    
    // Fertilizer cost
    const fertilizerCost = crop.fertilizer.quantity * crop.fertilizer.pricePerKg * acres;
    
    // Pesticide cost
    const pesticideCost = crop.pesticide.quantity * crop.pesticide.pricePerLiter * acres;
    
    // Labor cost (estimate)
    const laborCost = acres * 15000; // ₹15,000 per acre
    
    // Other costs (irrigation, equipment, etc.)
    const otherCosts = acres * 8000; // ₹8,000 per acre
    
    const totalCost = seedCost + fertilizerCost + pesticideCost + laborCost + otherCosts;
    
    // Expected revenue
    const totalYield = crop.expectedYield * acres;
    const totalRevenue = (totalYield / 100) * crop.marketPrice; // Convert kg to quintal
    
    // Profit calculation
    const expectedProfit = totalRevenue - totalCost;
    const profitPerAcre = expectedProfit / acres;
    const profitMargin = ((expectedProfit / totalRevenue) * 100);

    setCalculationResult({
      crop,
      costs: {
        seed: seedCost,
        fertilizer: fertilizerCost,
        pesticide: pesticideCost,
        labor: laborCost,
        other: otherCosts,
        total: totalCost
      },
      revenue: {
        yieldKg: totalYield,
        totalRevenue,
        pricePerQuintal: crop.marketPrice
      },
      profit: {
        total: expectedProfit,
        perAcre: profitPerAcre,
        margin: profitMargin
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Calculator className="w-6 h-6 mr-2 text-green-600" />
          Cultivation Calculator
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Input Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area to Cultivate (Acres)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={acres}
                    onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter acres"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Crop
                  </label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {Object.entries(crops).map(([key, crop]) => (
                      <option key={key} value={key}>
                        {crop.name} ({crop.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={calculateCost}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Costs & Profits</span>
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Crop Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Seeds Required:</span>
                  <span className="font-medium">
                    {(crops[selectedCrop as keyof typeof crops].seedsPerAcre * acres).toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Duration:</span>
                  <span className="font-medium">
                    {crops[selectedCrop as keyof typeof crops].duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Yield:</span>
                  <span className="font-medium">
                    {(crops[selectedCrop as keyof typeof crops].expectedYield * acres / 100).toFixed(1)} quintals
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {calculationResult && (
              <>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-red-500" />
                    Cost Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Seed Cost:</span>
                      <span className="font-semibold">₹{calculationResult.costs.seed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Fertilizer Cost:</span>
                      <span className="font-semibold">₹{calculationResult.costs.fertilizer.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pesticide Cost:</span>
                      <span className="font-semibold">₹{calculationResult.costs.pesticide.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Labor Cost:</span>
                      <span className="font-semibold">₹{calculationResult.costs.labor.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Other Costs:</span>
                      <span className="font-semibold">₹{calculationResult.costs.other.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total Cost:</span>
                      <span className="text-xl font-bold text-red-600">₹{calculationResult.costs.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-blue-500" />
                    Expected Revenue
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Yield:</span>
                      <span className="font-semibold">{(calculationResult.revenue.yieldKg / 100).toFixed(1)} quintals</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Market Price:</span>
                      <span className="font-semibold">₹{calculationResult.revenue.pricePerQuintal}/quintal</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total Revenue:</span>
                      <span className="text-xl font-bold text-green-600">₹{calculationResult.revenue.totalRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className={`border-2 rounded-xl p-6 ${
                  calculationResult.profit.total > 0 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className={`w-5 h-5 mr-2 ${
                      calculationResult.profit.total > 0 ? 'text-green-500' : 'text-red-500'
                    }`} />
                    Profit Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Profit:</span>
                      <span className={`text-xl font-bold ${
                        calculationResult.profit.total > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ₹{calculationResult.profit.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profit per Acre:</span>
                      <span className={`font-semibold ${
                        calculationResult.profit.perAcre > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ₹{calculationResult.profit.perAcre.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profit Margin:</span>
                      <span className={`font-semibold ${
                        calculationResult.profit.margin > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {calculationResult.profit.margin.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="font-medium text-yellow-800 mb-2">⚠️ Important Notes</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Calculations are based on current market prices</li>
                    <li>• Actual yields may vary based on weather and farming practices</li>
                    <li>• Prices are subject to market fluctuations</li>
                    <li>• Consider crop insurance for risk management</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}