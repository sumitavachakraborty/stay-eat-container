import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import HearthLogo from '../components/HearthLogo.jsx';
import { getProperty } from '../lib/api.js';

const AMENITIES = [
  { i: 'Wifi',     l: 'Fiber Wi-Fi · 600 Mbps' },
  { i: 'Bed',      l: 'Memory-foam queen bed' },
  { i: 'Coffee',   l: 'Slow-pour coffee bar' },
  { i: 'Mountain', l: 'Lake & ridge views' },
  { i: 'Tree',     l: 'Private forest plot' },
  { i: 'Sparkle',  l: 'Pre-cleaned' },
];

const EXTRA_PHOTOS = [
  'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=900',
  'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=900',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900',
];

const BOOKED_DAYS = [4, 5, 6, 11, 17, 18];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [month] = useState('March 2026');
  const [range, setRange] = useState({ in: 23, out: 28 });

  useEffect(() => {
    getProperty(id).then(setP);
  }, [id]);

  // Calendar grid — 35 cells, March starts on Sunday offset 5
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = i - 5;
    return d >= 1 && d <= 31 ? d : null;
  });

  const nights = range.out - range.in;
  const cleaning = 80;
  const total = p ? p.price * nights + cleaning : 0;

  if (!p) {
    return (
      <div className="app" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="mono">Loading…</div>
      </div>
    );
  }

  // Build photo grid (5 cells)
  const gridPhotos = [
    p.photos[0],
    EXTRA_PHOTOS[0],
    EXTRA_PHOTOS[1],
    EXTRA_PHOTOS[2],
    EXTRA_PHOTOS[3],
  ];

  return (
    <div className="app" style={{ minHeight: '100vh' }}>

      {/* Mini nav bar */}
      <div style={{
        padding: '20px 56px',
        borderBottom: '1px solid var(--c-hairline)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <button
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          onClick={() => navigate(-1)}
        >
          <Icon.ArrowLeft size={14} /> Back to search
        </button>
        <button
          style={{ background: 'none', border: 0, cursor: 'pointer', padding: 0 }}
          onClick={() => navigate('/')}
        >
          <HearthLogo size={22} />
        </button>
        <div style={{ display: 'flex', gap: 18 }}>
          <button className="btn-secondary">Share</button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon.Heart size={14} /> Save
          </button>
        </div>
      </div>

      {/* Title + metadata */}
      <div style={{ padding: '28px 56px 0' }}>
        <h1
          className="display"
          style={{ fontSize: 56, margin: 0, lineHeight: 1, letterSpacing: '-0.03em', maxWidth: 800, color: 'var(--c-near-black)' }}
        >
          {p.name}
        </h1>
        <div style={{ marginTop: 14, display: 'flex', gap: 18, alignItems: 'center', color: 'var(--c-slate)', fontSize: 15, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--c-near-black)' }}>
            <Icon.Star size={13} />{p.rating} · {p.reviews} reviews
          </span>
          <span>·</span>
          <span>Superhost</span>
          <span>·</span>
          <span>{p.place}</span>
          <span style={{
            marginLeft: 'auto',
            display: 'flex', gap: 6, alignItems: 'center',
            background: '#edfce9', color: '#003c33',
            padding: '6px 12px', borderRadius: 999,
            fontSize: 12, fontWeight: 600,
            fontFamily: 'var(--f-body)',
          }}>
            <Icon.Shield size={14} /> Quality verified · Mar 23
          </span>
        </div>
      </div>

      {/* Photo grid */}
      <div style={{ padding: '20px 56px 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 8,
          height: 460,
          borderRadius: 22,
          overflow: 'hidden',
        }}>
          <div style={{ gridRow: 'span 2', backgroundImage: `url(${gridPhotos[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          {gridPhotos.slice(1, 3).map((src, i) => (
            <div key={i} style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ))}
          <div style={{ backgroundImage: `url(${gridPhotos[3]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ backgroundImage: `url(${gridPhotos[4]})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            <button
              className="btn-primary invert"
              style={{ position: 'absolute', bottom: 14, right: 14, padding: '10px 16px', fontSize: 13 }}
            >
              <Icon.Camera size={14} /> View all photos
            </button>
          </div>
        </div>
      </div>

      {/* Body — two columns */}
      <div style={{ padding: '40px 56px 56px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 56 }}>

        {/* LEFT: info */}
        <div>
          {/* Host row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--c-hairline)', paddingBottom: 24 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 500 }}>Entire cabin hosted by Mara</div>
              <div style={{ color: 'var(--c-slate)', marginTop: 4, fontSize: 14 }}>4 guests · 2 bedrooms · 2 beds · 1.5 baths</div>
            </div>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg,#ffad9b,#ff7759)',
              display: 'grid', placeItems: 'center',
              color: '#fff', fontWeight: 600, fontSize: 18, flexShrink: 0,
            }}>M</div>
          </div>

          {/* Quality strip */}
          <div style={{
            marginTop: 28,
            padding: 24,
            border: '1px solid #c9e7c5',
            background: 'var(--c-pale-green)',
            borderRadius: 22,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--c-deep-green)',
                display: 'grid', placeItems: 'center',
                color: '#fff', flexShrink: 0,
              }}>
                <Icon.Shield size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 17 }}>Quality Check before every stay</div>
                <div style={{ color: '#003c33', fontSize: 13 }}>
                  You'll receive 24 photos of every room, taken after cleaning. Approve before you check in.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              {['Bedroom', 'Bathroom', 'Kitchen', 'Living', 'Exterior'].map((t) => (
                <div key={t} className="status live" style={{ fontSize: 11 }}>
                  <Icon.Check size={10} />{t}
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 18 }}>What this place offers</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 14 }}>
              {AMENITIES.map((a) => {
                const I = Icon[a.i];
                return (
                  <div key={a.l} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', color: 'var(--c-ink)' }}>
                    <I /> {a.l}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Booking card */}
        <div>
          <div style={{
            position: 'sticky',
            top: 80,
            border: '1px solid var(--c-hairline)',
            borderRadius: 22,
            padding: 24,
            background: '#fff',
            boxShadow: '0 8px 32px rgba(0,0,0,.05)',
          }}>
            {/* Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: 26, fontWeight: 600 }}>${p.price}</span>{' '}
                <span style={{ color: 'var(--c-slate)' }}>night</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--c-slate)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon.Star size={12} /> {p.rating} · {p.reviews}
              </div>
            </div>

            {/* Date + guests input grid */}
            <div style={{ border: '1px solid var(--c-hairline)', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: 12, borderRight: '1px solid var(--c-hairline)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.6 }}>CHECK-IN</div>
                  <div style={{ fontSize: 13 }}>Mar {range.in}, 2026</div>
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.6 }}>CHECKOUT</div>
                  <div style={{ fontSize: 13 }}>Mar {range.out}, 2026</div>
                </div>
              </div>
              <div style={{ padding: 12, borderTop: '1px solid var(--c-hairline)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.6 }}>GUESTS</div>
                <div style={{ fontSize: 13 }}>2 guests</div>
              </div>
            </div>

            {/* Mini calendar */}
            <div style={{ marginBottom: 14, padding: 12, border: '1px solid var(--c-hairline)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                <button style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 4 }}>
                  <Icon.ChevronLeft />
                </button>
                {month}
                <button style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 4 }}>
                  <Icon.ChevronRight />
                </button>
              </div>
              {/* Day headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, fontSize: 11, color: 'var(--c-slate)', marginBottom: 4 }}>
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: 4 }}>{d}</div>
                ))}
              </div>
              {/* Day cells */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, fontSize: 12 }}>
                {days.map((d, i) => {
                  if (!d) return <div key={i} />;
                  const isStart = d === range.in;
                  const isEnd = d === range.out;
                  const inRange = d > range.in && d < range.out;
                  const isBooked = BOOKED_DAYS.includes(d);
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (isBooked) return;
                        // Simple: click sets check-in, second click sets check-out
                        if (!range.in || (range.in && range.out)) {
                          setRange({ in: d, out: null });
                        } else if (d > range.in) {
                          setRange((r) => ({ ...r, out: d }));
                        } else {
                          setRange({ in: d, out: null });
                        }
                      }}
                      style={{
                        aspectRatio: '1/1',
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: 999,
                        background: isStart || isEnd
                          ? 'var(--c-near-black)'
                          : inRange
                          ? 'rgba(255,119,89,.15)'
                          : 'transparent',
                        color: isStart || isEnd
                          ? '#fff'
                          : isBooked
                          ? 'var(--c-muted)'
                          : 'var(--c-near-black)',
                        textDecoration: isBooked ? 'line-through' : 'none',
                        fontWeight: isStart || isEnd ? 600 : 400,
                        cursor: isBooked ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reserve CTA — redirects to login */}
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              onClick={() => navigate('/login')}
            >
              Reserve
            </button>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--c-slate)', marginTop: 8 }}>
              You won't be charged yet · Quality Check required
            </div>

            {/* Price breakdown */}
            <div style={{ marginTop: 16, display: 'grid', gap: 8, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>${p.price} × {nights} nights</span>
                <span>${p.price * nights}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Cleaning</span><span>${cleaning}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Quality Check fee</span>
                <span style={{ color: 'var(--c-deep-green)', fontWeight: 600 }}>Free</span>
              </div>
              <hr className="hr" style={{ margin: '6px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>Total</span><span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
