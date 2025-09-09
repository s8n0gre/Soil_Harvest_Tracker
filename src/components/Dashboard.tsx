import React, { useState } from 'react';
import { Thermometer, Droplets, Sun, Cloud, TrendingUp, Calculator, Camera, Search, Globe } from 'lucide-react';
import SoilAnalysis from './SoilAnalysis';
import MarketAnalysis from './MarketAnalysis';
import PlantDetection from './PlantDetection';
import CultivationCalculator from './CultivationCalculator';
import AIAssistant from './AIAssistant';
import IndiaMap from './IndiaMap';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sun },
    { id: 'map', label: 'India Map', icon: Globe },
    { id: 'soil', label: 'Soil Analysis', icon: Droplets },
    { id: 'market', label: 'Market Price', icon: TrendingUp },
    { id: 'detection', label: 'Plant Health', icon: Camera },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'assistant', label: 'AI Assistant', icon: Search }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return <IndiaMap />;
      case 'soil':
        return <SoilAnalysis />;
      case 'market':
        return <MarketAnalysis />;
      case 'detection':
        return <PlantDetection />;
      case 'calculator':
        return <CultivationCalculator />;
      case 'assistant':
        return <AIAssistant />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-green-800">Endless Harvesting</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Pune, Maharashtra</span>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
}

function OverviewContent() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome to Smart Farming</h2>
        <p className="text-green-100 text-lg">Your digital farming companion for better harvests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">28°C</span>
          </div>
          <h3 className="font-semibold text-gray-800">Temperature</h3>
          <p className="text-sm text-gray-600">Current weather</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-cyan-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">65%</span>
          </div>
          <h3 className="font-semibold text-gray-800">Soil Moisture</h3>
          <p className="text-sm text-gray-600">Optimal level</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">8h</span>
          </div>
          <h3 className="font-semibold text-gray-800">Sunlight</h3>
          <p className="text-sm text-gray-600">Daily exposure</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Cloud className="w-6 h-6 text-gray-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">45%</span>
          </div>
          <h3 className="font-semibold text-gray-800">Humidity</h3>
          <p className="text-sm text-gray-600">Current level</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Crops</h3>
          <div className="space-y-4">
            {[
              { name: 'Rice', season: 'Kharif', duration: '120 days' },
              { name: 'Wheat', season: 'Rabi', duration: '150 days' },
              { name: 'Sugarcane', season: 'Annual', duration: '365 days' }
            ].map((crop, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{crop.name}</h4>
                  <p className="text-sm text-gray-600">{crop.season} Season</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{crop.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Market Prices</h3>
          <div className="space-y-4">
            {[
              { crop: 'Rice', price: '₹2,850/quintal', change: '+2.5%' },
              { crop: 'Wheat', price: '₹2,150/quintal', change: '+1.8%' },
              { crop: 'Sugarcane', price: '₹350/quintal', change: '+0.5%' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{item.crop}</h4>
                  <p className="text-lg font-semibold text-gray-900">{item.price}</p>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-medium">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}