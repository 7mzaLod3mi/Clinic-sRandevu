import { useState, useEffect, useRef } from "react";
import { PRICING_PLANS, FAQS } from "../constants";
import { useReveal } from "../hooks/useReveal";
import Footer from "../components/Footer";
import { Check, ArrowRight, Sparkles } from "lucide-react";

function AnimatedPrice({ target, popular }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      let startVal = count;
      let start = performance.now();
      let duration = 450;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(startVal + (target - startVal) * ease));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      return;
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        let start = performance.now();
        let duration = 1600;
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          setCount(Math.round(ease * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.1 });
    
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display" style={{ fontSize:46,color:popular?"#fff":"#0f172a",letterSpacing:"-0.02em" }}>
      ${count}
    </span>
  );
}


export default function Pricing({ setPage }) {
  const [annual, setAnnual] = useState(false);
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  return (
    <div style={{ background:"#f8fafc",minHeight:"100vh" }}>
      <div className="bg-grid-light" style={{ position:"fixed",inset:0,opacity:0.5,pointerEvents:"none" }}/>

      <div className="container" style={{ padding:"140px 24px 80px",position:"relative" }}>

        {/* Header */}
        <div ref={r1} className="reveal" style={{ textAlign:"center",marginBottom:60 }}>
          <div className="badge badge-primary" style={{ marginBottom:16 }}>
            <Sparkles size={11}/> Simple, Transparent Pricing
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(32px,5vw,54px)",color:"#0f172a",marginBottom:16,lineHeight:1.15 }}>
            Choose Your <span className="grad-text">Growth Plan</span>
          </h1>
          <p style={{ fontSize:17,color:"#64748b",maxWidth:520,margin:"0 auto 32px",lineHeight:1.7 }}>
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>

          {/* Toggle */}
          <div style={{ display:"inline-flex",background:"#e2e8f0",borderRadius:100,padding:4,gap:2 }}>
            {["Monthly","Annual"].map(t => (
              <button
                key={t}
                onClick={() => setAnnual(t === "Annual")}
                style={{
                  padding:"8px 24px",borderRadius:100,border:"none",cursor:"pointer",
                  fontSize:14,fontWeight:600,fontFamily:"Inter,sans-serif",transition:"all 0.2s",
                  background: (t==="Annual") === annual ? "#fff" : "transparent",
                  color: (t==="Annual") === annual ? "#0f172a" : "#64748b",
                  boxShadow: (t==="Annual") === annual ? "0 2px 8px rgba(0,0,0,0.12)" : "none"
                }}
              >
                {t}
                {t === "Annual" && (
                  <span style={{ background:"rgba(16,185,129,0.15)",color:"#059669",borderRadius:100,padding:"1px 8px",fontSize:11,marginLeft:6 }}>
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div ref={r2} className="reveal-stagger" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:22 }}>
          {PRICING_PLANS.map(plan => (
            <div
              key={plan.name}
              className="pricing-card"
              style={{
                borderRadius:22, padding:32, position:"relative", overflow:"hidden",
                background: plan.popular
                  ? "linear-gradient(160deg,#0c4a6e,#0369a1)"
                  : "#ffffff",
                border: plan.popular
                  ? "1px solid rgba(14,165,233,0.6)"
                  : "1px solid #e2e8f0",
                boxShadow: plan.popular
                  ? "0 16px 48px rgba(14,165,233,0.28)"
                  : "0 4px 16px rgba(0,0,0,0.05)",
              }}
            >
              {plan.popular && (
                <div style={{ position:"absolute",top:20,right:20 }}>
                  <span className="badge" style={{ background:"rgba(255,255,255,0.2)",color:"#fff",border:"1px solid rgba(255,255,255,0.3)",fontSize:11 }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div style={{
                width:44,height:44,borderRadius:12,
                background: plan.popular ? "rgba(255,255,255,0.15)" : `${plan.color}18`,
                border:`1px solid ${plan.popular ? "rgba(255,255,255,0.3)" : plan.color+"30"}`,
                display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20
              }}>
                <Sparkles size={19} color={plan.popular ? "#fff" : plan.color}/>
              </div>

              <div style={{ fontSize:19,fontWeight:700,color:plan.popular?"#fff":"#0f172a",marginBottom:6 }}>{plan.name}</div>
              <div style={{ fontSize:13,color:plan.popular?"rgba(255,255,255,0.65)":"#64748b",marginBottom:24 }}>{plan.desc}</div>

              {/* Price */}
              <div style={{ marginBottom:28 }}>
                {typeof plan.price === "number" ? (
                  <div style={{ display:"flex",alignItems:"baseline",gap:4 }}>
                    <AnimatedPrice target={annual ? Math.round(plan.price * 0.8) : plan.price} popular={plan.popular} />
                    <span style={{ fontSize:14,color:plan.popular?"rgba(255,255,255,0.55)":"#94a3b8" }}>/{plan.period}</span>
                  </div>
                ) : (
                  <div className="font-display" style={{ fontSize:40,color:plan.popular?"#fff":"#0f172a" }}>Custom</div>
                )}
              </div>

              {/* CTA */}
              <button
                style={{
                  width:"100%",padding:"13px",borderRadius:12,fontSize:14,marginBottom:28,
                  display:"flex",alignItems:"center",justifyContent:"center",gap:7,
                  fontFamily:"Inter,sans-serif",fontWeight:600,cursor:"pointer",
                  border: plan.popular ? "none" : `1.5px solid ${plan.color}`,
                  background: plan.popular ? "#fff" : "transparent",
                  color: plan.popular ? "#0284c7" : plan.color,
                  transition:"all 0.22s",
                }}
                onMouseEnter={e => {
                  if(plan.popular) e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.2)";
                  else e.currentTarget.style.background=`${plan.color}12`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow="none";
                  if(!plan.popular) e.currentTarget.style.background="transparent";
                }}
                onClick={() => setPage("signup")}
              >
                {plan.cta} <ArrowRight size={14}/>
              </button>

              {/* Features list */}
              <div style={{ display:"flex",flexDirection:"column",gap:11 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display:"flex",alignItems:"flex-start",gap:10,fontSize:13.5,color:plan.popular?"rgba(255,255,255,0.82)":"#475569" }}>
                    <Check size={15} color={plan.popular?"#38bdf8":plan.color} style={{ marginTop:1,flexShrink:0 }}/>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div ref={r3} className="reveal" style={{ marginTop:88 }}>
          <h2 className="font-display" style={{ fontSize:28,textAlign:"center",marginBottom:44,color:"#0f172a" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
            {FAQS.map(([q,a]) => (
              <div key={q} className="glass-card" style={{ borderRadius:16,padding:"22px 24px" }}>
                <div style={{ fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:10 }}>{q}</div>
                <div style={{ fontSize:14,lineHeight:1.68,color:"#64748b" }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer setPage={setPage}/>
    </div>
  );
}
