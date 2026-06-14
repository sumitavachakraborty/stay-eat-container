import { useEffect, useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar.jsx';
import TopNav from '../components/TopNav.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryStrip from '../components/CategoryStrip.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import { getProperties, getCategories } from '../lib/api.js';

export default function Landing() {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [props, cats] = await Promise.all([getProperties(), getCategories()]);
      setProperties(props);
      setCategories(cats);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="app" style={{ minHeight: '100vh' }}>
      <AnnouncementBar />
      <TopNav />

      {/* Search bar section */}
      <div style={{ padding: '32px 56px 12px', background: '#fff' }}>
        <SearchBar />
      </div>

      <CategoryStrip categories={categories} />

      {/* Property grid */}
      <div style={{ padding: '28px 56px 56px', background: '#fff' }}>
        <div className="mono" style={{ marginBottom: 14 }}>Near you · Boulder, CO</div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: '1/1', borderRadius: 22, background: 'var(--c-stone)', animation: 'fade-in .5s ease both' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
            {properties.map((p, i) => (
              <PropertyCard key={p.id} p={p} idx={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
