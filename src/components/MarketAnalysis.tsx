import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, MapPin, Package, Leaf } from 'lucide-react';

export default function MarketAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState('crops');

  const categories = [
    { id: 'crops', label: 'Crops', icon: Leaf },
    { id: 'seeds', label: 'Seeds', icon: Package }
  ];

  const cropPrices = [
    {
      name: 'Rice',
      currentPrice: 2850,
      previousPrice: 2780,
      unit: 'quintal',
      change: 2.5,
      market: 'APMC Pune',
      lastUpdated: '2 hours ago'
    },
    {
      name: 'Wheat',
      currentPrice: 2150,
      previousPrice: 2115,
      unit: 'quintal',
      change: 1.7,
      market: 'APMC Pune',
      lastUpdated: '1 hour ago'
    },
    {
      name: 'Cotton',
      currentPrice: 6200,
      previousPrice: 6350,
      unit: 'quintal',
      change: -2.4,
      market: 'APMC Pune',
      lastUpdated: '3 hours ago'
    },
    {
      name: 'Sugarcane',
      currentPrice: 350,
      previousPrice: 348,
      unit: 'quintal',
      change: 0.6,
      market: 'APMC Pune',
      lastUpdated: '4 hours ago'
    },
    {
      name: 'Soybean',
      currentPrice: 4850,
      previousPrice: 4920,
      unit: 'quintal',
      change: -1.4,
      market: 'APMC Pune',
      lastUpdated: '2 hours ago'
    },
    {
      name: 'Maize',
      currentPrice: 1950,
      previousPrice: 1920,
      unit: 'quintal',
      change: 1.6,
      market: 'APMC Pune',
      lastUpdated: '1 hour ago'
    }
  ];

  const seedPrices = [
    {
      name: 'Rice Seeds (Basmati)',
      pricePerKg: 180,
      pricePer100g: 20,
      quality: 'Premium',
      variety: 'Pusa Basmati 1121',
      lastUpdated: '1 hour ago'
    },
    {
      name: 'Wheat Seeds (HD-2967)',
      pricePerKg: 45,
      pricePer100g: 5,
      quality: 'Certified',
      variety: 'High Yielding',
      lastUpdated: '2 hours ago'
    },
    {
      name: 'Cotton Seeds (Bt Cotton)',
      pricePerKg: 850,
      pricePer100g: 90,
      quality: 'Hybrid',
      variety: 'Bollgard II',
      lastUpdated: '3 hours ago'
    },
    {
      name: 'Tomato Seeds (Hybrid)',
      pricePerKg: 12000,
      pricePer100g: 1300,
      quality: 'F1 Hybrid',
      variety: 'Disease Resistant',
      lastUpdated: '1 hour ago'
    },
    {
      name: 'Onion Seeds (Red)',
      pricePerKg: 2500,
      pricePer100g: 270,
      quality: 'Premium',
      variety: 'Long Storage',
      lastUpdated: '4 hours ago'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Market Analysis</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {selectedCategory === 'crops' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cropPrices.map((crop, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{crop.name}</h3>
                    <div className={`flex items-center space-x-1 ${
                      crop.change > 0 ? 'text-green-600' : crop.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {crop.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : crop.change < 0 ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <DollarSign className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {crop.change > 0 ? '+' : ''}{crop.change}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Current Price</span>
                        <span className="text-xl font-bold text-gray-900">
                          ₹{crop.currentPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">per {crop.unit}</div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Previous Price</span>
                      <span className="text-gray-700">₹{crop.previousPrice.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{crop.market}</span>
                      </div>
                      <span className="text-gray-500">{crop.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seedPrices.map((seed, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{seed.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {seed.quality}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {seed.variety}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price per Kg</span>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{seed.pricePerKg.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price per 100g</span>
                      <span className="text-lg font-semibold text-gray-700">
                        ₹{seed.pricePer100g}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500 text-right">
                      Updated: {seed.lastUpdated}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Buy Seeds
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Trends & Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-green-700 mb-2">Rising Prices</h4>
            <p className="text-sm text-gray-600">Rice and Wheat showing upward trend due to good demand</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-blue-700 mb-2">Seasonal Effect</h4>
            <p className="text-sm text-gray-600">Post-harvest prices stabilizing across major crops</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-purple-700 mb-2">Seed Demand</h4>
            <p className="text-sm text-gray-600">High-quality hybrid seeds in high demand for next season</p>
          </div>
        </div>
      </div>
    </div>
  );
}