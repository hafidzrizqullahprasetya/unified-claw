import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const TestAPI: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [health, setHealth] = useState<any>(null);

  // Test health endpoint
  useEffect(() => {
    const testHealth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/health`);
        setHealth(res.data);
      } catch (error) {
        setHealth({ error: 'Connection failed' });
      }
    };

    testHealth();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        email: email,
        password: password,
        full_name: 'Test User',
        phone: '081234567890',
      });
      
      setToken(res.data.token);
      setMessage(`✅ Registered: ${res.data.user.email}`);
    } catch (error: any) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });
      
      setToken(res.data.token);
      setMessage(`✅ Logged in: ${res.data.user.email}`);
    } catch (error: any) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>🧪 API Test Dashboard</h1>

      {/* Health Status */}
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px', borderRadius: '8px' }}>
        <h3>📊 Server Health</h3>
        {health?.error ? (
          <p style={{ color: 'red' }}>❌ {health.error}</p>
        ) : health ? (
          <div>
            <p>✅ Status: {health.status}</p>
            <p>🕐 Timestamp: {health.timestamp}</p>
            <p>🔧 Environment: {health.environment}</p>
            <p>📦 Version: {health.version}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Authentication Form */}
      <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>🔐 Authentication Test</h3>
        
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password123!"
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Loading...' : 'Register'}
            </button>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>

      {/* Response Message */}
      {message && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '4px',
          border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
        }}>
          <p>{message}</p>
        </div>
      )}

      {/* Token Display */}
      {token && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
          <h4>🎫 JWT Token</h4>
          <textarea
            value={token}
            readOnly
            style={{
              width: '100%',
              height: '100px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '12px',
              boxSizing: 'border-box',
            }}
          />
        </div>
      )}

      {/* API Documentation */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📚 Available Endpoints</h3>
        <ul>
          <li><code>GET /health</code> - Health check</li>
          <li><code>POST /auth/register</code> - Register new user</li>
          <li><code>POST /auth/login</code> - Login user</li>
          <li><code>POST /api/stores</code> - Create store</li>
          <li><code>GET /api/stores</code> - List stores</li>
          <li><code>POST /api/stores/:id/products</code> - Create product</li>
          <li><code>GET /api/stores/:id/products</code> - List products</li>
        </ul>
      </div>
    </div>
  );
};

export default TestAPI;
