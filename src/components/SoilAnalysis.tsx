import React, { useState } from 'react';
import { Droplets, Thermometer, Zap, Leaf, Clock, MapPin } from 'lucide-react';

export default function SoilAnalysis() {
  const [selectedSoilType, setSelectedSoilType] = useState('loamy');

  const soilTypes = [
    {
      id: 'loamy',
      name: 'Loamy Soil',
      description: 'Best for most crops, well-drained with good nutrient retention',
      moisture: '65%',
      ph: '6.5',
      temperature: '24°C',
      suitableCrops: [
        { name: 'Rice', duration: '120 days', season: 'Kharif' },
        { name: 'Wheat', duration: '150 days', season: 'Rabi' },
        { name: 'Cotton', duration: '180 days', season: 'Kharif' },
        { name: 'Sugarcane', duration: '365 days', season: 'Annual' }
      ]
    },
    {
      id: 'clay',
      name: 'Clay Soil',
      description: 'High water retention, suitable for rice and wheat',
      moisture: '78%',
      ph: '7.2',
      temperature: '22°C',
      suitableCrops: [
        { name: 'Rice', duration: '120 days', season: 'Kharif' },
        { name: 'Wheat', duration: '150 days', season: 'Rabi' },
        { name: 'Barley', duration: '120 days', season: 'Rabi' }
      ]
    },
    {
      id: 'sandy',
      name: 'Sandy Soil',
      description: 'Well-drained, good for root vegetables and groundnuts',
      moisture: '45%',
      ph: '6.8',
      temperature: '26°C',
      suitableCrops: [
        { name: 'Groundnut', duration: '120 days', season: 'Kharif' },
        { name: 'Potato', duration: '90 days', season: 'Rabi' },
        { name: 'Carrot', duration: '75 days', season: 'Winter' }
      ]
    },
    {
      id: 'black',
      name: 'Black Soil',
      description: 'Cotton soil, high in clay content, retains moisture well',
      moisture: '72%',
      ph: '7.5',
      temperature: '25°C',
      suitableCrops: [
        { name: 'Cotton', duration: '180 days', season: 'Kharif' },
        { name: 'Sorghum', duration: '120 days', season: 'Kharif' },
        { name: 'Sunflower', duration: '100 days', season: 'Rabi' }
      ]
    }
  ];

  const selectedSoil = soilTypes.find(soil => soil.id === selectedSoilType);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Soil Analysis</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Pune, Maharashtra</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {soilTypes.map((soil) => (
            <button
              key={soil.id}
              onClick={() => setSelectedSoilType(soil.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedSoilType === soil.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <h3 className="font-medium text-gray-800">{soil.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{soil.description}</p>
            </button>
          ))}
        </div>

        {selectedSoil && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{selectedSoil.moisture}</span>
                </div>
                <h3 className="font-semibold text-gray-800">Soil Moisture</h3>
                <p className="text-sm text-gray-600">Current moisture level</p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-green-600">{selectedSoil.ph}</span>
                </div>
                <h3 className="font-semibold text-gray-800">pH Level</h3>
                <p className="text-sm text-gray-600">Soil acidity/alkalinity</p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Thermometer className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{selectedSoil.temperature}</span>
                </div>
                <h3 className="font-semibold text-gray-800">Soil Temperature</h3>
                <p className="text-sm text-gray-600">Current soil temp</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Leaf className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Recommended Crops for {selectedSoil.name}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSoil.suitableCrops.map((crop, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{crop.name}</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {crop.season}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{crop.duration}</span>
                    </div>
                    <div className="mt-3">
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded inline-block">
                        Highly Suitable
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Soil Care Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">For Better Yield:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Add organic compost every 3 months</li>
                    <li>• Maintain moisture level between 60-70%</li>
                    <li>• Test pH levels monthly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Seasonal Care:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pre-monsoon: Deep plowing</li>
                    <li>• Post-harvest: Crop rotation</li>
                    <li>• Winter: Mulching for warmth</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}