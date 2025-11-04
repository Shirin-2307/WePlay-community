export default function Home() {
  return (
    <div
      style={{
        background: 'var(--wp-bg)',
        minHeight: 'calc(100vh - 68px)',
        padding: '50px 48px',
        display: 'flex',
        gap: 40,
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: 520, color: '#fff' }}>
        <p style={{ background: 'rgba(255,255,255,0.12)', display: 'inline-block', padding: '6px 14px', borderRadius: 999 }}>
          Find your perfect workout buddy
        </p>
        <h1 style={{ fontSize: 54, lineHeight: 1.05, marginTop: 16, marginBottom: 12 }}>
          Find Your Perfect <br /> Workout Buddy
        </h1>
        <p style={{ fontSize: 16, opacity: 0.95, maxWidth: 420 }}>
          Connect with like-minded fitness enthusiasts in your area and achieve your goals together.
        </p>
        <div style={{ marginTop: 22, display: 'flex', gap: 16 }}>
          <button
            style={{
              background: '#fff',
              color: '#2f3a4b',
              border: 'none',
              borderRadius: 999,
              padding: '10px 22px',
              fontWeight: 600
            }}
            onClick={() => (window.location.href = '/activities')}
          >
            Get Started
          </button>
          <button
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: 999,
              padding: '10px 22px',
              fontWeight: 600
            }}
          >
            How It Works
          </button>
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 30,
          width: 360,
          padding: 22,
          boxShadow: '0 18px 40px rgba(25,35,52,0.12)'
        }}
      >
        <h3 style={{ margin: 0, marginBottom: 4 }}>Hello Sarah!</h3>
        <p style={{ marginTop: 0, color: '#6b7480' }}>You have 3 activities today</p>
        <div style={{ marginTop: 14, borderTop: '1px solid #edf0f5' }} />
        <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
          <ActivityMini title="Morning Gym Session" icon="🏋️" />
          <ActivityMini title="Evening Run" icon="🏃‍♀️" />
        </div>
      </div>
    </div>
  );
}

function ActivityMini({ title, icon }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        background: '#f7f7fb',
        borderRadius: 16,
        padding: '10px 12px'
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 16,
          background: 'linear-gradient(140deg, #7b5cff 0%, #6bb6ff 100%)',
          display: 'grid',
          placeItems: 'center',
          color: '#fff'
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{title}</p>
        <p style={{ margin: 0, fontSize: 12, color: '#71808f' }}>Today</p>
      </div>
    </div>
  );
}
