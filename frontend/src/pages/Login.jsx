import { useState } from 'react'
import api from '../api'

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' })
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const { data } = await api.post('/auth/login', form)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    window.location.href = '/'
  }

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:360 }}>
      <h2>Log in</h2>
      <input name="email" placeholder="Email" onChange={onChange} required />
      <input name="password" placeholder="Password" type="password" onChange={onChange} required />
      <button>Log in</button>
      <a href="/register">No account? Sign up</a>
    </form>
  )
}
