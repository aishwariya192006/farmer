import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Sprout, FlaskConical,
  ScanLine, Bug, TrendingUp, PiggyBank, Building2,
  Bot, LogOut, Leaf,
} from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

const SIDEBAR_W = 72; // sidebar width in pixels
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLang();

  const NAV = [
    { icon: LayoutDashboard, label: t('dashboard'),  path: '/app/dashboard' },
    { icon: Calendar,        label: t('calendar'),   path: '/app/calendar'  },
    { icon: Sprout,          label: t('seeds'),      path: '/app/seeds'     },
    { icon: FlaskConical,    label: t('soil'),       path: '/app/soil'      },
    { icon: ScanLine,        label: t('disease'),    path: '/app/disease'   },
    { icon: Bug,             label: 'Pest Forecasting', path: '/app/pests'  },
    { icon: TrendingUp,      label: t('market'),     path: '/app/market'    },
    { icon: PiggyBank,       label: t('profit'),     path: '/app/profit'    },
    { icon: Building2,       label: t('schemes'),    path: '/app/schemes'   },
    { icon: Bot,             label: t('assistant'),  path: '/app/assistant' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        left: 8,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        width: SIDEBAR_W,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '10px 6px',
        background: 'rgba(1, 8, 4, 0.90)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 18,
        border: '1px solid rgba(0,255,136,0.18)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,136,0.06)',
      }}
    >
      {/* Logo mark */}
      <button
        onClick={() => navigate('/')}
        title="AgriMate Home"
        style={{
          width: 36, height: 36, borderRadius: 10, marginBottom: 6,
          background: 'linear-gradient(135deg,#2D6A1F,#4A9B3F)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 12px rgba(74,155,63,0.4)',
          flexShrink: 0,
        }}
      >
        <Leaf size={18} color="#F5ECD7" />
      </button>

      {/* Divider */}
      <div style={{ width: 28, height: 1, background: 'rgba(196,163,90,0.18)', marginBottom: 4 }} />

      {/* Nav icons */}
      {NAV.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path;
        return (
          <Tooltip key={path} label={label}>
            <motion.button
              onClick={() => navigate(path)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              style={{
                width: 40, height: 40, borderRadius: 11,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                background: active
                  ? 'rgba(255,255,255,0.92)'
                  : 'transparent',
                boxShadow: active
                  ? '0 2px 12px rgba(255,255,255,0.15)'
                  : 'none',
                transition: 'background 0.18s, box-shadow 0.18s',
              }}
            >
              <Icon
                size={18}
                color={active ? '#0D1B0A' : '#6BAF63'}
                strokeWidth={active ? 2.2 : 1.8}
              />
              {active && (
                <motion.div
                  layoutId="active-pill"
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 11,
                    background: 'rgba(255,255,255,0.92)',
                    zIndex: -1,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </motion.button>
          </Tooltip>
        );
      })}

      {/* Divider */}
      <div style={{ width: 28, height: 1, background: 'rgba(196,163,90,0.18)', margin: '4px 0' }} />

      {/* Sign out */}
      <Tooltip label="Sign Out">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 40, height: 40, borderRadius: 11,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent',
            transition: 'background 0.18s',
          }}
          onHoverStart={e => {}}
        >
          <LogOut size={17} color="#F87171" strokeWidth={1.8} />
        </motion.button>
      </Tooltip>
    </div>
  );
}

/* ── Tooltip wrapper ───────────────────────────────────── */
function Tooltip({ label, children }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      onMouseEnter={e => {
        const tip = e.currentTarget.querySelector('[data-tip]');
        if (tip) tip.style.opacity = '1';
      }}
      onMouseLeave={e => {
        const tip = e.currentTarget.querySelector('[data-tip]');
        if (tip) tip.style.opacity = '0';
      }}
    >
      {children}
      <div
        data-tip
        style={{
          position: 'absolute',
          left: 'calc(100% + 10px)',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(10,22,8,0.95)',
          border: '1px solid rgba(74,155,63,0.3)',
          color: '#F5ECD7',
          fontSize: 12,
          fontWeight: 500,
          padding: '5px 10px',
          borderRadius: 8,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.15s',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          zIndex: 9999,
        }}
      >
        {label}
      </div>
    </div>
  );
}
