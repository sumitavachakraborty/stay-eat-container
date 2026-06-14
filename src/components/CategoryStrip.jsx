import { useState } from 'react';
import Icon from './Icon.jsx';

export default function CategoryStrip({ categories = [] }) {
  const [active, setActive] = useState(categories[0]?.id ?? 'tiny');

  return (
    <div
      className="category-strip"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        borderBottom: '1px solid var(--c-hairline)',
        background: '#fff',
      }}
    >
      {/* Scrollable category tabs */}
      <div style={{ display: 'flex', gap: 32, flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {categories.map((c) => {
          const I = Icon[c.icon] || Icon.Cabin;
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
                padding: '6px 0 14px',
                color: isActive ? 'var(--c-near-black)' : 'var(--c-slate)',
                borderBottom: isActive ? '2px solid var(--c-near-black)' : '2px solid transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                opacity: isActive ? 1 : 0.7,
                transition: 'all .2s',
                minWidth: 64,
                flexShrink: 0,
                minHeight: 44,
              }}
            >
              <I size={22} />
              <div
                style={{
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 500,
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--f-body)',
                }}
              >
                {c.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter controls — hidden at ≤480 via CSS */}
      <div className="category-strip-filters" style={{ gap: 10, alignItems: 'center', flexShrink: 0 }}>
        <button
          className="pill-outline"
          style={{ display: 'flex', gap: 8, alignItems: 'center', borderColor: 'var(--c-hairline)', color: 'var(--c-near-black)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 6h6M14 6h6M4 12h2M10 12h10M4 18h12M20 18h0" />
            <circle cx="12" cy="6" r="2" />
            <circle cx="8" cy="12" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
          Filters
        </button>

        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            border: '1px solid var(--c-hairline)',
            borderRadius: 999,
            padding: '8px 14px',
            fontSize: 13,
            fontFamily: 'var(--f-body)',
            color: 'var(--c-ink)',
          }}
        >
          Display total before taxes
          <div style={{ width: 28, height: 16, borderRadius: 999, background: 'var(--c-near-black)', position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                position: 'absolute',
                right: 2,
                top: 2,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#fff',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
