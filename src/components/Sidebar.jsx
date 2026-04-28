import { Home, Calendar, Users, BarChart2, FileText, CreditCard, Settings, DollarSign, LogOut, HeartPulse } from "lucide-react";

const NAV_ITEMS = [
  { icon: Home,      label: "Dashboard",    key: "dashboard" },
  { icon: Calendar,  label: "Appointments", key: "appointments" },
  { icon: Users,     label: "Patients",     key: "patients" },
  { icon: BarChart2, label: "Analytics",    key: "dashboard" },
  { icon: FileText,  label: "Reports",      key: "dashboard" },
  { icon: CreditCard,label: "Billing",      key: "dashboard" },
  { icon: Settings,  label: "Settings",     key: "dashboard" },
];

export default function Sidebar({ page, setPage, setIsLoggedIn }) {
  return (
    <div style={{
      position: "fixed", left: 0, top: 0, bottom: 0, width: 260,
      background: "rgba(15,23,42,0.98)", borderRight: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(20px)", display: "flex", flexDirection: "column",
      padding: "0 12px 16px", zIndex: 101,
    }}>
      {/* Brand */}
      <div style={{ height:64,display:"flex",alignItems:"center",gap:9,padding:"0 6px",marginBottom:8 }}>
        <div style={{
          width:32,height:32,borderRadius:9,
          background:"linear-gradient(135deg,#0284c7,#0ea5e9)",
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
          boxShadow:"0 4px 12px rgba(14,165,233,0.35)"
        }}>
          <HeartPulse size={16} color="#fff"/>
        </div>
        <span className="font-display" style={{ fontSize:18,color:"#fff" }}>ClinicFlow</span>
      </div>

      {/* Section label */}
      <div style={{ padding:"4px 6px 11px",fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.08em" }}>
        Main Menu
      </div>

      {/* Nav */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:2 }}>
        {NAV_ITEMS.map(item => {
          const isActive =
            (page === item.key && item.key !== "dashboard") ||
            (page === "dashboard" && item.label === "Dashboard");
          return (
            <div
              key={item.label}
              className={`sidebar-item${isActive ? " active" : ""}`}
              onClick={() => setPage(item.key)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && setPage(item.key)}
            >
              <item.icon size={15}/>
              {item.label}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:12,display:"flex",flexDirection:"column",gap:2 }}>
        <div className="sidebar-item" onClick={() => setPage("pricing")}>
          <DollarSign size={15}/> Upgrade Plan
        </div>
        <div
          className="sidebar-item"
          style={{ color:"rgba(239,68,68,0.75)" }}
          onClick={() => { setIsLoggedIn(false); setPage("landing"); }}
        >
          <LogOut size={15}/> Sign Out
        </div>
      </div>
    </div>
  );
}
