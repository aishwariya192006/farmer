import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Wind, Droplets, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

const forecast = [
  { day: 'Mon', date: '16 Jun', icon: Sun, hi: 34, lo: 24, rain: '0%' },
  { day: 'Tue', date: '17 Jun', icon: Cloud, hi: 32, lo: 25, rain: '20%' },
  { day: 'Wed', date: '18 Jun', icon: CloudRain, hi: 29, lo: 23, rain: '80%' },
  { day: 'Thu', date: '19 Jun', icon: CloudRain, hi: 28, lo: 22, rain: '95%' },
  { day: 'Fri', date: '20 Jun', icon: Cloud, hi: 31, lo: 23, rain: '30%' },
  { day: 'Sat', date: '21 Jun', icon: Sun, hi: 33, lo: 24, rain: '5%' },
  { day: 'Sun', date: '22 Jun', icon: Sun, hi: 35, lo: 25, rain: '0%' },
];

const schedule = [
  { day: 'Monday', amount: '0 mm', status: 'Skip — Soil Optimal', statusColor: '#4A9B3F' },
  { day: 'Tuesday', amount: '0 mm', status: 'Skip — Rain Expected', statusColor: '#4A9B3F' },
  { day: 'Wednesday', amount: '0 mm', status: 'Rain 8mm forecast', statusColor: '#7A9BB5' },
  { day: 'Thursday', amount: '0 mm', status: 'Heavy Rain 15mm', statusColor: '#7A9BB5' },
  { day: 'Friday', amount: '18 mm', status: 'Irrigate morning', statusColor: '#C4A35A' },
  { day: 'Saturday', amount: '0 mm', status: 'Monitor soil', statusColor: '#A8C5A0' },
  { day: 'Sunday', amount: '15 mm', status: 'Irrigate if needed', statusColor: '#C4A35A' },
];

export default function WeatherIrrigation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#C4A35A' }}>Weather &amp; Irrigation</div>
        <div style={{ color: '#A8C5A0', fontSize: 14, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
          <MapPin size={12} /> Ludhiana, Punjab (Farm Location)
        </div>
      </div>

      {/* Current Weather */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(26,46,16,0.6) 0%, rgba(15,30,10,0.8) 100%)',
        borderColor: 'rgba(196,163,90,0.25)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sun size={88} color="#F4C842" style={{ filter: 'drop-shadow(0 0 20px rgba(244,200,66,0.6))' }} />
            </motion.div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 68, fontWeight: 700, color: '#F5ECD7', lineHeight: 1 }}>28°</div>
              <div style={{ color: '#A8C5A0', fontSize: 18, marginTop: 4 }}>Partly Cloudy</div>
              <div style={{ color: '#6B8A65', fontSize: 13 }}>Feels like 31°C</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { icon: Droplets, label: 'Humidity', value: '65%' },
              { icon: Wind, label: 'Wind Speed', value: '12 km/h NW' },
              { icon: CloudRain, label: 'Precipitation', value: '0 mm' },
              { icon: Sun, label: 'UV Index', value: '6 (High)' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(196,163,90,0.1)', border: '1px solid rgba(196,163,90,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={17} color="#C4A35A" />
                </div>
                <div>
                  <div style={{ color: '#A8C5A0', fontSize: 11 }}>{label}</div>
                  <div style={{ color: '#F5ECD7', fontWeight: 600, fontSize: 13 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="card">
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#C4A35A', marginBottom: 16 }}>7-Day Forecast</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 10 }}>
          {forecast.map(({ day, date, icon: Icon, hi, lo, rain }) => (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(13,27,10,0.5)', border: '1px solid rgba(196,163,90,0.12)',
                borderRadius: 14, padding: '12px 8px', textAlign: 'center',
              }}
            >
              <div style={{ color: '#C4A35A', fontSize: 12, fontWeight: 700 }}>{day}</div>
              <div style={{ color: '#6B8A65', fontSize: 10, marginBottom: 8 }}>{date}</div>
              <Icon size={24} color={parseInt(rain) > 60 ? '#7A9BB5' : '#C4A35A'} style={{ margin: '0 auto 8px' }} />
              <div style={{ color: '#F5ECD7', fontSize: 14, fontWeight: 700 }}>{hi}°</div>
              <div style={{ color: '#A8C5A0', fontSize: 11 }}>{lo}°</div>
              <div style={{ color: '#7A9BB5', fontSize: 10, marginTop: 4 }}>{rain}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Irrigation Section */}
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#C4A35A', marginBottom: 14 }}>Irrigation Recommendations</div>

        {/* Alert */}
        <div style={{
          background: 'rgba(74,155,63,0.1)', border: '1px solid rgba(74,155,63,0.3)',
          borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
        }}>
          <CheckCircle size={22} color="#4A9B3F" />
          <div>
            <div style={{ color: '#4A9B3F', fontWeight: 700, fontSize: 14 }}>No Irrigation Needed Today</div>
            <div style={{ color: '#A8C5A0', fontSize: 13 }}>Rain expected tomorrow — 8mm. Soil moisture optimal at 68%.</div>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(196,163,90,0.12)', fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: '#C4A35A' }}>
            Weekly Irrigation Schedule
          </div>
          {schedule.map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '12px 20px', alignItems: 'center',
              background: i % 2 === 0 ? 'rgba(196,163,90,0.04)' : 'transparent',
              borderBottom: i < schedule.length - 1 ? '1px solid rgba(196,163,90,0.06)' : 'none',
            }}>
              <span style={{ color: '#F5ECD7', fontSize: 13 }}>{row.day}</span>
              <span style={{ color: '#A8C5A0', fontSize: 13 }}>{row.amount}</span>
              <span style={{ color: row.statusColor, fontSize: 12, fontWeight: 600 }}>{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
