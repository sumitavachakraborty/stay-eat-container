import { useEffect, useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar.jsx';
import TopNav from '../components/TopNav.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryStrip from '../components/CategoryStrip.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import BottomTabBar from '../components/BottomTabBar.jsx';
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
      <div className="searchbar-section">
        <SearchBar />
      </div>

      <CategoryStrip categories={categories} />

      {/* Property grid */}
      <div className="property-grid-section">
        <div className="mono" style={{ marginBottom: 14 }}>Near you · Boulder, CO</div>

        {loading ? (
          <div className="skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: '1/1', borderRadius: 22, background: 'var(--c-stone)', animation: 'fade-in .5s ease both' }} />
            ))}
          </div>
        ) : (
          <div className="property-grid">
            {properties.map((p, i) => (
              <PropertyCard key={p.id} p={p} idx={i} />
            ))}
          </div>
        )}
      </div>

      {/* Floating bottom tab bar — visible on mobile only */}
      <BottomTabBar />
    </div>
  );
}
