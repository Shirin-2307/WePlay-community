import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { type: 'error' | 'success', text: string }

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
      };

      console.log('[Login] submitting payload:', { ...payload, password: '***' });
      const { data } = await api.post('/auth/login', payload);
      console.log('[Login] success:', data);

      if (data?.token) localStorage.setItem('token', data.token);
      if (data?.user) localStorage.setItem('user', JSON.stringify(data.user));

      setMsg({ type: 'success', text: 'Logged in successfully!' });
      setTimeout(() => navigate('/'), 500);
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Login failed. Please try again.';

      let niceMsg = serverMsg;
      if (status === 401) {
        niceMsg = 'Incorrect email or password. Please try again.';
      }

      setMsg({ type: 'error', text: niceMsg });
      console.error('[Login] error:', status, serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 20 }}>
      <h2 style={{ marginBottom: 8 }}>Log in</h2>
      <p style={{ color: '#666', marginTop: 0 }}>Welcome back to WePlay.</p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          autoComplete="email"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading} style={{ padding: '10px 14px' }}>
          {loading ? 'Signing in…' : 'Log in'}
        </button>
      </form>

      {msg && (
        <div
          role="alert"
          style={{
            marginTop: 12,
            color: msg.type === 'error' ? 'crimson' : 'green',
            fontWeight: 500,
          }}
        >
          {msg.text}
        </div>
      )}

      <p style={{ marginTop: 12 }}>
        No account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}
