import { Link } from 'react-router-dom'

export default function Nav() {
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd'}}>
      <Link to="/">Activities</Link>
      <Link to="/new">+ New Activity</Link>
      {!token ? <Link to="/login">Log in</Link> : <button onClick={logout}>Log out</button>}
    </nav>
  )
}
