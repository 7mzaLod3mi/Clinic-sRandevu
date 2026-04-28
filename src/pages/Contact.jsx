import { useState } from "react";
import { Phone, Mail, MapPin, Globe, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import Footer from "../components/Footer";

export default function Contact({ setPage }) {
  const [sent,    setSent]    = useState(false);
  const [focused, setFocused] = useState(null);
  const r1 = useReveal();

  const inputStyle = (name) => ({
    width:"100%",fontFamily:"Inter,sans-serif",fontSize:14,padding:"11px 16px",
    borderRadius:10,outline:"none",transition:"all 0.2s ease",
    background: focused===name ? "#f0f9ff" : "#fff",
    border: `1.5px solid ${focused===name ? "#0ea5e9" : "#e2e8f0"}`,
    color:"#0f172a",
    boxShadow: focused===name ? "0 0 0 3px rgba(14,165,233,0.1)" : "none",
  });

  return (
    <div style={{ background:"#f8fafc",minHeight:"100vh" }}>
      <div className="bg-grid-light" style={{ position:"fixed",inset:0,opacity:0.4,pointerEvents:"none" }}/>

      <div className="container" style={{ padding:"140px 24px 80px",position:"relative" }}>
        {/* Header */}
        <div ref={r1} className="reveal" style={{ textAlign:"center",marginBottom:64 }}>
          <div className="badge badge-primary" style={{ marginBottom:16 }}>Get in Touch</div>
          <h1 className="font-display" style={{ fontSize:"clamp(28px,5vw,50px)",color:"#0f172a",marginBottom:14,lineHeight:1.15 }}>
            We'd Love to <span className="grad-text">Hear From You</span>
          </h1>
          <p style={{ fontSize:16,color:"#64748b",maxWidth:480,margin:"0 auto",lineHeight:1.7 }}>
            Whether you need a demo, have questions, or want to explore enterprise plans — our team responds within 1 business hour.
          </p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:32 }}>
          {/* Form */}
          <div className="glass-card" style={{ borderRadius:20,padding:36 }}>
            {sent ? (
              <div style={{ textAlign:"center",padding:"40px 0" }}>
                <div style={{ width:64,height:64,borderRadius:"50%",background:"rgba(16,185,129,0.1)",border:"2px solid rgba(16,185,129,0.35)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
                  <CheckCircle2 size={28} color="#10b981"/>
                </div>
                <h3 className="font-display" style={{ fontSize:22,color:"#0f172a",marginBottom:10 }}>Message Sent!</h3>
                <p style={{ color:"#64748b",fontSize:14,lineHeight:1.68 }}>
                  We'll get back to you within 1 business hour. Check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-display" style={{ fontSize:20,color:"#0f172a",marginBottom:24 }}>Send Us a Message</h3>
                <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                    {["First Name","Last Name"].map(f => (
                      <div key={f}>
                        <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:7 }}>{f}</label>
                        <input style={inputStyle(f)} placeholder={f} onFocus={()=>setFocused(f)} onBlur={()=>setFocused(null)}/>
                      </div>
                    ))}
                  </div>
                  {[["Email Address","doctor@clinic.com"],["Clinic / Organization","Your Clinic Name"],["Subject","How can we help?"]].map(([l,ph]) => (
                    <div key={l}>
                      <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:7 }}>{l}</label>
                      <input style={inputStyle(l)} placeholder={ph} onFocus={()=>setFocused(l)} onBlur={()=>setFocused(null)}/>
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:7 }}>Message</label>
                    <textarea
                      style={{ ...inputStyle("msg"),resize:"vertical",minHeight:110 }}
                      rows={4} placeholder="Tell us about your clinic and what you're looking to achieve…"
                      onFocus={()=>setFocused("msg")} onBlur={()=>setFocused(null)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:7 }}>I'm interested in…</label>
                    <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                      {["Live Demo","Pricing","Enterprise","Partnership","Support"].map(t => (
                        <label key={t} style={{ display:"flex",alignItems:"center",gap:7,cursor:"pointer",fontSize:13,color:"#475569",padding:"7px 14px",borderRadius:8,border:"1px solid #e2e8f0",background:"#f8fafc",transition:"all 0.15s" }}
                          onMouseEnter={e=>e.currentTarget.style.borderColor="#0ea5e9"}
                          onMouseLeave={e=>e.currentTarget.style.borderColor="#e2e8f0"}
                        >
                          <input type="checkbox" style={{ accentColor:"#0ea5e9" }}/> {t}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ padding:"13px",borderRadius:11,fontSize:15,marginTop:4,width:"100%",justifyContent:"center" }} onClick={()=>setSent(true)}>
                    Send Message <ArrowRight size={15}/>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            {[
              { icon:Phone, label:"Phone",       val:"+1 (888) 555-FLOW",          sub:"Mon–Fri, 8am–8pm EST",   color:"#0ea5e9" },
              { icon:Mail,  label:"Email",        val:"hello@clinicflow.io",        sub:"We reply within 1 hour",  color:"#8b5cf6" },
              { icon:MapPin,label:"Headquarters", val:"123 Health Innovation Dr",   sub:"San Francisco, CA 94105", color:"#10b981" },
              { icon:Globe, label:"Global Support",val:"48 countries served",       sub:"24/7 for Enterprise plans",color:"#f59e0b" },
            ].map(item => (
              <div key={item.label} className="glass-card" style={{ borderRadius:16,padding:"20px 22px",display:"flex",alignItems:"center",gap:16 }}>
                <div style={{ width:44,height:44,borderRadius:12,background:`${item.color}12`,border:`1px solid ${item.color}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <item.icon size={19} color={item.color}/>
                </div>
                <div>
                  <div style={{ fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4 }}>{item.label}</div>
                  <div style={{ fontSize:15,fontWeight:700,color:"#0f172a" }}>{item.val}</div>
                  <div style={{ fontSize:12,color:"#94a3b8" }}>{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Demo CTA */}
            <div style={{
              borderRadius:16,padding:22,
              background:"linear-gradient(135deg,#0c4a6e,#0369a1)",
              boxShadow:"0 12px 32px rgba(14,165,233,0.3)"
            }}>
              <div style={{ fontSize:14,fontWeight:700,color:"#fff",marginBottom:10 }}>Schedule a Live Demo</div>
              <p style={{ fontSize:13,color:"rgba(255,255,255,0.65)",marginBottom:18,lineHeight:1.65 }}>
                See ClinicFlow in action with a personalized 30-minute demo tailored to your dental practice.
              </p>
              <button className="btn btn-white" style={{ padding:"10px 20px",borderRadius:10,fontSize:13 }}>
                <Calendar size={13}/> Book a Demo Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer setPage={setPage}/>
    </div>
  );
}
