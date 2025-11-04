const mockEvents = [
  {
    id: 1,
    title: 'Morning Run Group',
    date: 'Mon, Jan 15',
    time: '07:00',
    place: 'Golden Gate Park',
    desc: 'Join us for a refreshing morning run through the park!',
    participants: '8/12'
  },
  {
    id: 2,
    title: 'Tennis Tournament',
    date: 'Sat, Jan 20',
    time: '14:00',
    place: 'Mission Dolores Park',
    desc: 'Friendly tennis tournament for all skill levels.',
    participants: '16/20'
  },
  {
    id: 3,
    title: 'Yoga in the Park',
    date: 'Thu, Jan 18',
    time: '09:00',
    place: 'Dolores Park',
    desc: 'Relaxing yoga session in the beautiful park setting.',
    participants: '15/25'
  }
];

export default function Events() {
  return (
    <div style={{ maxWidth: 1100, margin: '28px auto', padding: '0 16px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 26 }}>Upcoming Events</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {mockEvents.map((ev) => (
          <div
            key={ev.id}
            style={{
              background: 'linear-gradient(160deg, #6bb6ff 0%, #7b5cff 50%, #b47bff 100%)',
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow: '0 14px 35px rgba(123, 92, 255, 0.28)',
              color: '#1f2933'
            }}
          >
            <div style={{ height: 90 }}></div>
            <div
              style={{
                background: '#fff',
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                padding: 18,
                minHeight: 210
              }}
            >
              <h3 style={{ marginTop: -60, marginBottom: 6 }}>{ev.title}</h3>
              <p style={{ margin: 0, display: 'flex', gap: 14, fontSize: 13, color: '#6b7480' }}>
                <span>📅 {ev.date}</span>
                <span>🕒 {ev.time}</span>
                <span>📍 {ev.place}</span>
              </p>
              <p style={{ marginTop: 10, marginBottom: 18, fontSize: 13.5 }}>{ev.desc}</p>
              <p style={{ fontSize: 12, color: '#6b7480', marginBottom: 12 }}>{ev.participants} participants</p>
              <button
                style={{
                  background: 'linear-gradient(140deg, #7b5cff 0%, #6bb6ff 100%)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: 999,
                  padding: '8px 16px',
                  fontWeight: 600
                }}
              >
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
