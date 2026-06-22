import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */
const INIT_PRODUCTS = [
  { id:1, name:"Netflix Premium 4K — 1 Month", cat:"Subscriptions", price:699, old:899, badge:"hot", emoji:"📺", grade:"★★★★★ (8.9k)", sales:8900, status:"active" },
  { id:2, name:"ChatGPT Plus GPT-4o — 1 Month", cat:"AI Tools", price:5999, old:0, badge:"ai", emoji:"💬", grade:"★★★★★ (5.6k)", sales:5600, status:"active" },
  { id:3, name:"PUBG Mobile UC — 1800 UC", cat:"Top Up", price:1799, old:1949, badge:"popular", emoji:"🎯", grade:"★★★★★ (9.4k)", sales:9400, status:"active" },
  { id:4, name:"MS Office 365 Personal — 1yr", cat:"Software", price:2499, old:3499, badge:"hot", emoji:"📄", grade:"★★★★★ (7.2k)", sales:7200, status:"active" },
  { id:5, name:"Spotify Premium — 3 Months", cat:"Subscriptions", price:499, old:699, badge:"sale", emoji:"🎵", grade:"★★★★☆ (4.1k)", sales:4100, status:"active" },
  { id:6, name:"Steam Wallet — $10 Global", cat:"Gift Cards", price:2999, old:3299, badge:"popular", emoji:"♻️", grade:"★★★★★ (6.8k)", sales:6800, status:"active" },
  { id:7, name:"Free Fire Diamonds — 1000", cat:"Top Up", price:1499, old:1699, badge:"hot", emoji:"🔥", grade:"★★★★★ (5.3k)", sales:5300, status:"active" },
  { id:8, name:"Valorant Elderflame Bundle", cat:"Game Items", price:7999, old:9499, badge:"new", emoji:"⚡", grade:"★★★★★ (2.1k)", sales:2100, status:"active" },
  { id:9, name:"Claude Pro — 1 Month", cat:"AI Tools", price:4999, old:0, badge:"ai", emoji:"🧠", grade:"★★★★★ (3.2k)", sales:3200, status:"active" },
  { id:10, name:"YouTube Premium — 3 Months", cat:"Subscriptions", price:599, old:899, badge:"sale", emoji:"▶️", grade:"★★★★☆ (6.5k)", sales:6500, status:"active" },
  { id:11, name:"Midjourney Basic — 1 Month", cat:"AI Tools", price:2999, old:3999, badge:"ai", emoji:"🎨", grade:"★★★★★ (2.8k)", sales:2800, status:"active" },
  { id:12, name:"PUBG UC — 8100 UC", cat:"Top Up", price:7999, old:8799, badge:"popular", emoji:"🎯", grade:"★★★★★ (4.7k)", sales:4700, status:"active" },
];

const INIT_ORDERS = [
  { id:"PB-2041", customer:"Ahmed Raza", email:"ahmed@gmail.com", product:"Netflix Premium 4K", amount:699, payment:"JazzCash", date:"2025-01-15", status:"delivered" },
  { id:"PB-2040", customer:"Sara Khan", email:"sara@gmail.com", product:"ChatGPT Plus GPT-4o", amount:5999, payment:"Stripe", date:"2025-01-15", status:"delivered" },
  { id:"PB-2039", customer:"Usman Ali", email:"usman@gmail.com", product:"PUBG UC 1800", amount:1799, payment:"Bank Alfalah", date:"2025-01-14", status:"active" },
  { id:"PB-2038", customer:"Fatima Noor", email:"fatima@gmail.com", product:"MS Office 365", amount:2499, payment:"Meezan Bank", date:"2025-01-14", status:"delivered" },
  { id:"PB-2037", customer:"Hassan Mehmood", email:"hassan@gmail.com", product:"Steam Wallet $10", amount:2999, payment:"JazzCash", date:"2025-01-13", status:"delivered" },
  { id:"PB-2036", customer:"Ayesha Siddiqui", email:"ayesha@gmail.com", product:"Claude Pro 1 Month", amount:4999, payment:"Stripe", date:"2025-01-12", status:"pending" },
  { id:"PB-2035", customer:"Bilal Ahmed", email:"bilal@gmail.com", product:"Spotify Premium 3mo", amount:499, payment:"JazzCash", date:"2025-01-11", status:"delivered" },
  { id:"PB-2034", customer:"Zainab Tariq", email:"zainab@gmail.com", product:"Free Fire Diamonds", amount:1499, payment:"Bank Alfalah", date:"2025-01-10", status:"refunded" },
  { id:"PB-2033", customer:"Ali Hussain", email:"ali@gmail.com", product:"Valorant Elderflame", amount:7999, payment:"Stripe", date:"2025-01-09", status:"delivered" },
  { id:"PB-2032", customer:"Mariam Javed", email:"mariam@gmail.com", product:"YouTube Premium 3mo", amount:599, payment:"Meezan Bank", date:"2025-01-08", status:"delivered" },
];

