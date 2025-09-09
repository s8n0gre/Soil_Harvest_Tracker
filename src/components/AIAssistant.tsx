import React, { useState } from 'react';
import { Send, MessageCircle, Search, Globe, Mic, User, Bot } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your AI farming assistant. How can I help you today?',
      time: '10:00 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);

  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'hindi', name: 'Hindi', native: 'हिंदी' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'gujarati', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'punjabi', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' }
  ];

  const quickQuestions = [
    "What's the best time to plant rice?",
    "How to identify cotton bollworm?",
    "Current weather conditions for farming",
    "Fertilizer recommendations for wheat",
    "Market prices for crops this week"
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        {
          rice: "Rice is best planted during the monsoon season (June-July). Ensure your fields are properly leveled and have good drainage. The optimal soil temperature should be 20-35°C for good germination.",
          cotton: "Cotton bollworm can be identified by: 1) Small holes in cotton bolls, 2) Brown/pink caterpillars inside, 3) Frass (insect waste) around bolls. Treatment: Use Bt cotton varieties and apply biological pesticides like Bacillus thuringiensis.",
          weather: "Current weather in your area shows: Temperature 28°C, Humidity 65%, Good conditions for most crops. Light rain expected in 2 days - perfect for recently planted seeds.",
          fertilizer: "For wheat cultivation: 1) Basal dose: 60kg DAP + 20kg MOP per acre, 2) First topdressing: 30kg Urea at 20-25 days, 3) Second topdressing: 30kg Urea at 40-45 days after sowing.",
          market: "Today's market prices in your area: Rice ₹2,850/quintal (+2.5%), Wheat ₹2,150/quintal (+1.8%), Cotton ₹6,200/quintal (-2.4%). Prices updated 2 hours ago from APMC Pune."
        }
      ];

      // Simple keyword matching for demo
      let response = "I understand your question about farming. Based on your location and current conditions, I'd recommend consulting with local agricultural experts for the most specific advice. You can also check our other sections for detailed crop information, soil analysis, and market prices.";
      
      const input = inputMessage.toLowerCase();
      if (input.includes('rice') || input.includes('plant')) response = botResponses[0].rice;
      if (input.includes('cotton') || input.includes('bollworm') || input.includes('pest')) response = botResponses[0].cotton;
      if (input.includes('weather') || input.includes('climate')) response = botResponses[0].weather;
      if (input.includes('fertilizer') || input.includes('wheat') || input.includes('nutrition')) response = botResponses[0].fertilizer;
      if (input.includes('price') || input.includes('market') || input.includes('cost')) response = botResponses[0].market;

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    sendMessage();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Farming Assistant</h2>
                <p className="text-green-100">Ask me anything about farming and agriculture</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Globe className="w-5 h-5 text-green-100" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-gray-800">
                    {lang.native}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-green-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  <p className="text-sm">{message.message}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{message.time}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me about farming, crops, diseases, weather..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
          Quick Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-left p-3 bg-gray-50 hover:bg-green-50 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{question}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Features Available</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-blue-700 mb-2">Crop Guidance</h4>
            <p className="text-sm text-gray-600">Get advice on planting, growing, and harvesting crops</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-green-700 mb-2">Disease Detection</h4>
            <p className="text-sm text-gray-600">Identify plant diseases and get treatment recommendations</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-purple-700 mb-2">Market Insights</h4>
            <p className="text-sm text-gray-600">Real-time prices and market trend analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
}