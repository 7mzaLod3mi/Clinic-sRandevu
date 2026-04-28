import { HeartPulse, Shield } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const FOOTER_COLS = [
  { title: "Product",  links: ["Features","Pricing","Security","Changelog","API Docs"] },
  { title: "Company",  links: ["About","Blog","Careers","Press","Partners"] },
  { title: "Support",  links: ["Help Center","Contact","Status","Privacy","Terms"] },
];

export default function Footer({ setPage }) {
  const revealRef = useReveal();

  return (
    <footer style={{ background:"#0f172a", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"56px 24px 36px" }}>
      <div className="container">
        <div ref={revealRef} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:48 }}
          className="reveal">
          {/* Brand column */}
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:18,cursor:"pointer" }}
              onClick={() => setPage?.("landing")}>
              <div style={{ width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#0284c7,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <HeartPulse size={15} color="#fff"/>
              </div>
              <span className="font-display" style={{ fontSize:17,color:"#fff" }}>ClinicFlow</span>
            </div>
            <p style={{ fontSize:14,lineHeight:1.75,color:"rgba(255,255,255,0.75)",maxWidth:260 }}>
              The AI-powered dental management platform trusted by 5,000+ healthcare providers worldwide.
            </p>
            {/* Social icons */}
            <div style={{ display:"flex",gap:10,marginTop:20 }}>
              {["tw","li","gh"].map(s => (
                <div key={s} style={{
                  width:36,height:36,borderRadius:8,
                  background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",
                  display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
                  transition:"all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(14,165,233,0.6)"; e.currentTarget.style.background="rgba(14,165,233,0.1)"; e.currentTarget.children[0].style.color="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.children[0].style.color="rgba(255,255,255,0.75)"; }}
                >
                  <span style={{ fontSize:12,color:"rgba(255,255,255,0.75)",fontWeight:600, transition:"color 0.2s" }}>{s.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize:13,fontWeight:700,color:"#fff",textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:18 }}>
                {col.title}
              </div>
              {col.links.map(l => (
                <div
                  key={l}
                  style={{ fontSize:14,color:"rgba(255,255,255,0.75)",marginBottom:12,cursor:"pointer",transition:"color 0.15s" }}
                  onMouseEnter={e => e.target.style.color="#fff"}
                  onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.75)"}
                >
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14 }}>
          <div style={{ fontSize:14,color:"rgba(255,255,255,0.6)" }}>
            © 2026 ClinicFlow, Inc. All rights reserved.
          </div>
          <div style={{ display:"flex",gap:10 }}>
            {["HIPAA","GDPR","SOC 2"].map(b => (
              <div key={b} className="badge badge-primary-dark" style={{ fontSize:11 }}>
                <Shield size={10}/> {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
