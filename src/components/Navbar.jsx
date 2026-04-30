import { useState, useEffect } from "react";
import {
  HeartPulse, Menu, X, ChevronDown, Calendar,
  Users, BarChart2, Brain, ArrowRight, Plus
} from "lucide-react";


const PRODUCTS = [
  { icon: Calendar, label: "Smart Scheduling", desc: "AI-powered bookings", color: "#0ea5e9", page: "appointments" },
  { icon: Users, label: "Patient Management", desc: "Complete dental records", color: "#8b5cf6", page: "patients" },
  { icon: BarChart2, label: "Analytics Suite", desc: "Revenue & insights", color: "#10b981", page: "dashboard" },
  { icon: Brain, label: "AI Diagnosis Tools", desc: "Clinical intelligence", color: "#f59e0b", page: "dashboard" },
];

export default function Navbar({ page, setPage, isLoggedIn, setIsLoggedIn }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboard = ["dashboard", "appointments", "patients"].includes(page);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Dashboard top-bar ─────────────────────────────────────────────────── */
  if (isDashboard) {
    return (
      <div style={{ height: 64 }}>
        <div style={{
          position: "fixed", top: 0, left: 260, right: 0, height: 64, zIndex: 100,
          background: "rgba(15,23,42,0.96)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 28px",
        }}>
          <div style={{ position: "relative" }}>
            <input
              className="input input-dark"
              style={{ paddingLeft: 38, width: 280, height: 38, fontSize: 13 }}
              placeholder="Search patients, appointments…"
            />
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="btn btn-ghost"
              style={{ fontSize: 13, padding: "7px 14px", borderRadius: 9 }}
              onClick={() => setPage("appointments")}
            >
              <Plus size={14} /> New Appointment
            </button>
            <div
              style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                position: "relative"
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <div style={{
                position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%",
                background: "#0ea5e9", border: "1.5px solid #0f172a"
              }} />
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}
              onClick={() => setPage("landing")}
            >
              <div className="avatar" style={{ background: "linear-gradient(135deg,#0284c7,#8b5cf6)", color: "#fff", fontSize: 12 }}>AD</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>Admin</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>ClinicFlow Pro</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Public navbar ─────────────────────────────────────────────────────── */
  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 150,
    transition: "all 0.3s ease",
    background: scrolled ? "rgba(15,23,42,0.94)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
    padding: "0 24px",
  };

  return (
    <>
      <nav style={navStyle} aria-label="Main navigation">
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }} onClick={() => setPage("landing")}>
            <div style={{
              width: 36, height: 36, borderRadius: 11,
              background: "linear-gradient(135deg,#0284c7,#0ea5e9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(14,165,233,0.4)"
            }}>
              <HeartPulse size={19} color="#ffffffff" />
            </div>
            <span className="font-display" style={{ fontSize: 20, fontWeight: 400, color: "#fff", letterSpacing: "-0.01em" }}>
              ClinicFlow
            </span>
          </div>

          {/* Nav links */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[
              { label: "Products", hasDrop: true },
              { label: "Solutions", page: "pricing" },
              { label: "Pricing", page: "pricing" },
              { label: "Contact", page: "contact" },
            ].map(item => (
              <div key={item.label} style={{ position: "relative" }}>
                <button
                  className="nav-link"
                  onClick={() => item.hasDrop ? setDropdown(dropdown === item.label ? null : item.label) : setPage(item.page)}
                  onBlur={() => setTimeout(() => setDropdown(null), 160)}
                >
                  {item.label}
                  {item.hasDrop && (
                    <ChevronDown size={13} style={{
                      marginLeft: 3, transition: "transform 0.2s",
                      transform: dropdown === item.label ? "rotate(180deg)" : "rotate(0)"
                    }} />
                  )}
                </button>
                {item.hasDrop && dropdown === item.label && (
                  <div className="dropdown">
                    <div style={{ padding: "4px 9px 7px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Platform
                    </div>
                    {PRODUCTS.map(p => (
                      <div
                        key={p.label}
                        className="dropdown-item"
                        onClick={() => { setPage(p.page); setDropdown(null); }}
                      >
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <p.icon size={15} color={p.color} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: "#e2e8f0" }}>{p.label}</div>
                          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.42)" }}>{p.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isLoggedIn ? (
              <button className="btn btn-primary" style={{ fontSize: 13.5 }} onClick={() => setPage("dashboard")}>
                Go to Dashboard <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <button className="nav-link" onClick={() => setPage("login")}>Log in</button>
                <button className="btn btn-primary pulse" style={{ fontSize: 13.5 }} onClick={() => setPage("signup")}>
                  Get Started <ArrowRight size={14} />
                </button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="btn btn-ghost show-mobile"
            style={{ padding: "8px", borderRadius: 9 }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#0284c7,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <HeartPulse size={16} color="#fff" />
              </div>
              <span className="font-display" style={{ fontSize: 18, color: "#fff" }}>ClinicFlow</span>
            </div>
            <button className="btn btn-ghost" style={{ padding: 8, borderRadius: 9 }} onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>
          {["Products", "Solutions", "Pricing", "Contact"].map(l => (
            <div
              key={l}
              style={{ padding: "15px 0", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: 17, fontWeight: 500, cursor: "pointer", color: "rgba(255,255,255,0.82)" }}
              onClick={() => { setPage(l.toLowerCase()); setMobileOpen(false); }}
            >
              {l}
            </div>
          ))}
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            <button className="btn btn-ghost" style={{ width: "100%", padding: "13px", borderRadius: 12, fontSize: 15 }} onClick={() => { setPage("login"); setMobileOpen(false); }}>Log in</button>
            <button className="btn btn-primary" style={{ width: "100%", padding: "13px", borderRadius: 12, fontSize: 15 }} onClick={() => { setPage("signup"); setMobileOpen(false); }}>Get Started Free</button>
          </div>
        </div>
      )}
    </>
  );
}
