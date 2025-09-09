import React, { useState } from 'react';
import { MapPin, TrendingUp, BarChart3, PieChart, Info, Thermometer, Droplets, Leaf } from 'lucide-react';

export default function IndiaMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'harvest' | 'soil' | 'weather'>('harvest');

  const stateData = {
    'Maharashtra': {
      name: 'Maharashtra',
      majorCrops: ['Rice', 'Cotton', 'Sugarcane', 'Soybean'],
      soilTypes: ['Black Cotton Soil', 'Red Soil', 'Alluvial Soil'],
      harvestSeason: 'Kharif & Rabi',
      productivity: 85,
      temperature: '25-35°C',
      rainfall: '600-1200mm',
      coordinates: { x: 320, y: 280 }
    },
    'Punjab': {
      name: 'Punjab',
      majorCrops: ['Wheat', 'Rice', 'Cotton', 'Maize'],
      soilTypes: ['Alluvial Soil', 'Sandy Loam'],
      harvestSeason: 'Rabi & Kharif',
      productivity: 95,
      temperature: '20-40°C',
      rainfall: '300-600mm',
      coordinates: { x: 280, y: 120 }
    },
    'Uttar Pradesh': {
      name: 'Uttar Pradesh',
      majorCrops: ['Wheat', 'Rice', 'Sugarcane', 'Potato'],
      soilTypes: ['Alluvial Soil', 'Black Soil'],
      harvestSeason: 'Rabi & Kharif',
      productivity: 80,
      temperature: '22-38°C',
      rainfall: '600-1000mm',
      coordinates: { x: 350, y: 180 }
    },
    'Karnataka': {
      name: 'Karnataka',
      majorCrops: ['Rice', 'Cotton', 'Sugarcane', 'Coffee'],
      soilTypes: ['Red Soil', 'Black Soil', 'Laterite Soil'],
      harvestSeason: 'Kharif & Rabi',
      productivity: 78,
      temperature: '20-30°C',
      rainfall: '500-1500mm',
      coordinates: { x: 290, y: 380 }
    },
    'Haryana': {
      name: 'Haryana',
      majorCrops: ['Wheat', 'Rice', 'Cotton', 'Mustard'],
      soilTypes: ['Alluvial Soil', 'Sandy Soil'],
      harvestSeason: 'Rabi & Kharif',
      productivity: 90,
      temperature: '18-42°C',
      rainfall: '300-800mm',
      coordinates: { x: 290, y: 140 }
    },
    'Andhra Pradesh': {
      name: 'Andhra Pradesh',
      majorCrops: ['Rice', 'Cotton', 'Groundnut', 'Chili'],
      soilTypes: ['Black Soil', 'Red Soil', 'Alluvial Soil'],
      harvestSeason: 'Kharif & Rabi',
      productivity: 82,
      temperature: '25-40°C',
      rainfall: '600-1200mm',
      coordinates: { x: 350, y: 380 }
    }
  };

  const cropProductionData = [
    { crop: 'Rice', production: 118.4, color: '#10B981' },
    { crop: 'Wheat', production: 109.6, color: '#F59E0B' },
    { crop: 'Cotton', production: 36.5, color: '#EF4444' },
    { crop: 'Sugarcane', production: 405.4, color: '#8B5CF6' },
    { crop: 'Soybean', production: 13.8, color: '#06B6D4' }
  ];

  const soilDistribution = [
    { type: 'Alluvial Soil', percentage: 35, color: '#10B981' },
    { type: 'Black Cotton Soil', percentage: 25, color: '#374151' },
    { type: 'Red Soil', percentage: 20, color: '#EF4444' },
    { type: 'Laterite Soil', percentage: 12, color: '#F59E0B' },
    { type: 'Desert Soil', percentage: 8, color: '#D97706' }
  ];

  const monthlyHarvest = [
    { month: 'Jan', harvest: 45 },
    { month: 'Feb', harvest: 52 },
    { month: 'Mar', harvest: 68 },
    { month: 'Apr', harvest: 75 },
    { month: 'May', harvest: 42 },
    { month: 'Jun', harvest: 35 },
    { month: 'Jul', harvest: 28 },
    { month: 'Aug', harvest: 38 },
    { month: 'Sep', harvest: 55 },
    { month: 'Oct', harvest: 82 },
    { month: 'Nov', harvest: 95 },
    { month: 'Dec', harvest: 78 }
  ];

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 90) return '#10B981';
    if (productivity >= 80) return '#F59E0B';
    if (productivity >= 70) return '#EF4444';
    return '#6B7280';
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">India Agricultural Map</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveView('harvest')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'harvest'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Harvest Data
            </button>
            <button
              onClick={() => setActiveView('soil')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'soil'
                  ? 'bg-brown-100 text-brown-700 border border-brown-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Soil Quality
            </button>
            <button
              onClick={() => setActiveView('weather')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'weather'
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Weather
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* India Map */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Interactive India Map</h3>
            <div className="relative">
              <svg
                viewBox="0 0 500 450"
                className="w-full h-80 border border-gray-200 rounded-lg bg-white"
              >
                {/* Simplified India Map Outline */}
                <path
                  d="M150 100 L200 80 L250 90 L300 85 L350 95 L400 110 L420 150 L410 200 L390 250 L380 300 L370 350 L350 380 L320 400 L280 410 L240 400 L200 390 L170 370 L150 340 L140 300 L135 250 L140 200 L145 150 Z"
                  fill="#f3f4f6"
                  stroke="#d1d5db"
                  strokeWidth="2"
                />
                
                {/* State Markers */}
                {Object.entries(stateData).map(([stateKey, state]) => (
                  <g key={stateKey}>
                    <circle
                      cx={state.coordinates.x}
                      cy={state.coordinates.y}
                      r="8"
                      fill={getProductivityColor(state.productivity)}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-10 transition-all"
                      onClick={() => setSelectedState(stateKey)}
                    />
                    <text
                      x={state.coordinates.x}
                      y={state.coordinates.y - 15}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      {state.name}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>High Productivity (90%+)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Medium (80-89%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Low (70-79%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* State Details */}
          <div className="space-y-6">
            {selectedState ? (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  {stateData[selectedState as keyof typeof stateData].name}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Major Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {stateData[selectedState as keyof typeof stateData].majorCrops.map((crop, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Soil Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {stateData[selectedState as keyof typeof stateData].soilTypes.map((soil, index) => (
                        <span key={index} className="bg-brown-100 text-brown-800 px-3 py-1 rounded-full text-sm">
                          {soil}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <Thermometer className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-sm font-medium text-gray-700">Temperature</span>
                      </div>
                      <span className="text-lg font-semibold text-blue-600">
                        {stateData[selectedState as keyof typeof stateData].temperature}
                      </span>
                    </div>

                    <div className="bg-cyan-50 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <Droplets className="w-4 h-4 text-cyan-600 mr-1" />
                        <span className="text-sm font-medium text-gray-700">Rainfall</span>
                      </div>
                      <span className="text-lg font-semibold text-cyan-600">
                        {stateData[selectedState as keyof typeof stateData].rainfall}
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Productivity Index</span>
                      <span className="text-2xl font-bold text-green-600">
                        {stateData[selectedState as keyof typeof stateData].productivity}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${stateData[selectedState as keyof typeof stateData].productivity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Select a State</h3>
                <p className="text-gray-500">Click on any state marker on the map to view detailed agricultural information</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crop Production Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Crop Production (Million Tonnes)
          </h3>
          <div className="space-y-4">
            {cropProductionData.map((crop, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{crop.crop}</span>
                  <span className="text-sm font-semibold text-gray-900">{crop.production}MT</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${(crop.production / Math.max(...cropProductionData.map(c => c.production))) * 100}%`,
                      backgroundColor: crop.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soil Distribution Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-green-600" />
            Soil Type Distribution
          </h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                {soilDistribution.reduce((acc, soil, index) => {
                  const startAngle = acc.currentAngle;
                  const angle = (soil.percentage / 100) * 360;
                  const endAngle = startAngle + angle;
                  
                  const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M 100 100`,
                    `L ${x1} ${y1}`,
                    `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');

                  acc.paths.push(
                    <path
                      key={index}
                      d={pathData}
                      fill={soil.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                  
                  acc.currentAngle = endAngle;
                  return acc;
                }, { paths: [] as JSX.Element[], currentAngle: 0 }).paths}
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            {soilDistribution.map((soil, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: soil.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{soil.type}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{soil.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Harvest Trends */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
          Monthly Harvest Trends (Million Tonnes)
        </h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {monthlyHarvest.map((month, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg transition-all duration-700 hover:from-purple-600 hover:to-purple-400"
                style={{ height: `${(month.harvest / Math.max(...monthlyHarvest.map(m => m.harvest))) * 200}px` }}
              ></div>
              <span className="text-xs font-medium text-gray-600 mt-2">{month.month}</span>
              <span className="text-xs text-gray-500">{month.harvest}MT</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-600" />
          Key Agricultural Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-green-700 mb-2">🌾 Top Producing States</h4>
            <p className="text-sm text-gray-600">Punjab, Haryana, and Maharashtra lead in agricultural productivity with advanced farming techniques</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-blue-700 mb-2">🌱 Soil Health</h4>
            <p className="text-sm text-gray-600">35% of India's agricultural land has alluvial soil, ideal for rice and wheat cultivation</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-purple-700 mb-2">📈 Seasonal Patterns</h4>
            <p className="text-sm text-gray-600">Peak harvest months are November-December for Kharif crops and March-April for Rabi crops</p>
          </div>
        </div>
      </div>
    </div>
  );
}