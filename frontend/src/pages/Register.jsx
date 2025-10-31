import { useState } from 'react'
import api from '../api'

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', city:'', sports:'' })
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      sports: form.sports.split(',').map(s => s.trim()).filter(Boolean)
    }
    const { data } = await api.post('/auth/register', payload)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    window.location.href = '/'
  }

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:360 }}>
      <h2>Create account</h2>
      <input name="name" placeholder="Name" onChange={onChange} required />
      <input name="email" placeholder="Email" onChange={onChange} required />
      <input name="password" placeholder="Password" type="password" onChange={onChange} required />
      <input name="city" placeholder="City" onChange={onChange} />
      <input name="sports" placeholder="Sports (comma-separated: football, tennis)" onChange={onChange} />
      <button>Create account</button>
      <a href="/login">Already have an account? Log in</a>
    </form>
  )
}
