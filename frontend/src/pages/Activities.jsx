import { useEffect, useState } from 'react'
import api from '../api'

export default function Activities() {
  const [list, setList] = useState([])
  const [sport, setSport] = useState('')
  const [city, setCity] = useState('')

  const load = async () => {
    try {
      const { data } = await api.get('/activities', { params: { sport, city, upcoming:'true' } })
      // لو الرد مش Array، نحوله إلى Array فاضية بدل ما نعمل crash
      setList(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching activities:', err)
      setList([])
    }
  }

  useEffect(() => { load() }, [])

  const join = async (id) => {
    try {
      await api.post(`/activities/${id}/join`)
      load()
    } catch (err) {
      console.error('Error joining activity:', err)
    }
  }

  return (
    <div>
      <h2>Upcoming activities</h2>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <input placeholder="Sport (e.g., football)" value={sport} onChange={e=>setSport(e.target.value)} />
        <input placeholder="City (e.g., Rotterdam)" value={city} onChange={e=>setCity(e.target.value)} />
        <button onClick={load}>Search</button>
      </div>

      {list.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        list.map(a => (
          <div key={a._id} style={{border:'1px solid #ddd', padding:12, marginBottom:8}}>
            <b>{a.title}</b>
            <div>Sport: {a.sport}</div>
            <div>Location: {a.location}</div>
            <div>Time: {new Date(a.dateTime).toLocaleString()}</div>
            <div>Organizer: {a.createdBy?.name ?? '—'}</div>
            <button onClick={()=>join(a._id)}>Join</button>
          </div>
        ))
      )}
    </div>
  )
}
