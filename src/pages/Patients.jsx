import { useState } from "react";
import { Search, Upload, Plus, MoreVertical } from "lucide-react";
import { PATIENTS, AVATAR_COLORS } from "../constants";

const STATUS_BADGE = {
  confirmed: "badge badge-success",
  pending:   "badge badge-warn",
  completed: "badge badge-primary",
};

const TYPE_BADGE = {
  Dental:       "badge badge-primary",
  Orthodontics: "badge badge-purple",
  Cosmetic:     "badge badge-cyan",
};

export default function Patients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = PATIENTS.filter(p =>
    (filter === "All" || p.type === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ paddingTop:64,paddingLeft:260,minHeight:"100vh",background:"#f8fafc" }}>
      <div style={{ padding:"28px" }}>

        {/* Header */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24 }}>
          <div>
            <h1 className="font-display" style={{ fontSize:22,color:"#0f172a",marginBottom:3 }}>Patient Management</h1>
            <p style={{ fontSize:13,color:"#64748b" }}>{PATIENTS.length} total patients registered</p>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <button className="btn btn-ghost-light" style={{ padding:"9px 14px",borderRadius:10,fontSize:13 }}>
              <Upload size={14}/> Import
            </button>
            <button className="btn btn-primary" style={{ padding:"9px 14px",borderRadius:10,fontSize:13 }}>
              <Plus size={14}/> Add Patient
            </button>
          </div>
        </div>

        {/* Summary stat mini-cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20 }}>
          {[
            { label:"Total Patients",      val:"1,284", color:"#0ea5e9" },
            { label:"Active This Month",   val:"342",   color:"#8b5cf6" },
            { label:"New This Week",       val:"24",    color:"#10b981" },
            { label:"Avg. Visits/Patient", val:"8.3",   color:"#f59e0b" },
          ].map(s => (
            <div key={s.label} className="glass-card" style={{ borderRadius:14,padding:"16px 18px" }}>
              <div style={{ fontSize:11,color:"#94a3b8",marginBottom:8 }}>{s.label}</div>
              <div className="font-display" style={{ fontSize:22,color:s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div style={{ display:"flex",gap:12,marginBottom:16,alignItems:"center",flexWrap:"wrap" }}>
          <div style={{ position:"relative",flex:1,maxWidth:320 }}>
            <input
              className="input input-light"
              style={{ paddingLeft:38,height:40,fontSize:13 }}
              placeholder="Search patients…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Search size={14} style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#cbd5e1" }}/>
          </div>
          {["All","Dental","Orthodontics","Cosmetic"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding:"7px 16px",borderRadius:8,fontSize:13,fontWeight:500,
                cursor:"pointer",fontFamily:"Inter,sans-serif",transition:"all 0.15s",border:"1.5px solid",
                background: filter===f ? "#0ea5e9" : "transparent",
                borderColor: filter===f ? "#0ea5e9" : "#e2e8f0",
                color: filter===f ? "#fff" : "#64748b"
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card" style={{ borderRadius:16,overflow:"hidden" }}>
          {/* Header row */}
          <div style={{
            display:"grid",gridTemplateColumns:"1.5fr 1fr 0.8fr 1.5fr 1fr 100px",
            padding:"12px 20px",background:"#f8fafc",
            borderBottom:"1px solid #f1f5f9",
            fontSize:12,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.06em"
          }}>
            <div>Patient</div><div>Specialty</div><div>Age</div><div>Next Visit</div><div>Status</div><div style={{ textAlign:"right" }}>Actions</div>
          </div>

          {filtered.map((p,i) => (
            <div key={p.id} className="table-row" style={{ display:"grid",gridTemplateColumns:"1.5fr 1fr 0.8fr 1.5fr 1fr 100px",padding:"14px 20px",alignItems:"center" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div className="avatar" style={{ width:36,height:36,background:`${AVATAR_COLORS[i%AVATAR_COLORS.length]}18`,color:AVATAR_COLORS[i%AVATAR_COLORS.length],fontSize:11 }}>
                  {p.avatar}
                </div>
                <div>
                  <div style={{ fontSize:14,fontWeight:600,color:"#0f172a" }}>{p.name}</div>
                  <div style={{ fontSize:11,color:"#94a3b8" }}>{p.id} · {p.visits} visits</div>
                </div>
              </div>
              <div>
                <span className={TYPE_BADGE[p.type]||"badge badge-primary"} style={{ fontSize:11 }}>{p.type}</span>
              </div>
              <div style={{ fontSize:14,color:"#475569" }}>{p.age} yrs</div>
              <div style={{ fontSize:13,color:"#475569" }}>{p.next}</div>
              <div>
                <span className={STATUS_BADGE[p.status]} style={{ fontSize:11 }}>{p.status}</span>
              </div>
              <div style={{ display:"flex",gap:6,justifyContent:"flex-end" }}>
                <button style={{ padding:"5px 10px",borderRadius:7,background:"rgba(14,165,233,0.08)",border:"1px solid rgba(14,165,233,0.2)",color:"#0284c7",fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:600 }}>View</button>
                <button style={{ padding:6,borderRadius:7,background:"transparent",border:"none",color:"#cbd5e1",cursor:"pointer" }}>
                  <MoreVertical size={14}/>
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding:48,textAlign:"center",color:"#94a3b8",fontSize:14 }}>
              No patients match your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
