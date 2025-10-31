import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './pages/Login'
import Register from './pages/Register'
import Activities from './pages/Activities'
import NewActivity from './pages/NewActivity'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <Nav />
      <div style={{ padding: 16, maxWidth: 800, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/new" element={<PrivateRoute><NewActivity /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  )
}
