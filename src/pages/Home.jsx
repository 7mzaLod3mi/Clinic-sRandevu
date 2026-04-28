import { useReveal } from "../hooks/useReveal";
import { useCounter } from "../hooks/useCounter";
import { FEATURES, TESTIMONIALS, STATS, WEEK_DATA } from "../constants";
import Footer from "../components/Footer";
import {
  ArrowRight, Play, CheckCircle2, Sparkles, Star,
  Brain, HeartPulse, TrendingUp, Building2, Zap, Shield,
  BarChart2, Bell
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer
} from "recharts";

const ICON_MAP = { Brain, HeartPulse, TrendingUp, Building2, Zap, Shield, BarChart2 };

/* ── Hero mini-dashboard preview ─────────────────────────────────────────── */
function HeroDashboard() {
  return (
    <div style={{ position:"relative" }}>
      {/* Main card */}
      <div className="afl" style={{
        background:"rgba(15,23,42,0.92)", backdropFilter:"blur(24px)",
        border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:22,
        boxShadow:"0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)"
      }}>
        {/* Title bar */}
        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:18 }}>
          {["#ef4444","#f59e0b","#10b981"].map(c => (
            <div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c,opacity:0.75 }}/>
          ))}
          <div style={{ flex:1,textAlign:"center",fontSize:12,color:"rgba(255,255,255,0.28)" }}>
            ClinicFlow · Live Dashboard
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }}>
          {[
            { label:"Today's Appts", val:"24",   trend:"+12%", color:"#0ea5e9" },
            { label:"New Patients",  val:"8",    trend:"+5%",  color:"#8b5cf6" },
            { label:"Revenue Today", val:"$3.2K",trend:"+18%", color:"#10b981" },
            { label:"Satisfaction",  val:"98%",  trend:"+2%",  color:"#06b6d4" },
          ].map(s => (
            <div key={s.label} style={{
              background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:12, padding:"12px 14px"
            }}>
              <div style={{ fontSize:11,color:"rgba(255,255,255,0.42)",marginBottom:5 }}>{s.label}</div>
              <div style={{ display:"flex",alignItems:"baseline",gap:7 }}>
                <span style={{ fontSize:19,fontWeight:700,color:"#fff" }}>{s.val}</span>
                <span style={{ fontSize:11,color:"#10b981",fontWeight:600 }}>{s.trend}</span>
              </div>
              <div style={{ marginTop:8,height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",overflow:"hidden" }}>
                <div style={{ height:"100%",width:"72%",borderRadius:2,background:s.color }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div style={{ background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px",border:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:8 }}>Weekly Appointments</div>
          <ResponsiveContainer width="100%" height={76}>
            <AreaChart data={WEEK_DATA} margin={{ top:2,right:2,bottom:0,left:0 }}>
              <defs>
                <linearGradient id="heroG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={2} fill="url(#heroG)" dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Floating pills */}
      <div className="afls" style={{
        position:"absolute",top:-18,right:-26,borderRadius:14,padding:"10px 14px",
        background:"rgba(15,23,42,0.9)", backdropFilter:"blur(16px)",
        border:"1px solid rgba(255,255,255,0.12)",
        display:"flex",alignItems:"center",gap:10,animationDelay:"0.6s",
        boxShadow:"0 8px 24px rgba(0,0,0,0.3)"
      }}>
        <div style={{ width:32,height:32,borderRadius:9,background:"rgba(16,185,129,0.2)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <TrendingUp size={15} color="#10b981"/>
        </div>
        <div>
          <div style={{ fontSize:11,color:"rgba(255,255,255,0.42)" }}>Monthly Revenue</div>
          <div style={{ fontSize:15,fontWeight:700,color:"#fff" }}>+32% ↑</div>
        </div>
      </div>

      <div className="afls" style={{
        position:"absolute",bottom:-14,left:-22,borderRadius:14,padding:"10px 14px",
        background:"rgba(15,23,42,0.9)", backdropFilter:"blur(16px)",
        border:"1px solid rgba(255,255,255,0.12)",
        display:"flex",alignItems:"center",gap:10,animationDelay:"1.3s",
        boxShadow:"0 8px 24px rgba(0,0,0,0.3)"
      }}>
        <div style={{ width:32,height:32,borderRadius:9,background:"rgba(14,165,233,0.2)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <Bell size={15} color="#38bdf8"/>
        </div>
        <div>
          <div style={{ fontSize:11,color:"rgba(255,255,255,0.42)" }}>AI Reminder Sent</div>
          <div style={{ fontSize:14,fontWeight:600,color:"#38bdf8" }}>3 No-shows prevented</div>
        </div>
      </div>
    </div>
  );
}

/* ── Stats bar ───────────────────────────────────────────────────────────── */
function StatsBar() {
  const [v1, r1] = useCounter(5200);
  const [v3, r3] = useCounter(99);
  const [v4, r4] = useCounter(48);
  const revRef = useReveal();

  return (
    <section style={{ position:"relative", zIndex:10, padding:"0 24px 72px" }}>
      <div style={{ position:"absolute", top:80, left:0, right:0, bottom:0, background:"#fff", zIndex:-1 }}/>
      <div ref={revRef} className="reveal container" style={{ marginTop:-80 }}>
        <div style={{
          background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:20, padding:36,
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
          boxShadow:"0 4px 24px rgba(14,165,233,0.06)"
        }}>
          {[
            { ref:r1, val:`${v1}+`,     label:"Clinics Worldwide" },
            { ref:null, val:"2.4M+",    label:"Appointments Managed" },
            { ref:r3, val:`${v3}.9%`,   label:"Uptime SLA" },
            { ref:r4, val:`${v4} countries`, label:"Global Reach" },
          ].map((s,i) => (
            <div key={s.label} ref={s.ref} style={{
              textAlign:"center",padding:"16px 20px",
              borderRight: i < 3 ? "1px solid #e2e8f0" : "none"
            }}>
              <div className="font-display" style={{ fontSize:"clamp(30px,3.5vw,42px)",color:"#0f172a",marginBottom:6,letterSpacing:"-0.01em" }}>
                {s.val}
              </div>
              <div style={{ fontSize:13,color:"#64748b",fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ────────────────────────────────────────────────────────────── */
function FeaturesSection() {
  const titleRef = useReveal();
  const gridRef  = useReveal();

  return (
    <section style={{ background:"#fff",padding:"96px 24px" }}>
      <div className="container">
        <div ref={titleRef} className="reveal" style={{ textAlign:"center",marginBottom:64 }}>
          <div className="badge badge-primary" style={{ marginBottom:16 }}>
            <Sparkles size={11}/> Everything You Need
          </div>
          <h2 className="font-display" style={{ fontSize:"clamp(28px,4vw,46px)",color:"#0f172a",marginBottom:16,lineHeight:1.15 }}>
            Built for Modern <span className="grad-text">Dentistry</span>
          </h2>
          <p style={{ fontSize:17,color:"#64748b",maxWidth:520,margin:"0 auto",lineHeight:1.7 }}>
            Everything your clinic needs to run efficiently, grow sustainably, and deliver exceptional patient care.
          </p>
        </div>

        <div ref={gridRef} className="reveal-stagger" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",gap:22 }}>
          {FEATURES.map((f) => {
            const Icon = ICON_MAP[f.icon] || Sparkles;
            return (
              <div key={f.title} className="glass-card" style={{ borderRadius:18,padding:"28px 26px" }}>
                <div style={{
                  width:50,height:50,borderRadius:14,
                  background:f.bg, border:`1px solid ${f.color}2a`,
                  display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20
                }}>
                  <Icon size={22} color={f.color}/>
                </div>
                <h3 style={{ fontSize:17,fontWeight:700,marginBottom:10,color:"#0f172a" }}>{f.title}</h3>
                <p style={{ fontSize:14,lineHeight:1.68,color:"#64748b" }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ────────────────────────────────────────────────────────── */
function HowItWorks() {
  const ref = useReveal();
  const gridRef = useReveal();
  const steps = [
    { n:"01", title:"Connect Your Clinic",  desc:"Import existing patient records, configure your team, and set up services in under 30 minutes.", icon: Building2 },
    { n:"02", title:"Automate Everything",  desc:"AI handles scheduling, reminders, follow-ups, billing and recalls. Staff focuses on patients.", icon: Zap },
    { n:"03", title:"Watch Revenue Grow",   desc:"Track performance, patient satisfaction, and financial health with real-time analytics.", icon: TrendingUp },
  ];
  return (
    <section style={{ background:"#f0f9ff", padding:"96px 24px", position:"relative", overflow:"hidden" }}>
      <div className="bg-dots-light" style={{ position:"absolute",inset:0,opacity:0.6 }}/>
      <div className="container" style={{ position:"relative" }}>
        <div ref={ref} className="reveal" style={{ textAlign:"center",marginBottom:72 }}>
          <div className="badge badge-primary" style={{ marginBottom:16 }}>Simple Setup</div>
          <h2 className="font-display" style={{ fontSize:"clamp(26px,4vw,44px)",color:"#0f172a" }}>
            Up & running in <span className="grad-text">3 steps</span>
          </h2>
        </div>
        <div className="reveal-stagger" ref={gridRef} style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:28 }}>
          {steps.map(step => (
            <div key={step.n} style={{ position:"relative" }}>
              <div className="font-display" style={{ fontSize:72,color:"rgba(14,165,233,0.08)",lineHeight:1,marginBottom:-18,marginLeft:-4 }}>
                {step.n}
              </div>
              <div className="glass-card" style={{ borderRadius:18,padding:"26px 24px" }}>
                <div style={{ width:44,height:44,borderRadius:12,background:"rgba(14,165,233,0.1)",border:"1px solid rgba(14,165,233,0.25)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18 }}>
                  <step.icon size={20} color="#0ea5e9"/>
                </div>
                <h3 style={{ fontSize:17,fontWeight:700,marginBottom:10,color:"#0f172a" }}>{step.title}</h3>
                <p style={{ fontSize:14,lineHeight:1.68,color:"#64748b" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────────────────────────── */
function Testimonials() {
  const ref = useReveal();
  const gridRef = useReveal();
  return (
    <section style={{ background:"#fff",padding:"96px 24px" }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ textAlign:"center",marginBottom:64 }}>
          <div className="badge badge-success" style={{ marginBottom:16 }}>Loved by Clinics</div>
          <h2 className="font-display" style={{ fontSize:"clamp(26px,4vw,44px)",color:"#0f172a" }}>
            Trusted by 5,000+ Providers
          </h2>
        </div>
        <div className="reveal-stagger" ref={gridRef} style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={t.name} className="glass-card" style={{ borderRadius:20,padding:"28px 26px" }}>
              <div style={{ display:"flex",gap:3,marginBottom:18 }}>
                {Array(t.stars).fill(0).map((_,si) => (
                  <Star key={si} size={15} color="#f59e0b" fill="#f59e0b"/>
                ))}
              </div>
              <p style={{ fontSize:15,lineHeight:1.72,color:"#475569",marginBottom:24,fontStyle:"italic" }}>
                "{t.text}"
              </p>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div className="avatar" style={{ width:42,height:42,background:`${t.color}18`,color:t.color,border:`1.5px solid ${t.color}30`,fontSize:13 }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize:14,fontWeight:700,color:"#0f172a" }}>{t.name}</div>
                  <div style={{ fontSize:12,color:"#94a3b8" }}>{t.role}</div>
                </div>
                <div style={{ marginLeft:"auto" }}>
                  <span className="badge badge-primary" style={{ fontSize:11 }}>{t.specialty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ──────────────────────────────────────────────────────────── */
function CtaBanner({ setPage }) {
  const ref = useReveal();
  return (
    <section style={{ background:"#f0f9ff",padding:"0 24px 96px" }}>
      <div ref={ref} className="reveal container-sm">
        <div style={{
          background:"linear-gradient(135deg,#0c4a6e,#0369a1)",
          borderRadius:24, padding:"64px 48px", textAlign:"center",
          position:"relative", overflow:"hidden",
          boxShadow:"0 24px 64px rgba(14,165,233,0.35)"
        }}>
          <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(56,189,248,0.3),transparent 70%)" }}/>
          <div style={{ position:"absolute",bottom:-40,left:-40,width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(14,165,233,0.25),transparent 70%)" }}/>
          <div className="badge" style={{ marginBottom:20,display:"inline-flex",background:"rgba(255,255,255,0.15)",color:"#fff",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(8px)" }}>
            🚀 Start Today — No Credit Card Required
          </div>
          <h2 className="font-display" style={{ fontSize:"clamp(26px,4vw,42px)",color:"#fff",marginBottom:16,lineHeight:1.2 }}>
            Ready to Transform Your Practice?
          </h2>
          <p style={{ fontSize:16,color:"rgba(255,255,255,0.72)",marginBottom:36,maxWidth:480,margin:"0 auto 36px" }}>
            Join 5,000+ dental clinics already using ClinicFlow to streamline operations and grow revenue.
          </p>
          <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
            <button className="btn btn-white" style={{ padding:"14px 30px",fontSize:15 }} onClick={() => setPage("signup")}>
              Get Started Free <ArrowRight size={15}/>
            </button>
            <button className="btn" style={{ padding:"14px 24px",fontSize:15,border:"1.5px solid rgba(255,255,255,0.3)",color:"#fff",background:"transparent" }} onClick={() => setPage("contact")}>
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Hero Section ────────────────────────────────────────────────────────── */
export default function Home({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        position:"relative", minHeight:"100vh",
        display:"flex", alignItems:"center", overflow:"hidden",
        background:"linear-gradient(160deg,#0f172a 0%,#1e3a5f 55%,#0c1a2e 100%)"
      }}>
        <div className="bg-grid-light" style={{ position:"absolute",inset:0,opacity:0.6 }}/>
        <div className="orb" style={{ width:600,height:600,background:"radial-gradient(circle,rgba(14,165,233,0.28),transparent 70%)",top:"-80px",left:"-80px",animation:"orbFloat1 12s ease-in-out infinite" }}/>
        <div className="orb" style={{ width:500,height:500,background:"radial-gradient(circle,rgba(139,92,246,0.2),transparent 70%)",bottom:"-60px",right:"8%",animation:"orbFloat2 15s ease-in-out infinite" }}/>

        <div className="container" style={{ padding:"130px 24px 90px",position:"relative",zIndex:2,width:"100%" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center" }}>
            {/* Left */}
            <div>
              <div className="afu badge badge-primary-dark" style={{ marginBottom:24,width:"fit-content" }}>
                <Sparkles size={11}/> AI-Powered Dental Management
              </div>
              <h1 className="afu d1 font-display" style={{ fontSize:"clamp(36px,5vw,62px)",fontWeight:400,lineHeight:1.1,marginBottom:22,color:"#fff" }}>
                Run Your Clinic<br/>
                <span className="grad-text">Smarter Than Ever</span>
              </h1>
              <p className="afu d2" style={{ fontSize:17,lineHeight:1.75,color:"rgba(255,255,255,0.62)",marginBottom:36,maxWidth:480 }}>
                The all-in-one AI platform for dental clinics and private healthcare providers. Cut admin time by 80%, eliminate no-shows, and grow revenue.
              </p>
              <div className="afu d3" style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:36 }}>
                <button className="btn btn-primary pulse" style={{ padding:"14px 28px",fontSize:15 }} onClick={() => setPage("signup")}>
                  Start Free 14-Day Trial <ArrowRight size={16}/>
                </button>
                <button className="btn btn-ghost" style={{ padding:"14px 22px",fontSize:15 }} onClick={() => setPage("dashboard")}>
                  <Play size={14}/> Live Demo
                </button>
              </div>
              <div className="afu d4" style={{ display:"flex",gap:22,flexWrap:"wrap" }}>
                {["No credit card required","14-day free trial","Cancel anytime"].map(t => (
                  <div key={t} style={{ display:"flex",alignItems:"center",gap:7,fontSize:13,color:"rgba(255,255,255,0.48)" }}>
                    <CheckCircle2 size={14} color="#10b981"/> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="afu d3 hide-mobile">
              <HeroDashboard/>
            </div>
          </div>
        </div>

      </section>

      <StatsBar/>
      <FeaturesSection/>
      <HowItWorks/>
      <Testimonials/>
      <CtaBanner setPage={setPage}/>
      <Footer setPage={setPage}/>
    </div>
  );
}
