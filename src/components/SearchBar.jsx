import { useState } from 'react';
import Icon from './Icon.jsx';

export default function SearchBar() {
  const [active, setActive] = useState('where');

  const fields = [
    { id: 'where', label: 'Where', value: 'Search destinations' },
    { id: 'in',    label: 'Check in',  value: 'Add dates' },
    { id: 'out',   label: 'Check out', value: 'Add dates' },
    { id: 'who',   label: 'Who',       value: 'Add guests' },
  ];

  return (
    <>
      {/* Desktop 4-segment pill */}
      <div
        className="search-desktop"
        style={{
          alignItems: 'center',
          maxWidth: 880,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 999,
          border: '1px solid var(--c-hairline)',
          boxShadow: '0 6px 20px rgba(0,0,0,.06)',
          padding: 6,
        }}
      >
        {fields.map((f, i) => (
          <span key={f.id} style={{ display: 'contents' }}>
            <button
              onClick={() => setActive(f.id)}
              style={{
                flex: f.id === 'where' ? 1.4 : 1,
                textAlign: 'left',
                background: active === f.id ? '#fff' : 'transparent',
                border: 0,
                padding: '12px 22px',
                borderRadius: 999,
                cursor: 'pointer',
                boxShadow: active === f.id ? '0 4px 14px rgba(0,0,0,.08)' : 'none',
                transition: 'box-shadow .2s, background .2s',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-near-black)', marginBottom: 4 }}>
                {f.label}
              </div>
              <div style={{ fontSize: 14, color: 'var(--c-muted)' }}>{f.value}</div>
            </button>
            {i < fields.length - 1 && (
              <div style={{ width: 1, height: 28, background: 'var(--c-border-light)', flexShrink: 0 }} />
            )}
          </span>
        ))}
        <button
          className="btn-primary coral"
          style={{ marginLeft: 6, padding: 14, borderRadius: '50%', width: 48, height: 48, justifyContent: 'center', flexShrink: 0 }}
          aria-label="Search"
        >
          <Icon.Search size={16} />
        </button>
      </div>

      {/* Mobile single search pill */}
      <button className="search-mobile" aria-label="Search stays">
        <Icon.Search size={16} style={{ flexShrink: 0 }} />
        <span>where are you going?</span>
      </button>
    </>
  );
}
