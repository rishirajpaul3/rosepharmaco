import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  { name: "Rose-CV", form: "Tab 625mg", composition: "Amoxycillin & Potassium Clavulanate 625mg", category: "Antibiotics" },
  { name: "Rose CV 625 LB", form: "Tab", composition: "Amoxycillin & Potassium Clavulanate with Lactic Acid Bacillus", category: "Antibiotics" },
  { name: "Rose-CV-DS", form: "Dry Syrup", composition: "Amoxycillin 400mg & Potassium Clavulanate 57mg", category: "Antibiotics" },
  { name: "ROCIP-CV-625", form: "Tab", composition: "Cefuroxime Axetil 500mg + Clavulanic Acid 125mg", category: "Antibiotics" },
  { name: "ROCIP-500", form: "Tab", composition: "Cefuroxime Axetil 500mg", category: "Antibiotics" },
  { name: "Ofrose-O", form: "Tab", composition: "Ofloxacin 200mg + Ornidazole 500mg", category: "Antibiotics" },
  { name: "Salff-S", form: "Injection", composition: "Ceftriaxone 1gm + Sulbactam 500mg", category: "Antibiotics" },
  { name: "Salff-Zone", form: "Injection", composition: "Cefoperazone + Sulbactam 1.5gm", category: "Antibiotics" },
  { name: "ROSEMAL-SP", form: "Tab", composition: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg", category: "Pain & Inflammation" },
  { name: "Rosemal-AC", form: "Tab", composition: "Aceclofenac 100mg + Paracetamol 325mg", category: "Pain & Inflammation" },
  { name: "Roseat DX", form: "Cough Syrup", composition: "Dextromethorphan HCL 10mg, Phenylephrine HCL 5mg, Chlorpheniramine Maleate 2mg", category: "Cough & Cold" },
  { name: "RoseMon", form: "Tab", composition: "Levocetirizine 5mg + Montelukast 10mg", category: "Cough & Cold" },
  { name: "Rose Cap", form: "Capsule", composition: "Lycopene, Vit-E, Vit-C, Chromium HCL, Zinc Sulphate, Copper Sulphate, Manganese Sulphate, Selenium Dioxide", category: "Vitamins & Supplements" },
  { name: "Rosemethyle Plus", form: "Injection", composition: "Methylcobalamin 1500mcg with Benzyl Alcohol 2%", category: "Vitamins & Supplements" },
  { name: "Rosecalcitrol", form: "Capsule", composition: "Calcium Carbonate, Calcitriol & Zinc", category: "Vitamins & Supplements" },
  { name: "Rose-VT Plus", form: "Syrup", composition: "Multivitamin, Multiminerals & Lysine Syrup", category: "Vitamins & Supplements" },
  { name: "Rose-VT", form: "Tab", composition: "Vitamins, Folic Acid, Zinc, Magnesium, Iodine, Copper, Selenium, Chromium & Grape Seed Extract", category: "Vitamins & Supplements" },
  { name: "Rosetone Syp", form: "Syrup 200ml", composition: "Ferric Ammonium Citrate 110mg, Elemental Iron 22.5mg, Cyanocobalamin 15mcg + Folic Acid 1.5mg", category: "Iron & Blood" },
  { name: "ROSETONE-XXT", form: "Tab", composition: "Ferrous Ascorbate 100mg Iron + Methylcobalamin 1.5mg + Folic Acid 1.5mg + Zinc Sulphate Monohydrate 22.5mg", category: "Iron & Blood" },
  { name: "Rosetone XXT", form: "Syrup 200ml", composition: "Ferrous Ascorbate Equivalent to Elemental Iron 30mg, Folic Acid 500mcg & Methylcobalamine", category: "Iron & Blood" },
  { name: "Racid", form: "Suspension", composition: "Alumina, Magnesia, Simethicone & Sorbitol", category: "GI & Liver" },
  { name: "Rosepra DSR", form: "Capsule", composition: "Rabeprazole 20mg + Domperidone 30mg", category: "GI & Liver" },
  { name: "Livat-DS", form: "Syrup", composition: "Tricholine Citrate 275mg, Sorbitol (70%) 100ml/200ml", category: "GI & Liver" },
  { name: "LIVAT FORTE", form: "Tab", composition: "Ursodeoxycholic Acid 150mg/300mg", category: "GI & Liver" },
  { name: "Rosesitaglip M550mg", form: "Tab", composition: "Sitagliptin 50mg + Metformin 550mg", category: "Diabetes" },
  { name: "Rosesitaglip M1050mg", form: "Tab", composition: "Sitagliptin 50mg + Metformin 1000mg", category: "Diabetes" },
  { name: "Ofrose Plus Cream", form: "Cream", composition: "Ofloxacin 0.07% + Terbinafine 1% + Clobetasol Propionate 0.05%", category: "Topical & Oral Care" },
  { name: "Rose Mouthwash", form: "Mouthwash", composition: "Chlorhexidine Gluconate 0.2% w/v in Pleasantly Flavored Aqueous Base", category: "Topical & Oral Care" },
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.category))];

