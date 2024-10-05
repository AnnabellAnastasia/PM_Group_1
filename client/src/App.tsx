import React, { useState } from 'react';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import './App.css';

function App() {
  // State to control which component is displayed
  const [currentPage, setCurrentPage] = useState('home');

  // Function to render the correct component
  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <SignUp />;
      case 'login':
        return <Login />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
