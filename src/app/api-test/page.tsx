'use client';

import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000';

interface HealthStatus {
  status: string;
  timestamp: string;
  environment: string;
  version: string;
  error?: string;
}

interface AuthResponse {
  success: boolean;
  user: {
    id: number;
    email: string;
    role: string;
  };
  token: string;
}

export default function TestAPIPage() {
  const [email, setEmail] = useState('test' + Date.now() + '@example.com');
  const [password, setPassword] = useState('Password123!');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [health, setHealth] = useState<HealthStatus | null>(null);

  // Test health endpoint
  useEffect(() => {
    const testHealth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`);
        const data = await res.json();
        setHealth(data);
      } catch (error: any) {
        setHealth({ 
          status: 'error',
          timestamp: new Date().toISOString(),
          environment: 'unknown',
          version: 'unknown',
          error: error.message 
        });
      }
    };

    testHealth();
    const interval = setInterval(testHealth, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          full_name: 'Test User',
          phone: '081234567890',
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data: AuthResponse = await res.json();
      setToken(data.token);
      setMessage(`✅ Registered: ${data.user.email}`);
    } catch (error: any) {
      setMessage(`❌ Register failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data: AuthResponse = await res.json();
      setToken(data.token);
      setMessage(`✅ Logged in: ${data.user.email}`);
    } catch (error: any) {
      setMessage(`❌ Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1>🧪 Unified Agentic OS - API Test Dashboard</h1>

      {/* Health Status */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: health?.error ? '#ffebee' : '#e8f5e9', 
        marginBottom: '20px', 
        borderRadius: '8px',
        border: `2px solid ${health?.error ? '#f44336' : '#4caf50'}`
      }}>
        <h3>📊 Backend Server Status</h3>
        {health?.error ? (
          <p style={{ color: '#d32f2f', margin: 0 }}>
            ❌ Connection Failed: {health.error}
          </p>
        ) : health ? (
          <div>
            <p style={{ margin: '5px 0' }}>✅ Status: <strong>{health.status}</strong></p>
            <p style={{ margin: '5px 0' }}>🕐 Time: {new Date(health.timestamp).toLocaleTimeString()}</p>
            <p style={{ margin: '5px 0' }}>🔧 Environment: <strong>{health.environment}</strong></p>
            <p style={{ margin: '5px 0' }}>📦 Version: {health.version}</p>
          </div>
        ) : (
          <p>⏳ Loading...</p>
        )}
      </div>

      {/* Authentication Form */}
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🔐 Authentication Test</h3>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password123!"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={loading || !health || !('error' in health)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              {loading ? '⏳ Loading...' : '📝 Register'}
            </button>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading || !health || !('error' in health)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              {loading ? '⏳ Loading...' : '🔓 Login'}
            </button>
          </div>
        </form>
      </div>

      {/* Response Message */}
      {message && (
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: message.includes('✅') ? '#c8e6c9' : '#ffcdd2',
          color: message.includes('✅') ? '#1b5e20' : '#c62828',
          borderRadius: '4px',
          border: `1px solid ${message.includes('✅') ? '#81c784' : '#ef5350'}`,
        }}>
          <p style={{ margin: 0 }}>{message}</p>
        </div>
      )}

      {/* Token Display */}
      {token && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
          <h4>🎫 JWT Token (Use in Authorization header)</h4>
          <textarea
            value={token}
            readOnly
            onClick={(e) => (e.currentTarget as HTMLTextAreaElement).select()}
            style={{
              width: '100%',
              height: '80px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '11px',
              boxSizing: 'border-box',
              border: '1px solid #64b5f6',
              borderRadius: '4px',
            }}
          />
          <p style={{ fontSize: '12px', color: '#1976d2', marginTop: '10px' }}>
            💡 Click to select all, then copy
          </p>
        </div>
      )}

      {/* API Documentation */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h3>📚 Available API Endpoints</h3>
        <div style={{ fontSize: '14px', fontFamily: 'monospace', lineHeight: '1.8' }}>
          <p><strong>🔓 Public Endpoints:</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li><code>GET /health</code> - Server health check</li>
            <li><code>POST /auth/register</code> - Register new account</li>
            <li><code>POST /auth/login</code> - Login to account</li>
          </ul>

          <p><strong>🔐 Protected Endpoints (need token):</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li><code>POST /api/stores</code> - Create new store</li>
            <li><code>GET /api/stores</code> - List user's stores</li>
            <li><code>POST /api/stores/:id/products</code> - Create product</li>
            <li><code>GET /api/stores/:id/products</code> - List products</li>
            <li><code>POST /api/stores/:id/orders</code> - Create order</li>
            <li><code>GET /api/stores/:id/orders</code> - List orders</li>
          </ul>
        </div>
      </div>

      {/* Server Info */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '13px' }}>
        <p><strong>Backend Server:</strong> {API_BASE_URL}</p>
        <p><strong>Frontend:</strong> {typeof window !== 'undefined' ? window.location.href : 'Next.js'}</p>
      </div>
    </div>
  );
}
