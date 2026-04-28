import { useState } from "react";
import { Filter, Plus, X } from "lucide-react";
import { TODAY_APPTS, AVATAR_COLORS } from "../constants";

const DAYS  = ["Mon 16","Tue 17","Wed 18","Thu 19","Fri 20","Sat 21"];
const HOURS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
const CAL_APPTS = [
  { day:1, hour:0, name:"Sarah M.",  type:"Dental",       color:"#0ea5e9" },
  { day:1, hour:2, name:"James R.",  type:"Orthodontics", color:"#8b5cf6" },
  { day:2, hour:1, name:"Emily C.",  type:"Cosmetic",     color:"#10b981" },
  { day:2, hour:4, name:"Marcus T.", type:"Dental",       color:"#0ea5e9" },
  { day:3, hour:0, name:"Aisha P.",  type:"Cosmetic",     color:"#f59e0b" },
  { day:4, hour:3, name:"Oliver B.", type:"Orthodontics", color:"#8b5cf6" },
  { day:5, hour:1, name:"Nina K.",   type:"Dental",       color:"#0ea5e9" },
];

export default function Appointments() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ paddingTop:64,paddingLeft:260,minHeight:"100vh",background:"#f8fafc" }}>
      <div style={{ padding:"28px" }}>

        {/* Header */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24 }}>
          <div>
            <h1 className="font-display" style={{ fontSize:22,color:"#0f172a",marginBottom:3 }}>Appointments</h1>
            <p style={{ fontSize:13,color:"#64748b" }}>Apr 16–21, 2026 · 22 appointments this week</p>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <button className="btn btn-ghost-light" style={{ padding:"9px 16px",borderRadius:10,fontSize:13 }}>
              <Filter size={14}/> Filter
            </button>
            <button className="btn btn-primary" style={{ padding:"9px 16px",borderRadius:10,fontSize:13 }} onClick={() => setShowModal(true)}>
              <Plus size={14}/> New Appointment
            </button>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="glass-card" style={{ borderRadius:16,overflow:"hidden",marginBottom:20 }}>
          {/* Day headers */}
          <div style={{ display:"grid",gridTemplateColumns:"60px repeat(6,1fr)",borderBottom:"1px solid #f1f5f9",background:"#fff" }}>
            <div style={{ padding:"12px 8px" }}/>
            {DAYS.map((d,i) => (
              <div key={d} style={{ padding:"12px",textAlign:"center",borderLeft:"1px solid #f1f5f9" }}>
                <div style={{ fontSize:11,color:"#94a3b8",marginBottom:4 }}>{d.split(" ")[0].toUpperCase()}</div>
                <div style={{
                  fontSize:16,fontWeight:700,
                  color: i===1 ? "#fff" : "#0f172a",
                  width:30,height:30,borderRadius:"50%",
                  background: i===1 ? "#0ea5e9" : "transparent",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  margin:"0 auto",
                  boxShadow: i===1 ? "0 4px 12px rgba(14,165,233,0.4)" : "none"
                }}>
                  {d.split(" ")[1]}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div style={{ maxHeight:340,overflowY:"auto" }}>
            {HOURS.map((h,hi) => (
              <div key={h} style={{ display:"grid",gridTemplateColumns:"60px repeat(6,1fr)",borderBottom:"1px solid #f8fafc",minHeight:52 }}>
                <div style={{ padding:"8px 10px",fontSize:11,color:"#cbd5e1",textAlign:"right",paddingTop:10 }}>{h}</div>
                {DAYS.map((_,di) => {
                  const appt = CAL_APPTS.find(a => a.day===di && a.hour===hi);
                  return (
                    <div key={di} style={{ borderLeft:"1px solid #f8fafc",padding:"4px 6px",cursor:"pointer" }}>
                      {appt && (
                        <div style={{
                          background:`${appt.color}12`, border:`1px solid ${appt.color}30`,
                          borderRadius:7, padding:"5px 8px", borderLeft:`3px solid ${appt.color}`,
                          transition:"transform 0.15s"
                        }}
                          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"}
                          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                        >
                          <div style={{ fontSize:11,fontWeight:700,color:appt.color }}>{appt.name}</div>
                          <div style={{ fontSize:10,color:"#94a3b8" }}>{appt.type}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming list */}
        <div className="glass-card" style={{ borderRadius:16,overflow:"hidden" }}>
          <div style={{ padding:"18px 22px",borderBottom:"1px solid #f1f5f9",fontSize:15,fontWeight:700,color:"#0f172a" }}>
            Upcoming Appointments
          </div>
          {TODAY_APPTS.map((a,i) => (
            <div key={a.time} className="table-row" style={{ padding:"14px 22px",display:"flex",alignItems:"center",gap:14 }}>
              <div style={{ width:48,textAlign:"center",fontSize:12,fontWeight:700,color:"#0284c7",background:"rgba(14,165,233,0.08)",borderRadius:8,padding:5,flexShrink:0 }}>{a.time}</div>
              <div className="avatar" style={{ width:34,height:34,background:`${AVATAR_COLORS[i]}18`,color:AVATAR_COLORS[i],fontSize:11 }}>
                {a.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14,fontWeight:600,color:"#0f172a" }}>{a.name}</div>
                <div style={{ fontSize:12,color:"#94a3b8" }}>{a.type} — {a.duration} min</div>
              </div>
              <span className={a.status==="completed"?"badge badge-success":a.status==="in-progress"?"badge badge-primary":"badge badge-warn"} style={{ fontSize:11 }}>
                {a.status==="in-progress"?"In Progress":a.status==="completed"?"Done":"Scheduled"}
              </span>
              <button className="btn btn-ghost-light" style={{ padding:"6px 12px",borderRadius:8,fontSize:12 }}>Edit</button>
            </div>
          ))}
        </div>
      </div>

      {/* New Appointment Modal */}
      {showModal && (
        <div
          style={{ position:"fixed",inset:0,background:"rgba(15,23,42,0.65)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="asc"
            style={{ background:"#fff",borderRadius:20,padding:32,width:"100%",maxWidth:460,position:"relative",boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{ position:"absolute",top:16,right:16,background:"#f1f5f9",border:"none",color:"#64748b",padding:7,borderRadius:8,cursor:"pointer" }}
              onClick={() => setShowModal(false)}
            >
              <X size={16}/>
            </button>
            <h2 className="font-display" style={{ fontSize:20,color:"#0f172a",marginBottom:24 }}>Book New Appointment</h2>
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              {["Patient Name","Service Type","Date","Time","Practitioner"].map(f => (
                <div key={f}>
                  <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:7 }}>{f}</label>
                  <input className="input input-light" placeholder={`Select ${f.toLowerCase()}…`}/>
                </div>
              ))}
              <button className="btn btn-primary" style={{ padding:"13px",borderRadius:11,fontSize:14,marginTop:4,width:"100%",justifyContent:"center" }} onClick={() => setShowModal(false)}>
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