const formIcons = { Tab: "💊", Capsule: "💊", Injection: "💉", Syrup: "🧴", "Cough Syrup": "🧴", "Dry Syrup": "🧴", Cream: "🧴", Suspension: "🧴", Mouthwash: "🧴", "Syrup 200ml": "🧴", "Tab 625mg": "💊" };

const WA_NUMBER = "919205628098";
const WA_LINK = "https://wa.me/919205628098?text=" + encodeURIComponent("Hello Rose Pharmaco, I'm interested in your products. Please share more details.");

/* ── SVG Logo Component matching real Rose Pharmaco brand ── */
function RoseLogo({ size = 40, light = false }) {
  const scale = size / 40;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Navy square frame with bracket shape */}
      <rect x="2" y="2" width="36" height="36" rx="2" stroke={light ? "rgba(255,255,255,0.9)" : "#1B2A4A"} strokeWidth="2.5" fill={light ? "rgba(255,255,255,0.08)" : "#fff"}/>
      {/* Inner bracket — top-left corner accent */}
      <path d="M6 6 L6 14 M6 6 L14 6" stroke={light ? "rgba(255,255,255,0.7)" : "#1B2A4A"} strokeWidth="2.5" strokeLinecap="square" fill="none"/>
      {/* Inner bracket — bottom-right corner accent */}
      <path d="M34 34 L34 26 M34 34 L26 34" stroke={light ? "rgba(255,255,255,0.7)" : "#1B2A4A"} strokeWidth="2.5" strokeLinecap="square" fill="none"/>
      {/* Red serif R */}
      <text x="20" y="28" textAnchor="middle" fontFamily="'Playfair Display', 'Georgia', serif" fontSize="24" fontWeight="700" fill={light ? "#fff" : "#C0392B"}>R</text>
    </svg>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── WhatsApp SVG icon reusable ── */
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [["home","Home"],["products","Products"],["about","About"],["contact","Contact"]];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #eee" : "none", transition: "all 0.35s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#home" onClick={(e) => handleNavClick(e, "home")} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <RoseLogo size={40} light={!scrolled} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: scrolled ? "#1B2A4A" : "#fff", transition: "color 0.3s", lineHeight: 1.2, letterSpacing: "0.3px" }}>Rose Pharmaco</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, color: scrolled ? "#999" : "rgba(255,255,255,0.55)", transition: "color 0.3s", letterSpacing: "1.5px", textTransform: "uppercase" }}>Pvt. Ltd.</span>
          </div>
        </a>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-links-desktop">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => handleNavClick(e, id)} style={{ textDecoration: "none", fontSize: 13, fontWeight: 500, color: scrolled ? "#555" : "rgba(255,255,255,0.85)", letterSpacing: "0.5px", transition: "color 0.3s", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase" }}>{label}</a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 2px 12px rgba(37,211,102,0.25)" }} onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.35)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(37,211,102,0.25)"; }}>
            <WhatsAppIcon size={16} />
            Order on WhatsApp
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          <div style={{ width: 24, height: 2, background: scrolled ? "#333" : "#fff", marginBottom: 6, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }}/>
          <div style={{ width: 24, height: 2, background: scrolled ? "#333" : "#fff", marginBottom: 6, transition: "all 0.3s", opacity: open ? 0 : 1 }}/>
          <div style={{ width: 24, height: 2, background: scrolled ? "#333" : "#fff", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }}/>
        </button>
      </div>
      {open && (
        <div style={{ background: "#fff", padding: "16px 24px", borderTop: "1px solid #eee", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }} className="nav-mobile-menu">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => handleNavClick(e, id)} style={{ display: "block", padding: "14px 0", fontSize: 15, color: "#333", textDecoration: "none", borderBottom: "1px solid #f5f5f5", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.3px" }}>{label}</a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", padding: "14px 0", borderRadius: 10, textAlign: "center", marginTop: 16, fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
            <WhatsAppIcon size={18} />
            Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" style={{ minHeight: "100vh", background: "linear-gradient(165deg, #0a0f1a 0%, #1B2A4A 30%, #7F1D1D 65%, #B91C1C 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Decorative background elements */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
        <div style={{ position: "absolute", top: "8%", left: "3%", width: 500, height: 500, borderRadius: "50%", border: "1px solid #fff" }}/>
        <div style={{ position: "absolute", top: "25%", right: "8%", width: 300, height: 300, borderRadius: "50%", border: "1px solid #fff" }}/>
        <div style={{ position: "absolute", bottom: "5%", left: "25%", width: 400, height: 400, borderRadius: "50%", border: "1px solid #fff" }}/>
      </div>
      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)" }}/>
      {/* Subtle grid pattern */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "8px 20px", marginBottom: 36, backdropFilter: "blur(8px)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#25D366", display: "inline-block", boxShadow: "0 0 8px rgba(37,211,102,0.6)" }}/>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 500 }}>Manufactured by Akums — India's Leading Contract Manufacturer</span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6.5vw, 76px)", fontWeight: 700, color: "#fff", lineHeight: 1.08, margin: "0 0 28px", letterSpacing: "-1.5px" }}>
            World Class Quality<br/>
            <span style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic", fontWeight: 400 }}>for Well Being</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 2vw, 19px)", color: "rgba(255,255,255,0.6)", maxWidth: 580, margin: "0 auto 44px", lineHeight: 1.7 }}>
            Premium pharmaceutical products — tablets, capsules, syrups & injectables. Direct supply to chemists and hospitals across India.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "16px 36px", borderRadius: 50, fontSize: 16, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 10, transition: "all 0.25s cubic-bezier(.16,1,.3,1)", boxShadow: "0 4px 24px rgba(37,211,102,0.3)" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(37,211,102,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.3)"; }}>
              <WhatsAppIcon size={20} />
              Order on WhatsApp
            </a>
            <a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }} style={{ border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "16px 36px", borderRadius: 50, fontSize: 16, fontWeight: 500, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s", backdropFilter: "blur(4px)" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}>View Products</a>
          </div>
        </FadeIn>
        <FadeIn delay={0.5}>
          <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 72, flexWrap: "wrap" }}>
            {[["30+", "Products"], ["Pan India", "Delivery"], ["GMP", "Certified"], ["Akums", "Manufactured"]].map(([num, label], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#fff" }}>{num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 6, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const icon = formIcons[product.form] || "💊";
  return (
    <FadeIn delay={Math.min(index * 0.04, 0.4)}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: "1px solid #f0f0f0", transition: "all 0.3s cubic-bezier(.16,1,.3,1)", cursor: "default", height: "100%", display: "flex", flexDirection: "column" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = "#B91C1C"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#f0f0f0"; }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>{icon}</span>
          <span style={{ background: "#FEF2F2", color: "#B91C1C", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.3px" }}>{product.form}</span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px" }}>{product.name}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0, flex: 1 }}>{product.composition}</p>
        <div style={{ borderTop: "1px solid #f5f5f5", marginTop: 16, paddingTop: 12 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "1px" }}>{product.category}</span>
        </div>
      </div>
    </FadeIn>
  );
}

