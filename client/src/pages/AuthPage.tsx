import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import RoleDropdown from '../components/RoleDropdown';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState(0);
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState<number | null>(null);
  const [roleName, setRoleName] = useState<string | null>(null); // New state for roleName
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null); // Unified state for feedback
  const { login } = useAuth();

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    setFeedback(null); // Clear feedback on mode switch
  };

  const handleRoleSelect = (selectedRoleId: number, selectedRoleName: string) => {
    setRoleId(selectedRoleId);
    setRoleName(selectedRoleName); // Store roleName in state
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post(`${API_BASE_URL}/users/login`, { userName, password });
        login(response.data);
      } else {
        if (roleId === null) {
          setFeedback({ message: 'Please select a role.', type: 'error' });
          return;
        }

        const response = await axios.post(`${API_BASE_URL}/users/signup`, { userName, employeeNumber, roleId, password });
        setFeedback({ message: `User ${response.data.userName} created successfully! Logging you in...`, type: 'success' });
        setTimeout(() => {
          login(response.data);
        }, 800);
      }
    } catch (error: any) {
      setFeedback({ message: error.response?.data?.error || `An error occurred: ${error.message}`, type: 'error' });
    }
  };

  return (
    <div className="auth-page">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

      {feedback && (
        <p className={`auth-feedback ${feedback.type === 'error' ? 'auth-error' : 'auth-message'}`}>
          {feedback.message}
        </p>
      )}

      <div className="auth-switch">
        {isLogin ? "New user?" : "Already have an account?"}
        <button onClick={handleSwitchMode} className="auth-switch-button">
          {isLogin ? "Click to sign up" : "Click to log in"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="auth-form-label" htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <>
            <div className="form-group">
              <label className="auth-form-label" htmlFor="employeeNumber">Employee Number</label>
              <input
                type="number"
                id="employeeNumber"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(Number(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <RoleDropdown onRoleSelect={handleRoleSelect} /> {/* Pass the handler */}
            </div>
          </>
        )}
        <div className="form-group">
          <label className="auth-form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="auth-page-submit" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default AuthPage;
