import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';

export default function PropertyCard({ p, idx = 0 }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(p.favorite ?? false);
  const navigate = useNavigate();

  return (
    <div
      style={{ animation: `fade-up .6s cubic-bezier(.2,.7,.3,1) ${idx * 0.05}s both` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Media card */}
      <div
        className="media-card"
        style={{ aspectRatio: '1/1', cursor: 'pointer' }}
        onClick={() => navigate(`/property/${p.id}`)}
      >
        <img
          src={p.photos[imgIdx]}
          alt={p.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform .6s',
            transform: hover ? 'scale(1.04)' : 'none',
            display: 'block',
          }}
          loading="lazy"
        />

        {/* Badge */}
        {p.badge && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: '#fff',
              padding: '6px 12px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'var(--f-body)',
              color: 'var(--c-near-black)',
            }}
          >
            {p.badge}
          </div>
        )}

        {/* Heart button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'transparent',
            border: 0,
            color: '#fff',
            cursor: 'pointer',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))',
            padding: 0,
            lineHeight: 0,
          }}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Icon.Heart
            size={22}
            fill={liked ? '#ff7759' : 'rgba(0,0,0,.35)'}
            stroke="#fff"
            strokeW={1.8}
          />
        </button>

        {/* Dot indicators */}
        {p.photos.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {p.photos.map((_, i) => (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: i === imgIdx ? '#fff' : 'rgba(255,255,255,.5)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        )}

        {/* Prev/next arrows on hover */}
        {hover && p.photos.length > 1 && (
          <>
            {imgIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setImgIdx((v) => v - 1); }}
                style={{
                  position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,.85)', border: 0, borderRadius: '50%',
                  width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--c-near-black)',
                }}
                aria-label="Previous photo"
              >
                <Icon.ChevronLeft size={14} />
              </button>
            )}
            {imgIdx < p.photos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setImgIdx((v) => v + 1); }}
                style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,.85)', border: 0, borderRadius: '50%',
                  width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--c-near-black)',
                }}
                aria-label="Next photo"
              >
                <Icon.ChevronRight size={14} />
              </button>
            )}
          </>
        )}
      </div>

      {/* Info row */}
      <div onClick={() => navigate(`/property/${p.id}`)} style={{ paddingTop: 12, cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontWeight: 600, fontSize: 15, fontFamily: 'var(--f-body)', color: 'var(--c-near-black)' }}>
            {p.place}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, flexShrink: 0 }}>
            <Icon.Star size={12} />{p.rating.toFixed(p.rating === 5 ? 1 : 2)}
          </div>
        </div>
        <div style={{ color: 'var(--c-slate)', fontSize: 14, marginTop: 2, fontFamily: 'var(--f-body)' }}>{p.sub}</div>
        <div style={{ color: 'var(--c-slate)', fontSize: 14, fontFamily: 'var(--f-body)' }}>{p.dates}</div>
        <div style={{ marginTop: 6, fontSize: 14, fontFamily: 'var(--f-body)', color: 'var(--c-ink)' }}>
          <span style={{ fontWeight: 600 }}>${p.price}</span> night
        </div>
      </div>
    </div>
  );
}
