import { APPT_DATA, PIE_DATA, PIE_COLORS, TODAY_APPTS, AVATAR_COLORS } from "../constants";
import { Calendar, Users, DollarSign, Clock, Plus, MoreVertical } from "lucide-react";
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

/* ── Custom chart tooltip ───────────────────────────────────────────────── */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"10px 14px",boxShadow:"0 8px 24px rgba(0,0,0,0.1)" }}>
      <div style={{ fontSize:12,color:"#94a3b8",marginBottom:6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ fontSize:14,fontWeight:600,color:p.color }}>
          {p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value}
          {p.name !== "revenue" ? " appts" : ""}
        </div>
      ))}
    </div>
  );
}

export default function Dashboard({ setPage }) {
  return (
    <div style={{ paddingTop:64,paddingLeft:260,minHeight:"100vh",background:"#f8fafc" }}>
      <div style={{ padding:"28px 28px 48px" }}>

        {/* Greeting */}
        <div style={{ marginBottom:28 }}>
          <h1 className="font-display" style={{ fontSize:24,color:"#0f172a",marginBottom:4 }}>
            Good morning, Dr. Admin 👋
          </h1>
          <p style={{ fontSize:14,color:"#64748b" }}>Here's what's happening at your clinic today — Tuesday, April 28</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:24 }}>
          {[
            { label:"Today's Appointments", val:"24", change:"+3 from yesterday", icon:Calendar, color:"#0ea5e9", bg:"rgba(14,165,233,0.1)",  trend:"up" },
            { label:"New Patients",         val:"8",  change:"+2 this week",      icon:Users,    color:"#8b5cf6", bg:"rgba(139,92,246,0.1)", trend:"up" },
            { label:"Revenue Today",        val:"$3,240",change:"+18% vs last wk",icon:DollarSign,color:"#10b981",bg:"rgba(16,185,129,0.1)", trend:"up" },
            { label:"Avg. Wait Time",       val:"4 min",change:"-2 min improve",  icon:Clock,    color:"#f59e0b", bg:"rgba(245,158,11,0.1)",  trend:"down" },
          ].map((s,i) => (
            <div key={s.label} className="stat-card glass-card" style={{ borderRadius:16,padding:"20px 22px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:14 }}>
                <div style={{ width:40,height:40,borderRadius:11,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <s.icon size={18} color={s.color}/>
                </div>
                <span className={s.trend==="up"?"badge badge-success":"badge badge-primary"} style={{ fontSize:11 }}>
                  {s.trend==="up"?"↑":"↓"}
                </span>
              </div>
              <div className="font-display" style={{ fontSize:26,color:"#0f172a",marginBottom:4 }}>{s.val}</div>
              <div style={{ fontSize:12,color:"#94a3b8",marginBottom:6 }}>{s.label}</div>
              <div style={{ fontSize:11,color:s.color,fontWeight:600 }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:24 }}>
          {/* Area chart */}
          <div className="glass-card" style={{ borderRadius:16,padding:"22px 24px" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24 }}>
              <div>
                <div style={{ fontSize:16,fontWeight:700,color:"#0f172a",marginBottom:3 }}>Revenue & Appointments</div>
                <div style={{ fontSize:12,color:"#94a3b8" }}>8-month overview</div>
              </div>
              <button className="btn btn-ghost-light" style={{ padding:"6px 14px",borderRadius:8,fontSize:12 }}>Export</button>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={APPT_DATA} margin={{ top:4,right:4,bottom:0,left:0 }}>
                <defs>
                  <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                <XAxis dataKey="month" tick={{ fill:"#94a3b8",fontSize:12 }} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip content={<ChartTooltip/>}/>
                <Area type="monotone" dataKey="appts"   name="appointments" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#gA)" dot={false}/>
                <Area type="monotone" dataKey="revenue" name="revenue"       stroke="#8b5cf6" strokeWidth={2}   fill="url(#gR)" dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="glass-card" style={{ borderRadius:16,padding:"22px 24px" }}>
            <div style={{ fontSize:16,fontWeight:700,color:"#0f172a",marginBottom:4 }}>Clinic Breakdown</div>
            <div style={{ fontSize:12,color:"#94a3b8",marginBottom:20 }}>By specialty</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {PIE_DATA.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Tooltip contentStyle={{ background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,fontSize:12 }}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display:"flex",flexDirection:"column",gap:8,marginTop:16 }}>
              {PIE_DATA.map((d,i) => (
                <div key={d.name} style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <div style={{ width:8,height:8,borderRadius:2,background:PIE_COLORS[i] }}/>
                    <span style={{ fontSize:13,color:"#64748b" }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize:13,fontWeight:700,color:"#0f172a" }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Appointments table */}
        <div className="glass-card" style={{ borderRadius:16,overflow:"hidden" }}>
          <div style={{ padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f1f5f9" }}>
            <div>
              <div style={{ fontSize:16,fontWeight:700,color:"#0f172a" }}>Today's Appointments</div>
              <div style={{ fontSize:12,color:"#94a3b8" }}>5 scheduled · 2 completed</div>
            </div>
            <button className="btn btn-primary" style={{ padding:"8px 16px",borderRadius:9,fontSize:13 }} onClick={() => setPage("appointments")}>
              <Plus size={13}/> Book New
            </button>
          </div>
          <div>
            {TODAY_APPTS.map((a,i) => (
              <div key={a.time} className="table-row" style={{ display:"flex",alignItems:"center",gap:16,padding:"14px 24px" }}>
                <div style={{ width:52,textAlign:"center",fontSize:13,fontWeight:700,color:"#0284c7",background:"rgba(14,165,233,0.08)",borderRadius:8,padding:"5px 6px",flexShrink:0 }}>{a.time}</div>
                <div className="avatar" style={{ width:34,height:34,background:`${AVATAR_COLORS[i%AVATAR_COLORS.length]}18`,color:AVATAR_COLORS[i%AVATAR_COLORS.length],fontSize:12,flexShrink:0 }}>
                  {a.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:14,fontWeight:600,color:"#0f172a" }}>{a.name}</div>
                  <div style={{ fontSize:12,color:"#94a3b8" }}>{a.type} · {a.duration} min</div>
                </div>
                <span className={a.status==="completed"?"badge badge-success":a.status==="in-progress"?"badge badge-primary":"badge badge-warn"} style={{ fontSize:11 }}>
                  {a.status==="in-progress"?"In Progress":a.status==="completed"?"Completed":"Upcoming"}
                </span>
                <button style={{ padding:6,borderRadius:7,background:"transparent",border:"none",cursor:"pointer",color:"#cbd5e1",transition:"color 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#64748b"} onMouseLeave={e=>e.currentTarget.style.color="#cbd5e1"}>
                  <MoreVertical size={15}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
