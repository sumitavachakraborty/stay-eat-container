export default function AnnouncementBar() {
  return (
    <div
      className="announcement-bar"
      style={{
        background: 'var(--c-near-black)',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 16px',
        fontFamily: 'var(--f-body)',
      }}
    >
      Every stay is verified by a Quality Check before check-in.{' '}
      <a
        href="#quality"
        style={{ color: '#fff', textDecoration: 'underline', marginLeft: 6, textUnderlineOffset: 3 }}
      >
        Learn more
      </a>
    </div>
  );
}
