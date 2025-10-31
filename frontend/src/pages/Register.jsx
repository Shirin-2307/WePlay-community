import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    sports: ''
  });
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
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        city: form.city.trim(),
        sports: form.sports
          ? form.sports.split(',').map((s) => s.trim()).filter(Boolean)
          : []
      };

      console.log('[Register] submitting payload:', { ...payload, password: '***' });
      const { data } = await api.post('/auth/register', payload);
      console.log('[Register] success:', data);

      if (data?.token) localStorage.setItem('token', data.token);
      if (data?.user) localStorage.setItem('user', JSON.stringify(data.user));

      setMsg({ type: 'success', text: 'Account created successfully! Redirecting…' });
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Registration failed. Please try again.';

      let niceMsg = serverMsg;
      if (status === 409) {
        niceMsg = 'This email is already registered. Try logging in or use another email.';
      } else if (status === 400) {
        niceMsg = 'Please check your inputs and try again.';
      }

      setMsg({ type: 'error', text: niceMsg });
      console.error('[Register] error:', status, serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 20 }}>
      <h2 style={{ marginBottom: 8 }}>Create account</h2>
      <p style={{ color: '#666', marginTop: 0 }}>Join WePlay and find sport buddies.</p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={onChange}
          autoComplete="name"
          required
        />
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
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={onChange}
          autoComplete="new-password"
          minLength={6}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={onChange}
          autoComplete="address-level2"
        />
        <input
          name="sports"
          placeholder="Sports (comma-separated: football, tennis)"
          value={form.sports}
          onChange={onChange}
          autoComplete="off"
        />

        <button type="submit" disabled={loading} style={{ padding: '10px 14px' }}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>

      {msg && (
        <div
          role="alert"
          style={{
            marginTop: 12,
            color: msg.type === 'error' ? 'crimson' : 'green',
            fontWeight: 500
          }}
        >
          {msg.text}
        </div>
      )}

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