const CUSTOMERS = [
  { name:"Ahmed Raza", email:"ahmed@gmail.com", orders:12, spent:28400, joined:"2024-03-15" },
  { name:"Sara Khan", email:"sara@gmail.com", orders:8, spent:42300, joined:"2024-05-22" },
  { name:"Usman Ali", email:"usman@gmail.com", orders:15, spent:18700, joined:"2024-01-10" },
  { name:"Fatima Noor", email:"fatima@gmail.com", orders:5, spent:9800, joined:"2024-08-03" },
  { name:"Hassan Mehmood", email:"hassan@gmail.com", orders:9, spent:31200, joined:"2024-04-18" },
  { name:"Ayesha Siddiqui", email:"ayesha@gmail.com", orders:3, spent:14997, joined:"2024-11-07" },
  { name:"Bilal Ahmed", email:"bilal@gmail.com", orders:7, spent:8900, joined:"2024-06-29" },
  { name:"Zainab Tariq", email:"zainab@gmail.com", orders:4, spent:5996, joined:"2024-09-14" },
];

const REVENUE = [
  {m:"Jan",v:185000},{m:"Feb",v:242000},{m:"Mar",v:218000},{m:"Apr",v:310000},{m:"May",v:285000},{m:"Jun",v:368000},
  {m:"Jul",v:342000},{m:"Aug",v:425000},{m:"Sep",v:398000},{m:"Oct",v:478000},{m:"Nov",v:452000},{m:"Dec",v:540000},
];

const CATS = [
  { name:"Games", icon:"🎮", sub:"Steam · Xbox · PlayStation", badge:"HOT" },
  { name:"Gift Cards", icon:"🎁", sub:"All Regions · All Platforms" },
  { name:"Software", icon:"💻", sub:"Microsoft · Adobe · Security" },
  { name:"AI Tools", icon:"🤖", sub:"ChatGPT · Midjourney · Claude", badge:"NEW" },
  { name:"Subscriptions", icon:"📺", sub:"Netflix · Spotify · Game Pass" },
  { name:"Top Up", icon:"💎", sub:"UC · V-Bucks · Diamonds" },
  { name:"Game Items", icon:"⚔️", sub:"Skins · Weapons · Bundles" },
  { name:"Accounts", icon:"👤", sub:"High-Rank · OG Skins · Verified" },
];

/* ═══════════════════════════════════════════════════
   TOAST CONTEXT
   ═══════════════════════════════════════════════════ */
const ToastCtx = createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type) => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, msg, type: type || 'info' }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
  }, []);
  const icons = { success:'✅', info:'ℹ️', error:'❌' };
  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={'toast-item ' + t.type}>
            <span>{icons[t.type] || 'ℹ️'}</span><span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
function useToast() { return useContext(ToastCtx); }

/* ═══════════════════════════════════════════════════
   SCROLL TO TOP ON ROUTE CHANGE
   ═══════════════════════════════════════════════════ */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ═══════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════ */
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TICKER
   ═══════════════════════════════════════════════════ */
