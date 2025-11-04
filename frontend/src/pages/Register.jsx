import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import './auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    sports: ''
  });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const payload = {
        ...form,
        sports: form.sports
          ? form.sports.split(',').map((s) => s.trim()).filter(Boolean)
          : []
      };
      const { data } = await api.post('/auth/register', payload);
      if (data?.token) localStorage.setItem('token', data.token);
      if (data?.user) localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/activities');
    } catch (err) {
      const status = err?.response?.status;
      let m =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Registration failed. Please try again.';
      if (status === 409) {
        m = 'This email is already registered. Please log in.';
      }
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
            <h2>Sign Up</h2>

            <div className="inputbox">
              <ion-icon name="person-outline"></ion-icon>
              <input name="name" required value={form.name} onChange={onChange} />
              <label>Full name</label>
            </div>

            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="email" name="email" required value={form.email} onChange={onChange} />
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

            <div className="inputbox">
              <ion-icon name="location-outline"></ion-icon>
              <input name="city" value={form.city} onChange={onChange} />
              <label>City</label>
            </div>

            <div className="inputbox">
              <ion-icon name="fitness-outline"></ion-icon>
              <input
                name="sports"
                value={form.sports}
                onChange={onChange}
                placeholder="football, tennis"
              />
              <label>Sports (comma-separated)</label>
            </div>

            {msg && <p className="auth-msg">{msg}</p>}

            <button disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>

            <div className="register">
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
