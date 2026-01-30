import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from '../hooks/use-toast';
import './Auth.css';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: 'Успішний вхід',
        description: 'Ласкаво просимо!'
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Невірний email або пароль',
        variant: 'destructive'
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: 'Помилка',
        description: 'Паролі не співпадають',
        variant: 'destructive'
      });
      return;
    }

    try {
      await register(registerData.email, registerData.password, registerData.name);
      toast({
        title: 'Реєстрація успішна',
        description: 'Вітаємо в Поплавку!'
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося зареєструватися',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-logo">Поплавок</h1>
          <p className="auth-subtitle">Вхід або реєстрація</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Вхід
          </button>
          <button
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Реєстрація
          </button>
        </div>

        {/* Content */}
        <div className="auth-content">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label className="form-label required">Email</label>
                <div className="input-container">
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="email@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">Пароль</label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Введіть пароль"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-button">
                Увійти
              </button>

              {/* <div className="forgot-password">
                <Link to="/forgot-password" className="forgot-link">
                  Забули пароль?
                </Link>
              </div> */}
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label className="form-label required">Ім’я</label>
                <div className="input-container">
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Ваше ім’я"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">Email</label>
                <div className="input-container">
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="email@example.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">Пароль</label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Створіть пароль"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">Підтвердіть пароль</label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Повторіть пароль"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="auth-button">
                Зареєструватися
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;