function Ticker() {
  const items = "🔥 Netflix 4K — PKR 699/mo   ⚡ ChatGPT Plus — PKR 5,999/mo   🎮 PUBG UC 1800 — PKR 1,799   💎 MS Office 365 — PKR 2,499/yr   ⚡ Valorant Points 475 — PKR 699   🤖 Midjourney Basic — PKR 2,999/mo   🎁 Steam Wallet $10 — PKR 2,999   🎯 Free Fire 1000 Diamonds — PKR 1,499";
  return (
    <div className="ticker-bar">
      <div className="ticker-inner">
        <span className="t-live"><span className="pulse-dot"></span>LIVE DEALS</span>
        <span>{items}</span>
        <span className="t-live"><span className="pulse-dot"></span>LIVE DEALS</span>
        <span>{items}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STORE HEADER — zero admin references
   ═══════════════════════════════════════════════════ */
function StoreHeader() {
  const toast = useToast();
  const coming = (msg) => () => toast(msg || 'Coming soon', 'info');
  const navItems = ['Games','Gift Cards','Software','AI Tools','Game Items','Accounts','Subscriptions','Top Up'];
  return (
    <header className="site-header">
      <div className="hud-c"><div className="hc hc-tl"></div><div className="hc hc-tr"></div><div className="hc hc-bl"></div><div className="hc hc-br"></div></div>
      <div className="header-top">
        <div className="header-top-inner">
          <div className="search-wrap">
            <div className="search-bar">
              <select className="search-category"><option>All</option><option>Games</option><option>AI Tools</option><option>Software</option><option>Gift Cards</option><option>Subscriptions</option><option>Top Up</option><option>Accounts</option></select>
              <span className="search-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
              <input className="search-input" type="text" placeholder="Search games, AI tools, subscriptions…" onKeyDown={e => { if (e.key === 'Enter') toast('Search coming soon','info'); }}/>
              <button className="search-btn" onClick={() => toast('Search coming soon','info')}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Search</button>
            </div>
          </div>
          <div className="top-actions">
            <button className="btn-icon" aria-label="Wishlist" onClick={coming('Wishlist coming soon')}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
            <button className="btn-text" onClick={coming('Sign in coming soon')}>Sign In</button>
            <button className="btn-gold" onClick={coming('Registration coming soon')}>✦ Join PlayBeat</button>
          </div>
        </div>
      </div>
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-digital">Digital</span>
          <div className="logo-wordmark"><span className="logo-play">play</span><span className="logo-beat">beat</span></div>
          <div className="logo-sub">Digital Pvt Ltd</div>
          <div className="logo-underline"></div>
        </Link>
        <nav className="main-nav">
          <Link to="/" className="nav-link active">Home</Link>
          {navItems.map(n => <span key={n} className="nav-link" onClick={coming(n + ' page coming soon')}>{n}</span>)}
          <div className="nav-sep"></div>
          <span className="nav-link nav-special" onClick={coming('Trending page coming soon')}>🔥 Trending</span>
          <span className="nav-link nav-outsource" onClick={coming('Global page coming soon')}>💎 Global</span>
        </nav>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════
   ADMIN HEADER — zero storefront elements
   ═══════════════════════════════════════════════════ */
function AdminHeader() {
  return (
    <header className="site-header">
      <div className="hud-c"><div className="hc hc-tl"></div><div className="hc hc-tr"></div><div className="hc hc-bl"></div><div className="hc hc-br"></div></div>
      <div className="header-top">
        <div className="header-top-inner" style={{justifyContent:'space-between'}}>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:'var(--yellow-400)',display:'flex',alignItems:'center',gap:'8px'}}>
            <span className="pulse-dot"></span>Admin Panel — Secure Area
          </div>
          <div className="top-actions">
            <Link to="/" className="btn-text">← Back to Store</Link>
          </div>
        </div>
      </div>
      <div className="header-inner">
        <Link to="/storeadmin" className="logo">
          <span className="logo-digital">Digital</span>
          <div className="logo-wordmark"><span className="logo-play">play</span><span className="logo-beat">beat</span></div>
          <div className="logo-sub">Admin Panel</div>
          <div className="logo-underline"></div>
        </Link>
        <nav className="main-nav">
          <Link to="/storeadmin" className="nav-link active">Dashboard</Link>
          <span className="nav-link" style={{color:'var(--text-muted)',cursor:'default'}}>Manage Products</span>
          <span className="nav-link" style={{color:'var(--text-muted)',cursor:'default'}}>View Orders</span>
          <span className="nav-link" style={{color:'var(--text-muted)',cursor:'default'}}>Customers</span>
        </nav>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER (storefront only)
   ═══════════════════════════════════════════════════ */
function StoreFooter() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const handleSub = () => {
    if (email && email.includes('@')) { toast('Subscribed successfully!','success'); setEmail(''); }
    else toast('Please enter a valid email','error');
  };
  const click = (msg) => () => toast(msg || 'Coming soon','info');
  return (
    <footer className="site-footer">
      <div className="f-hud"><div className="f-hc f-hc-tl"></div><div className="f-hc f-hc-tr"></div><div className="f-hc f-hc-bl"></div><div className="f-hc f-hc-br"></div></div>
      <div className="footer-inner">
        <div className="footer-banner">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-digital">Digital</span>
            <div className="footer-logo-wordmark"><span className="footer-logo-play">play</span><span className="footer-logo-beat">beat</span></div>
            <div className="footer-logo-pvt">Digital Pvt Ltd</div>
            <div className="footer-logo-line"></div>
            <p className="footer-tagline">Driven by <span className="ft-play">Play</span>, Defined by <span className="ft-beat">beat.</span></p>
          </Link>
          <div className="footer-support">
            <span className="support-label">Support</span>
            <a className="btn-support email" href="mailto:support@playbeat.gg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>Email</a>
            <a className="btn-support whatsapp" href="https://wa.me/923318333368" target="_blank" rel="noopener"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>WhatsApp</a>
            <a className="btn-support telegram" href="https://t.me/playbeat" target="_blank" rel="noopener"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>Telegram</a>
          </div>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-col-title">Marketplace</h3>
            <div className="footer-nav-grid">
              <Link to="/" className="footer-nav-link">🏠 Home</Link>
              <span className="footer-nav-link" onClick={click('Games page coming soon')}>🎮 Games</span>
              <span className="footer-nav-link" onClick={click('Gift Cards page coming soon')}>🎁 Gift Cards</span>
              <span className="footer-nav-link" onClick={click('Software page coming soon')}>💻 Software</span>
              <span className="footer-nav-link" onClick={click('AI Tools page coming soon')}>🤖 AI Tools</span>
              <span className="footer-nav-link" onClick={click('Game Items page coming soon')}>⚔️ Game Items</span>
              <span className="footer-nav-link" onClick={click('Accounts page coming soon')}>👤 Accounts</span>
              <span className="footer-nav-link" onClick={click('Subscriptions page coming soon')}>📺 Subscriptions</span>
              <span className="footer-nav-link" onClick={click('Top Up page coming soon')}>💎 Top Up</span>
              <span className="footer-nav-link special" onClick={click('Trending page coming soon')}>🔥 Trending</span>
            </div>
          </div>
          <div className="footer-col"><h3 className="footer-col-title">Discover</h3><ul className="footer-link-list"><li><span onClick={click()}>🔥 Trending</span></li><li><span onClick={click()}>💎 Best Value</span></li><li><span onClick={click()}>Contact Us</span></li></ul></div>
          <div className="footer-col"><h3 className="footer-col-title">Legal</h3><ul className="footer-link-list"><li><span onClick={click()}>Privacy Policy</span></li><li><span onClick={click()}>Terms of Service</span></li><li><span onClick={click()}>Refund Policy</span></li></ul></div>
          <div className="footer-col">
            <h3 className="footer-col-title">Newsletter</h3>
            <p style={{fontFamily:"'Exo 2',sans-serif",fontSize:'11.5px',color:'var(--text-muted)',lineHeight:1.75,marginBottom:'14px'}}>Exclusive deals, flash sales, and new arrivals straight to your inbox.</p>
            <div style={{display:'flex',border:'1px solid rgba(245,200,66,.22)',borderRadius:'4px',overflow:'hidden'}}>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{flex:1,background:'rgba(6,12,36,.85)',border:'none',color:'var(--text-primary)',fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'.8px',padding:'9px 12px',outline:'none'}}/>
              <button onClick={handleSub} style={{background:'linear-gradient(135deg,var(--yellow-600),var(--yellow-400),var(--yellow-300))',border:'none',color:'var(--navy-900)',padding:'9px 14px',fontFamily:"'Share Tech Mono',monospace",fontSize:'9px',letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700}}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} <strong>PlayBeat Digital (Pvt) Ltd</strong> — All rights reserved. Prices in PKR. Reg. No. 00681011050474</p>
          <nav className="footer-legal-links"><span>Privacy</span><span>·</span><span>Terms</span><span>·</span><span>Refunds</span><span>·</span><span>Contact</span></nav>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   STOREFRONT PAGE
   ═══════════════════════════════════════════════════ */
function Storefront({ products }) {
  const toast = useToast();
  const [nlEmail, setNlEmail] = useState('');
  const trending = products.slice(0, 8);
  const handleNl = () => {
    if (nlEmail && nlEmail.includes('@')) { toast('Subscribed!','success'); setNlEmail(''); }
    else toast('Enter a valid email','error');
  };
  const badgeMap = { hot:'HOT', new:'NEW', popular:'POPULAR', ai:'AI HOT', sale:'SALE' };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow"><span className="pulse-dot"></span>Heaven of Digital Products</div>
            <h1><span className="line-silver">Instant Digital</span><span className="line-yellow">Delivery in PKR</span></h1>
            <p className="hero-sub">Games, AI tools, software, gift cards &amp; subscriptions — all at Pakistani prices. JazzCash, Stripe, Bank Alfalah &amp; Meezan Bank accepted.</p>
            <div className="hero-ctas">
              <button className="cta-primary" onClick={() => document.getElementById('feat-section')?.scrollIntoView({behavior:'smooth'})}>🔥 Shop Now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
              <button className="cta-secondary" onClick={() => toast('AI Tools page coming soon','info')}>🤖 AI Tools</button>
            </div>
            <div className="hero-trust">
              <div className="h-trust-pill"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Instant Delivery</div>
              <div className="h-trust-pill"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Buyer Protection</div>
              <div className="h-trust-pill"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>24/7 Support</div>
              <div className="h-trust-pill"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>PKR Pricing</div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-label"><span className="hp-live"></span>Live Store Stats</div>
            <div className="hero-stat-grid">
              <div className="hs-card"><div className="hs-val">50k+</div><div className="hs-label">Happy Customers</div></div>
              <div className="hs-card"><div className="hs-val">500+</div><div className="hs-label">Products</div></div>
              <div className="hs-card"><div className="hs-val">⚡</div><div className="hs-label">Instant Delivery</div></div>
              <div className="hs-card"><div className="hs-val">4.9★</div><div className="hs-label">Avg. Rating</div></div>
            </div>
            <div className="pay-row">
              <div className="pay-label">Accepted Payments</div>
              <div className="pay-icons">
                <div className="pay-icon stripe"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Stripe</div>
                <div className="pay-icon jazz">📱 JazzCash</div>
                <div className="pay-icon alfalah">🏦 Alfalah</div>
                <div className="pay-icon meezan">🕌 Meezan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="section" style={{paddingTop:'3.5rem',paddingBottom:'2rem'}}>
        <div className="section-header">
          <div><div className="section-eyebrow">Browse by Category</div><h2 className="section-title">Everything Digital</h2></div>
          <span className="section-link" onClick={() => toast('Full catalog coming soon','info')}>View all <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></span>
        </div>
        <div className="nav-cards">
          {CATS.map(c => (
            <div key={c.name} className="nav-card" onClick={() => toast(c.name + ' page coming soon','info')}>
              <div className="nc-icon">{c.icon}</div>
              <div className="nc-name">{c.name}</div>
              <div className="nc-count">{c.sub}</div>
              {c.badge && <div className="nc-badge">{c.badge}</div>}
              <div className="nc-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="trending-section">
        <div className="trending-inner">
          <div className="trending-header"><span className="trending-badge">🔥 Trending</span><span className="trending-title">What Pakistan is Buying Right Now</span></div>
          <div className="trending-cards">
            {trending.map((p, i) => (
              <div key={p.id} className="trend-card" onClick={() => toast('Product page coming soon','info')}>
                <span className="trend-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="trend-emoji">{p.emoji}</span>
                <div className="trend-info"><div className="trend-name">{p.name}</div><div className="trend-price">PKR {p.price.toLocaleString()}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="section" id="feat-section">
        <div className="flash-banner">
          <span className="flash-icon">⚡</span>
          <div className="flash-text">
            <div className="flash-label">Flash Deal — Limited Time</div>
            <div className="flash-title">Up to 40% Off on AI Tools</div>
            <div className="flash-sub">ChatGPT Plus, Claude Pro, Midjourney &amp; more — all at record low PKR prices</div>
          </div>
          <button className="flash-cta" onClick={() => toast('AI Tools page coming soon','info')}>Grab Deals →</button>
        </div>
        <div className="section-header" style={{marginTop:'2.5rem'}}>
          <div><div className="section-eyebrow">Editor's Picks</div><h2 className="section-title">Featured Products</h2></div>
          <span className="section-link" onClick={() => toast('Full catalog coming soon','info')}>See all trending →</span>
        </div>
        <div className="featured-grid">
          {products.map(p => (
            <div key={p.id} className="prod-card" onClick={() => toast('Product page coming soon','info')}>
              <span className={'prod-badge ' + p.badge}>{badgeMap[p.badge] || 'HOT'}</span>
              <div className="prod-thumb">{p.emoji}</div>
              <div className="prod-body">
                <div className="prod-cat">{p.cat}</div>
                <div className="prod-name">{p.name}</div>
                <div className="prod-grade">{p.grade}</div>
                <div className="prod-foot">
                  <div><span className="prod-price">PKR {p.price.toLocaleString()}</span>{p.old ? <span className="prod-old">PKR {p.old.toLocaleString()}</span> : null}</div>
                  <button className="prod-cart-btn" onClick={e => { e.stopPropagation(); toast(p.name + ' — PKR ' + p.price.toLocaleString() + ' added to cart','success'); }}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="promo-pair">
          <div className="promo-card silver" onClick={() => toast('AI Tools page coming soon','info')}>
            <span className="promo-icon">🤖</span><div className="promo-tag">New Arrivals</div><div className="promo-title">AI Tools at PKR Prices</div><p className="promo-sub">ChatGPT Plus, Claude Pro, Midjourney, Gemini Advanced — all major AI subscriptions delivered instantly.</p><span className="promo-btn">Browse AI Tools →</span>
          </div>
          <div className="promo-card yellow" onClick={() => toast('Subscriptions page coming soon','info')}>
            <span className="promo-icon">📺</span><div className="promo-tag">Best Value</div><div className="promo-title">Streaming from PKR 199</div><p className="promo-sub">Netflix, Spotify, YouTube Premium, Disney+ — all at the lowest PKR prices in Pakistan.</p><span className="promo-btn">Shop Subscriptions →</span>
          </div>
        </div>
      </div>

      {/* Why PlayBeat */}
      <div className="why-section">
        <div className="why-inner">
          <div style={{textAlign:'center'}}><div className="section-eyebrow" style={{justifyContent:'center',display:'flex'}}>Why Choose Us</div><h2 className="section-title" style={{textAlign:'center',marginTop:'8px'}}>Built for Pakistan Gamers</h2></div>
          <div className="why-grid">
            <div className="why-card"><div className="why-icon">⚡</div><div className="why-title">Instant Delivery</div><p className="why-desc">Your keys and codes arrive the moment payment clears — no waiting, no delays.</p></div>
            <div className="why-card"><div className="why-icon">💳</div><div className="why-title">Pay in PKR</div><p className="why-desc">JazzCash, Bank Alfalah, Meezan Bank &amp; Stripe — no forex headaches.</p></div>
            <div className="why-card"><div className="why-icon">🛡️</div><div className="why-title">Buyer Protection</div><p className="why-desc">Every purchase is covered. If something's wrong, we make it right — guaranteed.</p></div>
            <div className="why-card"><div className="why-icon">💬</div><div className="why-title">24/7 Support</div><p className="why-desc">WhatsApp, Telegram, or Email — our team is always on standby for you.</p></div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter-section">
        <div className="newsletter-box">
          <div className="nl-text"><div className="nl-title">Get Exclusive Deals</div><p className="nl-sub">Flash sales, new arrivals, and weekly PKR deals — straight to your inbox.</p></div>
          <div className="nl-form">
            <input className="nl-input" type="email" value={nlEmail} onChange={e => setNlEmail(e.target.value)} placeholder="your@email.com"/>
            <button className="nl-btn" onClick={handleNl}>Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   ADMIN DASHBOARD
   ═══════════════════════════════════════════════════ */
function Admin({ products, orders, setProducts }) {
  const toast = useToast();
  const [sec, setSec] = useState('overview');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const totalRev = orders.reduce((s, o) => s + o.amount, 0);
  const maxRev = Math.max(...REVENUE.map(d => d.v));
  const topProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5);
  const topMax = topProducts[0] ? topProducts[0].sales : 1;

  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const openAdd = () => { setForm({ name:'', cat:'Games', status:'active', price:'', old:'', badge:'hot', emoji:'📦' }); setModal({ type:'add' }); };
  const openEdit = (p) => { setForm({ name:p.name, cat:p.cat, status:p.status, price:p.price, old:p.old||'', badge:p.badge, emoji:p.emoji }); setModal({ type:'edit', product:p }); };
  const openDel = (p) => setModal({ type:'delete', product:p });
  const close = () => setModal(null);

  const save = () => {
    if (!form.name || !form.name.trim()) { toast('Product name required','error'); return; }
    const d = { name:form.name.trim(), cat:form.cat, status:form.status, price:parseInt(form.price)||0, old:parseInt(form.old)||0, badge:form.badge, emoji:form.emoji||'📦' };
    if (modal.type === 'edit') {
      setProducts(prev => prev.map(x => x.id === modal.product.id ? { ...x, ...d } : x));
      toast('"' + d.name + '" updated','success');
    } else {
      setProducts(prev => [...prev, { id:Math.max(...prev.map(x => x.id), 0) + 1, ...d, grade:'★★★★★ (0)', sales:0 }]);
      toast('"' + d.name + '" added','success');
    }
    close();
  };

  const del = () => {
    setProducts(prev => prev.filter(x => x.id !== modal.product.id));
    toast('Product deleted','success');
    close();
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.cat.toLowerCase().includes(search.toLowerCase())
  );

  const SP = ({ s }) => <span className={'status-pill ' + s}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="as-label">Overview</div>
        <button className={'as-item' + (sec === 'overview' ? ' active' : '')} onClick={() => { setSec('overview'); setSearch(''); }}><span>📊</span> Dashboard</button>
        <div className="as-label">Management</div>
        <button className={'as-item' + (sec === 'products' ? ' active' : '')} onClick={() => { setSec('products'); setSearch(''); }}><span>📦</span> Products <span className="as-badge">{products.length}</span></button>
        <button className={'as-item' + (sec === 'orders' ? ' active' : '')} onClick={() => { setSec('orders'); setSearch(''); }}><span>🧾</span> Orders <span className="as-badge">3</span></button>
        <button className={'as-item' + (sec === 'customers' ? ' active' : '')} onClick={() => setSec('customers')}><span>👥</span> Customers</button>
        <div className="as-label">System</div>
        <button className={'as-item' + (sec === 'settings' ? ' active' : '')} onClick={() => setSec('settings')}><span>⚙️</span> Store Settings</button>
      </aside>

      <div className="admin-main">
        {/* OVERVIEW */}
        {sec === 'overview' && <>
          <div className="am-header"><h2>Dashboard</h2><p>PlayBeat Digital store performance overview</p></div>
          <div className="stats-row">
            <div className="stat-card"><div className="sc-icon">💰</div><div className="sc-val">PKR {totalRev.toLocaleString()}</div><div className="sc-label">Total Revenue</div><div className="sc-change up">▲ 14.2% this month</div></div>
            <div className="stat-card"><div className="sc-icon">🧾</div><div className="sc-val">{orders.length}</div><div className="sc-label">Total Orders</div><div className="sc-change up">▲ 8.7% this month</div></div>
            <div className="stat-card"><div className="sc-icon">📦</div><div className="sc-val">{products.filter(p => p.status === 'active').length}</div><div className="sc-label">Active Products</div><div className="sc-change up">▲ 5 new this week</div></div>
            <div className="stat-card"><div className="sc-icon">👥</div><div className="sc-val">1,247</div><div className="sc-label">Customers</div><div className="sc-change down">▼ 1.8% this month</div></div>
          </div>
          <div className="chart-area">
            <div className="chart-card"><h3>Revenue — Last 12 Months (PKR)</h3><div className="chart-bars">{REVENUE.map(d => <div key={d.m} className="cb-wrap"><div className="cb-bar" style={{height: (d.v / maxRev * 100) + '%'}}></div><span className="cb-label">{d.m}</span></div>)}</div></div>
            <div className="chart-card"><h3>Top Products</h3><ul className="top-list">{topProducts.map((p, i) => <li key={p.id}><span className={'tl-rank' + (i < 3 ? ' top' : '')}>{i + 1}</span><span className="tl-name">{p.name}</span><div className="tl-bar"><div className="tl-bar-fill" style={{width: (p.sales / topMax * 100) + '%'}}></div></div><span className="tl-val">{(p.sales / 1000).toFixed(1)}k</span></li>)}</ul></div>
          </div>
          <div className="admin-table-wrap">
            <div className="atw-head"><h3>Recent Orders</h3><button className="btn-modal ghost" onClick={() => setSec('orders')} style={{fontSize:'9px'}}>View All →</button></div>
            <div style={{overflowX:'auto'}}><table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Amount</th><th>Payment</th><th>Status</th></tr></thead>
              <tbody>{orders.slice(0, 5).map(o => <tr key={o.id}><td style={{fontWeight:600,fontFamily:"'Share Tech Mono',monospace",fontSize:'12px'}}>{o.id}</td><td>{o.customer}</td><td>{o.product}</td><td style={{fontWeight:600,color:'var(--yellow-300)'}}>PKR {o.amount.toLocaleString()}</td><td>{o.payment}</td><td><SP s={o.status}/></td></tr>)}</tbody>
            </table></div>
          </div>
        </>}

        {/* PRODUCTS */}
        {sec === 'products' && <>
          <div className="am-header" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px'}}>
            <div><h2>Products</h2><p>Add, edit, and manage your product catalog</p></div>
            <button className="btn-modal primary" onClick={openAdd}>+ Add Product</button>
          </div>
          <div className="admin-table-wrap">
            <div className="atw-head"><h3>All Products</h3><input className="atw-search" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}/></div>
            <div style={{overflowX:'auto'}}><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Sales</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{filtered.map(p => <tr key={p.id}>
                <td><div style={{display:'flex',alignItems:'center',gap:'10px'}}><span style={{fontSize:'24px'}}>{p.emoji}</span><div style={{fontWeight:600,color:'var(--silver-100)'}}>{p.name}</div></div></td>
                <td>{p.cat}</td>
                <td style={{fontWeight:600,color:'var(--yellow-300)',fontFamily:"'Share Tech Mono',monospace"}}>PKR {p.price.toLocaleString()}</td>
                <td style={{fontFamily:"'Share Tech Mono',monospace"}}>{p.sales.toLocaleString()}</td>
                <td><SP s={p.status}/></td>
                <td><div className="tbl-actions"><button onClick={() => openEdit(p)}>✏️</button><button className="del" onClick={() => openDel(p)}>🗑️</button></div></td>
              </tr>)}</tbody>
            </table></div>
          </div>
        </>}

        {/* ORDERS */}
        {sec === 'orders' && <>
          <div className="am-header"><h2>Orders</h2><p>Track and manage all customer orders</p></div>
          <div className="admin-table-wrap"><div className="atw-head"><h3>All Orders</h3><input className="atw-search" placeholder="Search orders…"/></div>
            <div style={{overflowX:'auto'}}><table><thead><tr><th>Order ID</th><th>Customer</th><th>Email</th><th>Product</th><th>Amount</th><th>Payment</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>{orders.map(o => <tr key={o.id}><td style={{fontWeight:600,fontFamily:"'Share Tech Mono',monospace",fontSize:'12px'}}>{o.id}</td><td>{o.customer}</td><td style={{color:'var(--text-muted)',fontSize:'12px'}}>{o.email}</td><td>{o.product}</td><td style={{fontWeight:600,color:'var(--yellow-300)'}}>PKR {o.amount.toLocaleString()}</td><td>{o.payment}</td><td style={{color:'var(--text-muted)',fontSize:'12px'}}>{o.date}</td><td><SP s={o.status}/></td></tr>)}</tbody>
            </table></div>
          </div>
        </>}

        {/* CUSTOMERS */}
        {sec === 'customers' && <>
          <div className="am-header"><h2>Customers</h2><p>Your customer base and purchase history</p></div>
          <div className="admin-table-wrap"><div className="atw-head"><h3>All Customers</h3><input className="atw-search" placeholder="Search customers…"/></div>
            <div style={{overflowX:'auto'}}><table><thead><tr><th>Customer</th><th>Email</th><th>Orders</th><th>Total Spent</th><th>Joined</th></tr></thead>
              <tbody>{CUSTOMERS.map((c, i) => <tr key={i}><td style={{fontWeight:600,color:'var(--silver-100)'}}>{c.name}</td><td style={{color:'var(--text-muted)',fontSize:'12px'}}>{c.email}</td><td>{c.orders}</td><td style={{fontWeight:600,color:'var(--yellow-300)',fontFamily:"'Share Tech Mono',monospace"}}>PKR {c.spent.toLocaleString()}</td><td style={{color:'var(--text-muted)',fontSize:'12px'}}>{c.joined}</td></tr>)}</tbody>
            </table></div>
          </div>
        </>}

        {/* SETTINGS */}
        {sec === 'settings' && <>
          <div className="am-header"><h2>Store Settings</h2><p>Configure your PlayBeat Digital store</p></div>
          <div className="settings-card">
            <div className="fg"><label>Store Name</label><input type="text" defaultValue="PlayBeat Digital"/></div>
            <div className="fg"><label>Store Description</label><textarea defaultValue="Pakistan's #1 Digital Marketplace — Games, AI Tools, Software, Gift Cards & Subscriptions at PKR prices."></textarea></div>
            <div className="fg-row">
              <div className="fg"><label>Default Currency</label><select defaultValue="PKR"><option>PKR</option><option>USD</option></select></div>
              <div className="fg"><label>Timezone</label><select defaultValue="Asia/Karachi"><option>Asia/Karachi (UTC+5)</option><option>UTC</option></select></div>
            </div>
            <div className="fg"><label>WhatsApp Support Number</label><input type="text" defaultValue="+92 331 8333368"/></div>
            <div className="fg"><label>Support Email</label><input type="email" defaultValue="support@playbeat.gg"/></div>
            <div style={{marginTop:'20px',display:'flex',gap:'10px'}}>
              <button className="btn-modal primary" onClick={() => toast('Settings saved','success')}>Save Changes</button>
              <button className="btn-modal ghost" onClick={() => toast('Settings reset to defaults','info')}>Reset Defaults</button>
            </div>
          </div>
        </>}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modal && (modal.type === 'add' || modal.type === 'edit')} onClose={close}>
        <div className="modal-head"><h3>{modal && modal.type === 'edit' ? 'Edit Product' : 'Add Product'}</h3><button className="btn-modal ghost" onClick={close} style={{padding:'6px 10px'}}>✕</button></div>
        <div className="modal-body">
          <div className="fg"><label>Product Name</label><input type="text" value={form.name || ''} onChange={e => sf('name', e.target.value)}/></div>
          <div className="fg-row">
            <div className="fg"><label>Category</label><select value={form.cat || 'Games'} onChange={e => sf('cat', e.target.value)}>{['Games','Gift Cards','Software','AI Tools','Subscriptions','Top Up','Game Items','Accounts'].map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label>Status</label><select value={form.status || 'active'} onChange={e => sf('status', e.target.value)}><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option></select></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label>Price (PKR)</label><input type="number" value={form.price || ''} onChange={e => sf('price', e.target.value)} min="0"/></div>
            <div className="fg"><label>Original Price (PKR)</label><input type="number" value={form.old || ''} onChange={e => sf('old', e.target.value)} min="0"/></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label>Badge</label><select value={form.badge || 'hot'} onChange={e => sf('badge', e.target.value)}>{['hot','new','popular','ai','sale'].map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}</select></div>
            <div className="fg"><label>Emoji Icon</label><input type="text" value={form.emoji || '📦'} onChange={e => sf('emoji', e.target.value)} maxLength="4"/></div>
          </div>
        </div>
        <div className="modal-foot"><button className="btn-modal ghost" onClick={close}>Cancel</button><button className="btn-modal primary" onClick={save}>{modal && modal.type === 'edit' ? 'Save Changes' : 'Add Product'}</button></div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={modal && modal.type === 'delete'} onClose={close}>
        <div className="modal-head"><h3>Delete Product</h3><button className="btn-modal ghost" onClick={close} style={{padding:'6px 10px'}}>✕</button></div>
        <div className="modal-body"><p style={{color:'var(--text-secondary)',lineHeight:1.7}}>Are you sure you want to delete <strong style={{color:'#fff'}}>"{modal ? modal.product.name : ''}"</strong>? This action cannot be undone.</p></div>
        <div className="modal-foot"><button className="btn-modal ghost" onClick={close}>Cancel</button><button className="btn-modal danger" onClick={del}>Delete</button></div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   APP — Route definitions
   ═══════════════════════════════════════════════════ */
export default function App() {
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [orders] = useState(INIT_ORDERS);

  const storePage = (
    <>
      <Ticker />
      <StoreHeader />
      <Storefront products={products} />
      <StoreFooter />
    </>
  );

  return (
    <ToastProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={storePage} />
        <Route path="/digital-products" element={storePage} />
        <Route path="/storeadmin" element={<><AdminHeader /><Admin products={products} orders={orders} setProducts={setProducts} /></>} />
        <Route path="*" element={storePage} />
      </Routes>
    </ToastProvider>
  );
}
