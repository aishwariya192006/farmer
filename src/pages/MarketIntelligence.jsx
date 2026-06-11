import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MapPin, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const priceData = {
  Wheat: [
    { d: '1', p: 2100 }, { d: '5', p: 2150 }, { d: '10', p: 2080 }, { d: '15', p: 2200 },
    { d: '20', p: 2280 }, { d: '25', p: 2350 }, { d: '30', p: 2320 },
  ],
  Rice: [
    { d: '1', p: 1900 }, { d: '5', p: 1920 }, { d: '10', p: 1880 }, { d: '15', p: 1960 },
    { d: '20', p: 1940 }, { d: '25', p: 1980 }, { d: '30', p: 1960 },
  ],
  Cotton: [
    { d: '1', p: 6000 }, { d: '5', p: 6200 }, { d: '10', p: 6100 }, { d: '15', p: 6400 },
    { d: '20', p: 6600 }, { d: '25', p: 6800 }, { d: '30', p: 6750 },
  ],
  Maize: [
    { d: '1', p: 1750 }, { d: '5', p: 1780 }, { d: '10', p: 1800 }, { d: '15', p: 1820 },
    { d: '20', p: 1810 }, { d: '25', p: 1850 }, { d: '30', p: 1820 },
  ],
};

const mandis = [
  { name: 'Khanna Mandi', district: 'Ludhiana', distance: '12 km', price: '₹2,350/qtl', trend: 'up' },
  { name: 'Ludhiana APMC', district: 'Ludhiana', distance: '5 km', price: '₹2,310/qtl', trend: 'up' },
  { name: 'Bathinda Mandi', district: 'Bathinda', distance: '85 km', price: '₹6,800/qtl', trend: 'down' },
  { name: 'Abohar Mandi', district: 'Fazilka', distance: '120 km', price: '₹6,950/qtl', trend: 'up' },
  { name: 'Moga APMC', district: 'Moga', distance: '45 km', price: '₹5,400/qtl', trend: 'down' },
  { name: 'Jagraon Mandi', district: 'Ludhiana', distance: '18 km', price: '₹2,280/qtl', trend: 'up' },
];

const ticker = 'Wheat ₹2,150/qtl ↑  •  Rice ₹1,960/qtl ↓  •  Cotton ₹6,200/qtl ↑  •  Maize ₹1,820/qtl →  •  Sugarcane ₹315/qtl ↑  •  Mustard ₹5,400/qtl ↑  •  Soybean ₹4,200/qtl ↓  •  ';

const CT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(13,27,10,0.95)', border: '1px solid rgba(196,163,90,0.3)', borderRadius: 10, padding: '8px 14px' }}>
      <div style={{ color: '#A8C5A0', fontSize: 11 }}>Day {label}</div>
      <div style={{ color: '#C4A35A', fontWeight: 700 }}>₹{payload[0].value}/qtl</div>
    </div>
  );
};

export default function MarketIntelligence() {
  const [crop, setCrop] = useState('Wheat');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMandis = mandis.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#C4A35A' }}>Market Intelligence</div>
        <div style={{ color: '#A8C5A0', fontSize: 14, marginTop: 4 }}>Live mandi prices and AI-powered sell timing recommendations</div>
      </div>

      {/* Price Ticker */}
      <div className="ticker-wrap" style={{
        background: 'rgba(196,163,90,0.08)',
        borderTop: '1px solid rgba(196,163,90,0.2)',
        borderBottom: '1px solid rgba(196,163,90,0.2)',
        padding: '10px 0', borderRadius: 12,
      }}>
        <div className="ticker-content" style={{ color: '#C4A35A', fontSize: 13, fontWeight: 600, letterSpacing: '0.03em' }}>
          {ticker.repeat(3)}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Left: Chart + Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#C4A35A' }}>Price Trends</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {Object.keys(priceData).map(c => (
                  <button key={c} onClick={() => setCrop(c)} style={{
                    padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none',
                    background: crop === c ? '#C4A35A' : 'rgba(196,163,90,0.1)',
                    color: crop === c ? '#0A1508' : '#A8C5A0',
                    transition: 'all 0.2s',
                  }}>{c}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={priceData[crop]}>
                <defs>
                  <linearGradient id="mktGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A9B3F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4A9B3F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,163,90,0.08)" vertical={false} />
                <XAxis dataKey="d" stroke="transparent" tick={{ fill: '#A8C5A0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="transparent" tick={{ fill: '#A8C5A0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
                <Tooltip content={<CT />} />
                <Area type="monotone" dataKey="p" stroke="#C4A35A" strokeWidth={2} fill="url(#mktGrad)" dot={false} activeDot={{ r: 5, fill: '#C4A35A', stroke: '#0D1B0A', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Market Insights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card copilot-glow" style={{ background: 'rgba(196,163,90,0.08)', borderColor: 'rgba(196,163,90,0.3)' }}>
              <div style={{ color: '#A8C5A0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Best Time to Sell</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#C4A35A' }}>2nd Week of July</div>
              <div style={{ color: '#A8C5A0', fontSize: 12, marginTop: 4 }}>Hold stock 15–20 more days for +8% gain</div>
            </div>
            <div className="card">
              <div style={{ color: '#A8C5A0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>30-Day Forecast</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#4A9B3F', display: 'flex', alignItems: 'center', gap: 6 }}>
                ₹2,450 <TrendingUp size={18} />
              </div>
              <div style={{ color: '#A8C5A0', fontSize: 12, marginTop: 4 }}>Festival demand + lower supply</div>
            </div>
          </div>
        </div>

        {/* Right: Mandi List */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#C4A35A' }}>Nearby Mandis</div>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#6B8A65' }} />
            <input 
              className="input-field" 
              style={{ paddingLeft: 30, fontSize: 12 }} 
              placeholder="Search mandi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, overflowY: 'auto' }}>
            {filteredMandis.length === 0 ? (
              <div style={{ color: '#A8C5A0', fontSize: 13, textAlign: 'center', marginTop: 20 }}>No mandis found matching "{searchQuery}"</div>
            ) : filteredMandis.map((m, i) => (
              <div key={i} style={{
                background: 'rgba(13,27,10,0.5)', border: '1px solid rgba(196,163,90,0.12)',
                borderRadius: 12, padding: '12px 14px', cursor: 'pointer', transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.12)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ color: '#F5ECD7', fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                    <div style={{ color: '#A8C5A0', fontSize: 11, marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <MapPin size={10} />{m.district} · {m.distance}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#C4A35A', fontWeight: 700, fontSize: 13 }}>{m.price}</div>
                    <div style={{ color: m.trend === 'up' ? '#4A9B3F' : '#F87171', fontSize: 11 }}>
                      {m.trend === 'up' ? <TrendingUp size={12} style={{ display: 'inline' }} /> : <TrendingDown size={12} style={{ display: 'inline' }} />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