function Products() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  return (
    <section id="products" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#B91C1C", letterSpacing: "2px", textTransform: "uppercase" }}>Our Range</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#1a1a1a", margin: "12px 0 16px" }}>Product Catalog</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#888", maxWidth: 500, margin: "0 auto" }}>Comprehensive range of quality pharmaceutical products for every therapeutic need</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? "#B91C1C" : "#fff", color: filter === cat ? "#fff" : "#666", border: filter === cat ? "none" : "1px solid #e5e5e5", padding: "10px 20px", borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {filtered.map((p, i) => <ProductCard key={p.name} product={p} index={i} />)}
        </div>
        <FadeIn delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "14px 32px", borderRadius: 50, fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s", boxShadow: "0 2px 16px rgba(37,211,102,0.2)" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,211,102,0.3)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(37,211,102,0.2)"; }}>
              <WhatsAppIcon size={18} />
              Enquire About Products
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <FadeIn>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#B91C1C", letterSpacing: "2px", textTransform: "uppercase" }}>About Us</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#1a1a1a", margin: "12px 0 24px", lineHeight: 1.2 }}>Rose Never Compromises<br/>With Quality</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#666", lineHeight: 1.8, margin: "0 0 20px" }}>
                Rose Pharmaco Private Limited is a Mumbai-based pharmaceutical brand committed to delivering world-class healthcare products across India. Our comprehensive range includes antibiotics, analgesics, vitamins, iron supplements, gastrointestinal care, and more.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#666", lineHeight: 1.8, margin: "0 0 32px" }}>
                All our products are manufactured by <strong style={{ color: "#1a1a1a" }}>Akums Drugs & Pharmaceuticals Ltd</strong> — one of India's largest and most trusted contract manufacturers, ensuring the highest standards of quality, safety, and compliance at every stage.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "#B91C1C", fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 8, borderBottom: "2px solid #B91C1C", paddingBottom: 2, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.gap = "12px"; }} onMouseLeave={e => { e.currentTarget.style.gap = "8px"; }}>
                Get in Touch <span style={{ fontSize: 18 }}>→</span>
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🏭", title: "Akums Manufactured", desc: "Products by India's leading contract manufacturer" },
                { icon: "✅", title: "GMP Certified", desc: "Good Manufacturing Practices compliance" },
                { icon: "🚚", title: "Pan India Delivery", desc: "Direct supply across all states" },
                { icon: "💊", title: "30+ Products", desc: "Comprehensive therapeutic range" },
                { icon: "🏥", title: "Direct to Chemists", desc: "Competitive pricing, no middlemen" },
                { icon: "📋", title: "Quality Assured", desc: "Stringent quality control at every step" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#FAFAFA", borderRadius: 16, padding: "24px 20px", border: "1px solid #f0f0f0", transition: "all 0.25s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#f0f0f0"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "12px 0 4px" }}>{item.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#999", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", business: "", city: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name) return;
    const text = encodeURIComponent(`New Enquiry from Website:\n\nName: ${form.name}\nBusiness: ${form.business}\nCity: ${form.city}\nMessage: ${form.message}`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
          <FadeIn>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#B91C1C", letterSpacing: "2px", textTransform: "uppercase" }}>Contact</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#1a1a1a", margin: "12px 0 24px" }}>Let's Work Together</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#666", lineHeight: 1.8, margin: "0 0 40px" }}>
                Whether you're a chemist, hospital, or distributor — we'd love to supply you with quality medicines at competitive rates.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <a href="https://wa.me/919205628098" target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 16, alignItems: "flex-start", textDecoration: "none", color: "inherit" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📞</div>
                  <div>
                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>Phone & WhatsApp</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", margin: 0 }}>+91 92056 28098</p>
                  </div>
                </a>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📍</div>
                  <div>
                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>Mumbai Office</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>Shop No.4, Usha Kunj, Juhu Tara Rd, Chandrabai Nagar, Juhu, Mumbai 400049</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📍</div>
                  <div>
                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>Guwahati Office</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>House No. 39, Krishna Nagar, Chatribari, Guwahati, Kamrup, Assam 781008</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", border: "1px solid #f0f0f0", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1a1a1a", margin: "0 0 24px" }}>Send an Enquiry</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ fontFamily: "'DM Sans', sans-serif", padding: "14px 18px", borderRadius: 12, border: "1px solid #e5e5e5", fontSize: 14, outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#B91C1C"} onBlur={e => e.target.style.borderColor = "#e5e5e5"} />
                <select value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} style={{ fontFamily: "'DM Sans', sans-serif", padding: "14px 18px", borderRadius: 12, border: "1px solid #e5e5e5", fontSize: 14, outline: "none", color: form.business ? "#1a1a1a" : "#999", background: "#fff" }}>
                  <option value="">Business Type</option>
                  <option value="Chemist / Medical Store">Chemist / Medical Store</option>
                  <option value="Hospital / Nursing Home">Hospital / Nursing Home</option>
                  <option value="Distributor / Wholesaler">Distributor / Wholesaler</option>
                  <option value="Other">Other</option>
                </select>
                <input placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={{ fontFamily: "'DM Sans', sans-serif", padding: "14px 18px", borderRadius: 12, border: "1px solid #e5e5e5", fontSize: 14, outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#B91C1C"} onBlur={e => e.target.style.borderColor = "#e5e5e5"} />
                <textarea placeholder="Your message or product enquiry..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ fontFamily: "'DM Sans', sans-serif", padding: "14px 18px", borderRadius: 12, border: "1px solid #e5e5e5", fontSize: 14, outline: "none", resize: "vertical", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "#B91C1C"} onBlur={e => e.target.style.borderColor = "#e5e5e5"} />
                <button onClick={handleSubmit} disabled={!form.name} style={{ fontFamily: "'DM Sans', sans-serif", background: form.name ? "#B91C1C" : "#ddd", color: "#fff", padding: "16px", borderRadius: 12, border: "none", fontSize: 15, fontWeight: 600, cursor: form.name ? "pointer" : "default", transition: "all 0.2s" }} onMouseEnter={e => { if (form.name) e.currentTarget.style.background = "#991B1B"; }} onMouseLeave={e => { if (form.name) e.currentTarget.style.background = "#B91C1C"; }}>
                  {submitted ? "✓ Sent Successfully!" : "Send via WhatsApp"}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0f1117", padding: "56px 24px 36px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <RoseLogo size={36} light={true} />
              <div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#fff", display: "block", lineHeight: 1.2 }}>Rose Pharmaco Pvt. Ltd.</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.5px" }}>Est. 2000 · Mumbai, India</span>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 16px", fontStyle: "italic" }}>"World Class Quality for Well Being"</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.2)", color: "#25D366", padding: "8px 18px", borderRadius: 50, fontSize: 13, fontWeight: 500, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,211,102,0.2)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,211,102,0.12)"; }}>
              <WhatsAppIcon size={14} />
              +91 92056 28098
            </a>
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            <div>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["home","Home"],["products","Products"],["about","About"],["contact","Contact"]].map(([id, label]) => (
                  <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>{label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)", margin: 0 }}>© {new Date().getFullYear()} Rose Pharmaco Private Limited. All rights reserved.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.15)", margin: 0 }}>Manufactured by Akums Drugs & Pharmaceuticals Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const [pulse, setPulse] = useState(true);
  useEffect(() => { const t = setTimeout(() => setPulse(false), 5000); return () => clearTimeout(t); }, []);
  return (
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 99, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform 0.25s cubic-bezier(.16,1,.3,1)", animation: pulse ? "wa-pulse 2s ease-in-out infinite" : "none", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      <WhatsAppIcon size={28} />
    </a>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        @keyframes wa-pulse { 0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); } 50% { box-shadow: 0 4px 36px rgba(37,211,102,0.6), 0 0 0 14px rgba(37,211,102,0.08); } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
        ::selection { background: #B91C1C; color: #fff; }
        a { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
