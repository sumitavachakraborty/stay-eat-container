export default function HearthLogo({ size = 28, inverted = false }) {
  const strokeColor = inverted ? '#ffffff' : '#17171c';
  const textColor = inverted ? '#ffffff' : 'var(--c-near-black)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path
          d="M16 3 4 14v15h9v-9h6v9h9V14z"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="11" r="2" fill="#ff7759" />
      </svg>
      <span
        className="topnav-logo-text"
        style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: textColor,
        }}
      >
        stay and eat
      </span>
    </div>
  );
}
