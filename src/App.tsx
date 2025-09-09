import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <AuthScreen onLogin={handleLogin} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;