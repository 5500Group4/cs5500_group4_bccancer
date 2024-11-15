import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import AddEventPage from './pages/AddEventPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar username="TestUser" onLogout={() => console.log('Logout')} />
        <div className='App'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/add-event' element={<AddEventPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
