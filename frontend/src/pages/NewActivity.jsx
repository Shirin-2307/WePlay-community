import { useState } from 'react'
import api from '../api'

export default function NewActivity() {
  const [form, setForm] = useState({ title:'', sport:'', location:'', dateTime:'', maxPlayers:10, description:'' })
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    await api.post('/activities', {
      ...form,
      dateTime: new Date(form.dateTime).toISOString()
    })
    window.location.href = '/'
  }

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:420 }}>
      <h2>New activity</h2>
      <input name="title" placeholder="Title" onChange={onChange} required />
      <input name="sport" placeholder="Sport (e.g., football)" onChange={onChange} required />
      <input name="location" placeholder="Location" onChange={onChange} required />
      <input type="datetime-local" name="dateTime" onChange={onChange} required />
      <input name="maxPlayers" type="number" placeholder="Max players" onChange={onChange} />
      <textarea name="description" placeholder="Description" onChange={onChange} />
      <button>Save</button>
    </form>
  )
}
