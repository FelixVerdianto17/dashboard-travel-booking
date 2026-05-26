import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Plane,
  LayoutDashboard,
  CalendarCheck,
  Globe,
  KeyRound,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/bookings',  icon: CalendarCheck,   label: 'Bookings'  },
  { to: '/',          icon: Globe,           label: 'Public Home' },
  { to: '/login',     icon: KeyRound,        label: 'Re-Authenticate' },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user    = useAuthStore((state) => state.user);
  const logout  = useAuthStore((state) => state.logout);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /* ── shared nav link style factory ── */
  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: isActive ? 'var(--accent)' : 'var(--text)',
    background: isActive ? 'var(--accent-bg)' : 'transparent',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  });

  /* ── icon-only link style (tablet) ── */
  const iconLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    borderRadius: '8px',
    color: isActive ? 'var(--accent)' : 'var(--text)',
    background: isActive ? 'var(--accent-bg)' : 'transparent',
    textDecoration: 'none',
    transition: 'all 0.2s',
  });

  /* ── Sidebar inner content (reused in both desktop/tablet and mobile drawer) ── */
  const SidebarContent = ({ compact = false }) => (
    <>
      {/* Brand */}
      <div className={compact ? 'flex justify-center' : ''}>
        {compact ? (
          <Plane className="h-6 w-6" style={{ color: 'var(--accent)' }} />
        ) : (
          <>
            <NavLink
              to="/"
              style={{
                fontSize: '20px', fontWeight: '700', color: 'var(--text-h)',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}
            >
              <Plane className="h-5 w-5" style={{ color: 'var(--accent)' }} />
              Wanderlust
            </NavLink>
            <div style={{ fontSize: '12px', color: 'var(--text)', marginTop: '4px', opacity: 0.8 }}>
              Partner Portal
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flexGrow: 1 }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              {compact ? (
                <NavLink
                  to={to}
                  style={iconLinkStyle}
                  title={label}
                  className="hover:bg-slate-500/5 hover:text-[var(--text-h)] transition-all duration-200"
                >
                  <Icon className="h-5 w-5" />
                </NavLink>
              ) : (
                <NavLink
                  to={to}
                  style={linkStyle}
                  className="hover:bg-slate-500/5 hover:text-[var(--text-h)] transition-all duration-200"
                >
                  <Icon className="h-4 w-4 flex-shrink-0" /> {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {!compact && (
          <div style={{ fontSize: '13px' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-h)' }}>{user?.name || 'Explorer Account'}</div>
            <div style={{ color: 'var(--text)', fontSize: '12px', wordBreak: 'break-all' }}>{user?.email || 'explorer@wanderlust.com'}</div>
          </div>
        )}
        <button
          onClick={handleLogout}
          title="Logout"
          className={`flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/30 transition-all duration-200 cursor-pointer ${compact ? 'w-full' : 'w-full'}`}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!compact && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div
      style={{ display: 'flex', minHeight: '100vh', width: '100%', background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* ═══════════════════════════════════════════
          MOBILE DRAWER BACKDROP
      ═══════════════════════════════════════════ */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ═══════════════════════════════════════════
          MOBILE SLIDE-IN DRAWER  (< lg)
      ═══════════════════════════════════════════ */}
      <aside
        className="lg:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          zIndex: 50,
          background: 'var(--social-bg)',
          borderRight: '1px solid var(--border)',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          boxSizing: 'border-box',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        aria-label="Mobile navigation"
      >
        {/* Close button inside drawer */}
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-500/10 text-[var(--text)] transition-colors"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        <SidebarContent compact={false} />
      </aside>

      {/* ═══════════════════════════════════════════
          TABLET ICON SIDEBAR  (md → lg)
      ═══════════════════════════════════════════ */}
      <aside
        className="hidden md:flex lg:hidden"
        style={{
          width: '72px',
          borderRight: '1px solid var(--border)',
          padding: '24px 8px',
          flexDirection: 'column',
          gap: '32px',
          boxSizing: 'border-box',
          background: 'var(--social-bg)',
          flexShrink: 0,
        }}
        aria-label="Tablet navigation"
      >
        <SidebarContent compact={true} />
      </aside>

      {/* ═══════════════════════════════════════════
          DESKTOP FULL SIDEBAR  (≥ lg)
      ═══════════════════════════════════════════ */}
      <aside
        className="hidden lg:flex"
        style={{
          width: '260px',
          borderRight: '1px solid var(--border)',
          padding: '32px 24px',
          flexDirection: 'column',
          gap: '40px',
          boxSizing: 'border-box',
          background: 'var(--social-bg)',
          flexShrink: 0,
        }}
        aria-label="Desktop navigation"
      >
        <SidebarContent compact={false} />
      </aside>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════════════════ */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Mobile top navbar */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-3 border-b"
          style={{
            background: 'var(--social-bg)',
            borderColor: 'var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-500/10 text-[var(--text)] transition-colors"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <Menu className="h-5 w-5" />
          </button>

          <NavLink
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontWeight: '700', fontSize: '16px', color: 'var(--text-h)', textDecoration: 'none',
            }}
          >
            <Plane className="h-4 w-4" style={{ color: 'var(--accent)' }} />
            Wanderlust
          </NavLink>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        {/* Page content */}
        <main
          style={{
            flexGrow: 1,
            padding: 'clamp(16px, 4vw, 40px)',
            boxSizing: 'border-box',
            overflowY: 'auto',
            textAlign: 'left',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

