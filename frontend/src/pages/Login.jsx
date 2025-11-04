import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import './auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      if (data?.token) localStorage.setItem('token', data.token);
      if (data?.user) localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/activities');
    } catch (err) {
      const m =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Login failed. Please check your email or password.';
      setMsg(m);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={onSubmit}>
            <h2>Login</h2>

            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={onChange}
              />
              <label>Email</label>
            </div>

            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={onChange}
              />
              <label>Password</label>
            </div>

            {msg && <p className="auth-msg">{msg}</p>}

            <button disabled={loading}>{loading ? 'Signing in...' : 'Log In'}</button>

            <div className="register">
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
       {/* ionicons */}
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule="true"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
}



 