// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import AddEventPage from './pages/AddEventPage';
import ViewEventPage from './pages/ViewEventPage';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import { AuthProvider } from './context/AuthContext';
import EventDetails from './components/EventDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className='App'>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-event" element={<AddEventPage />} />
              <Route path="/view-event" element={<ViewEventPage />} />
<<<<<<< Updated upstream
=======
              <Route path="/view-users" element={<UsersPage />} />
              <Route path="/event-details/:id" element={<EventDetails />} />
>>>>>>> Stashed changes
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
