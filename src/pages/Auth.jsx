import { useState } from "react";
import { RefreshCw, HeartPulse, ArrowRight } from "lucide-react";
import { TODAY_APPTS } from "../constants";

export default function Auth({ mode, setPage, setIsLoggedIn }) {
  const [tab,     setTab]     = useState(mode || "login");
  const [form,    setForm]    = useState({ name:"", email:"", password:"", clinic:"" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setIsLoggedIn(true); setPage("dashboard"); }, 1400);
  };

  const inputStyle = (name) => ({
    width:"100%",fontFamily:"Inter,sans-serif",fontSize:14,padding:"12px 16px",
    borderRadius:10,outline:"none",transition:"all 0.22s ease",
    background: focused===name ? "rgba(14,165,233,0.06)" : "rgba(255,255,255,0.06)",
    border: `1.5px solid ${focused===name ? "#0ea5e9" : "rgba(255,255,255,0.14)"}`,
    color:"#f0f9ff",
    boxShadow: focused===name ? "0 0 0 3px rgba(14,165,233,0.18)" : "none",
  });

  return (
    <div style={{ minHeight:"100vh",display:"flex",background:"linear-gradient(160deg,#0f172a,#1e3a5f)",position:"relative",overflow:"hidden" }}>
      <div className="bg-grid-light" style={{ position:"absolute",inset:0,opacity:0.5 }}/>
      <div className="orb" style={{ width:500,height:500,background:"radial-gradient(circle,rgba(14,165,233,0.25),transparent)",top:"-100px",left:"-100px",opacity:0.8 }}/>
      <div className="orb" style={{ width:400,height:400,background:"radial-gradient(circle,rgba(139,92,246,0.2),transparent)",bottom:0,right:"-50px",opacity:0.8 }}/>

      {/* ─── Form Panel ──────────────────────────────────────────────── */}
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:48,position:"relative",zIndex:2 }}>
        <div style={{ width:"100%",maxWidth:400 }}>
          {/* Logo */}
          <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:48,cursor:"pointer" }} onClick={() => setPage("landing")}>
            <div style={{ width:36,height:36,borderRadius:11,background:"linear-gradient(135deg,#0284c7,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(14,165,233,0.4)" }}>
              <HeartPulse size={18} color="#fff"/>
            </div>
            <span className="font-display" style={{ fontSize:20,color:"#fff" }}>ClinicFlow</span>
          </div>

          <h1 className="afu font-display" style={{ fontSize:"clamp(26px,3vw,36px)",color:"#fff",marginBottom:14,lineHeight:1.2 }}>
            {tab === "login" ? "Welcome back" : "Start your free trial"}
          </h1>
          <p className="afu d1" style={{ fontSize:15,color:"rgba(255,255,255,0.52)",marginBottom:36,lineHeight:1.65 }}>
            {tab === "login" ? "Log in to your ClinicFlow account." : "14 days free. No credit card required."}
          </p>

          {/* Tab switcher */}
          <div className="afu d2" style={{ display:"flex",background:"rgba(255,255,255,0.06)",borderRadius:12,padding:4,marginBottom:28,border:"1px solid rgba(255,255,255,0.09)" }}>
            {["login","signup"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex:1,padding:"9px",borderRadius:9,border:"none",cursor:"pointer",fontSize:14,
                  fontWeight:600,fontFamily:"Inter,sans-serif",transition:"all 0.2s",
                  background: tab===t ? "linear-gradient(135deg,#0284c7,#0ea5e9)" : "transparent",
                  color: tab===t ? "#fff" : "rgba(255,255,255,0.5)",
                  boxShadow: tab===t ? "0 4px 12px rgba(14,165,233,0.35)" : "none"
                }}
              >
                {t === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handle} className="afu d3">
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              {tab === "signup" && (
                <div>
                  <label style={{ fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.6)",display:"block",marginBottom:7 }}>Full Name</label>
                  <input
                    style={inputStyle("name")} placeholder="Dr. Sarah Chen"
                    value={form.name} onChange={e => setForm({...form,name:e.target.value})}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  />
                </div>
              )}
              <div>
                <label style={{ fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.6)",display:"block",marginBottom:7 }}>Email Address</label>
                <input
                  type="email" style={inputStyle("email")} placeholder="doctor@clinic.com"
                  value={form.email} onChange={e => setForm({...form,email:e.target.value})}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label style={{ fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.6)",display:"block",marginBottom:7 }}>Password</label>
                <input
                  type="password" style={inputStyle("password")} placeholder="••••••••"
                  value={form.password} onChange={e => setForm({...form,password:e.target.value})}
                  onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                />
              </div>
              {tab === "signup" && (
                <div>
                  <label style={{ fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.6)",display:"block",marginBottom:7 }}>Clinic Type</label>
                  <select
                    style={{ ...inputStyle("clinic"), appearance:"none" }}
                    value={form.clinic} onChange={e => setForm({...form,clinic:e.target.value})}
                    onFocus={() => setFocused("clinic")} onBlur={() => setFocused(null)}
                  >
                    <option value="">Select your clinic type</option>
                    <option>Dental Clinic</option>
                    <option>Orthodontic Practice</option>
                    <option>Cosmetic Dentistry</option>
                    <option>Multi-Specialty</option>
                  </select>
                </div>
              )}

              {tab === "login" && (
                <div style={{ textAlign:"right",marginTop:-8 }}>
                  <span style={{ fontSize:13,color:"#38bdf8",cursor:"pointer",fontWeight:600 }}>Forgot password?</span>
                </div>
              )}

              <button
                className="btn btn-primary"
                type="submit"
                style={{ padding:"13px",borderRadius:11,fontSize:15,marginTop:4,width:"100%",justifyContent:"center" }}
              >
                {loading ? (
                  <span style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <RefreshCw size={15} style={{ animation:"spin 1s linear infinite" }}/> Processing…
                  </span>
                ) : tab === "login" ? "Log In to Dashboard" : "Create Free Account"}
              </button>
            </div>
          </form>

          <div style={{ textAlign:"center",marginTop:22,fontSize:13,color:"rgba(255,255,255,0.4)" }}>
            {tab==="login" ? "Don't have an account? " : "Already have an account? "}
            <span style={{ color:"#38bdf8",cursor:"pointer",fontWeight:600 }} onClick={() => setTab(tab==="login"?"signup":"login")}>
              {tab==="login" ? "Sign up free" : "Log in"}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Visual Panel ────────────────────────────────────────────── */}
      <div className="hide-mobile" style={{ width:"44%",position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:48 }}>
        <div style={{ width:"100%",maxWidth:360 }}>
          {/* Schedule card */}
          <div style={{ background:"rgba(15,23,42,0.88)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:26,marginBottom:16,boxShadow:"0 16px 48px rgba(0,0,0,0.4)" }}>
            <div style={{ fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:18 }}>Today's Schedule</div>
            {TODAY_APPTS.slice(0,3).map(a => (
              <div key={a.time} style={{ display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width:44,textAlign:"center",fontSize:12,fontWeight:700,color:"#38bdf8",background:"rgba(14,165,233,0.12)",borderRadius:7,padding:"5px 4px" }}>{a.time}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13,fontWeight:600,color:"#e2e8f0" }}>{a.name}</div>
                  <div style={{ fontSize:12,color:"rgba(255,255,255,0.38)" }}>{a.type}</div>
                </div>
                <span className={a.status==="completed"?"badge badge-success-dark":a.status==="in-progress"?"badge badge-primary-dark":"badge badge-warn-dark"} style={{ fontSize:11 }}>
                  {a.status==="in-progress"?"Now":a.status}
                </span>
              </div>
            ))}
          </div>

          {/* Mini stats */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            {[
              { val:"98%", label:"Satisfaction", color:"#10b981" },
              { val:"0",   label:"No-shows today", color:"#0ea5e9" },
            ].map(s => (
              <div key={s.label} style={{ background:"rgba(15,23,42,0.88)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:20,textAlign:"center" }}>
                <div className="font-display" style={{ fontSize:28,color:s.color }}>{s.val}</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,0.42)",marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
