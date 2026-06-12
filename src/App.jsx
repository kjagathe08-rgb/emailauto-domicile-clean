import { useState, useEffect } from "react";

const C = {
  teal: "#0B9E7F", tealLight: "#E6F7F3", tealDark: "#087A62",
  navy: "#0F1E2E", navyLight: "#1C2B3A",
  gray: "#64748B", grayLight: "#F1F5F9",
  white: "#FFFFFF", bg: "#F0F4F8",
  red: "#DC2626", redLight: "#FEF2F2", redBorder: "#FECACA",
  amber: "#D97706", amberLight: "#FFFBEB", amberBorder: "#FDE68A",
  green: "#059669", greenLight: "#ECFDF5", greenBorder: "#A7F3D0",
  blue: "#1D4ED8", blueLight: "#EFF6FF", blueBorder: "#BFDBFE",
  purple: "#7C3AED", purpleLight: "#F5F3FF",
  border: "#E2E8F0", shadow: "0 1px 3px rgba(0,0,0,0.08)",
};

const EMAILS = [
  { id:1,  nom:"Mme Dupont Marie",    email:"marie.dupont@gmail.com", heure:"08:14", type:"devis",       service:"Ménage",   statut:"auto",   urgence:false, reponse:"Bonjour Marie, merci pour votre demande. Ménage à partir de 22 €/h — soit 132 €/mois net après crédit d'impôt pour 3h/semaine. RDV de présentation ?" },
  { id:2,  nom:"M. Bernard Pierre",   email:"p.bernard@orange.fr",    heure:"08:32", type:"rdv",         service:"Ménage",   statut:"auto",   urgence:false, reponse:"Bonjour Pierre, passage du lundi bien décalé au mercredi 10 juin à 14h. Confirmation reçue." },
  { id:3,  nom:"Mme Leroy Christine", email:"c.leroy@sfr.fr",         heure:"09:05", type:"reclamation", service:"Ménage",   statut:"humain", urgence:true,  reponse:"Bonjour Christine, nous sommes sincèrement désolés. Votre message a été transmis en priorité — retour de notre équipe dans l'heure." },
  { id:4,  nom:"M. Martin Thomas",    email:"t.martin@hotmail.fr",    heure:"09:20", type:"devis",       service:"Garderie", statut:"auto",   urgence:false, reponse:"Bonjour Thomas, garde d'enfants à partir de 13 €/h net, avance immédiate du crédit d'impôt. Présentation sans engagement ?" },
  { id:5,  nom:"Mme Petit Isabelle",  email:"i.petit@gmail.com",      heure:"10:15", type:"facturation", service:"Ménage",   statut:"auto",   urgence:false, reponse:"Bonjour Isabelle, votre facture de mai est en pièce jointe. Pour le CESU, oui nous l'acceptons." },
  { id:6,  nom:"M. Moreau Julien",    email:"j.moreau@free.fr",       heure:"10:44", type:"devis",       service:"Ménage",   statut:"auto",   urgence:false, reponse:"Bonjour Julien, intervention de 2h/semaine à partir de 22 €/h — soit 88 €/mois net après crédit d'impôt. On se rencontre ?" },
  { id:7,  nom:"Mme Garcia Sofia",    email:"s.garcia@gmail.com",     heure:"11:02", type:"rdv",         service:"Garderie", statut:"auto",   urgence:false, reponse:"Bonjour Sofia, RDV du jeudi bien noté. Je vous confirme la disponibilité de notre intervenante." },
  { id:8,  nom:"M. Roux Emmanuel",    email:"e.roux@yahoo.fr",        heure:"11:33", type:"devis",       service:"Ménage",   statut:"auto",   urgence:false, reponse:"Bonjour Emmanuel, ménage à partir de 22 €/h. 50% récupérés via crédit d'impôt. Disponible pour un échange ?" },
  { id:9,  nom:"Mme Lambert Céline",  email:"c.lambert@orange.fr",    heure:"13:05", type:"reclamation", service:"Ménage",   statut:"humain", urgence:true,  reponse:"Bonjour Céline, nous prenons votre retour très au sérieux. Notre responsable vous recontacte rapidement." },
  { id:10, nom:"M. Fontaine Hugo",    email:"h.fontaine@gmail.com",   heure:"13:47", type:"devis",       service:"Garderie", statut:"auto",   urgence:false, reponse:"Bonjour Hugo, garde périscolaire à partir de 13 €/h net. Crédit d'impôt immédiat disponible. RDV ?" },
  { id:11, nom:"Mme Chevalier Anne",  email:"a.chevalier@sfr.fr",     heure:"14:20", type:"facturation", service:"Ménage",   statut:"auto",   urgence:false, reponse:"Bonjour Anne, facture d'avril jointe. N'hésitez pas pour toute question." },
  { id:12, nom:"M. Simon Nicolas",    email:"n.simon@free.fr",        heure:"15:08", type:"devis",       service:"Ménage",   statut:"auto",   urgence:false, reponse:"Bonjour Nicolas, ménage 3h/quinzaine à partir de 22 €/h. 50% récupérés via crédit d'impôt. On en parle ?" },
];

const anonymize = (emails) => emails.map((e, i) => ({
  ...e, nom: `Client ${String.fromCharCode(65 + i)}`, email: "c****@gmail.com",
}));

const TYPES = {
  devis:       { label: "Devis",       icon: "📋", color: C.blue,   bg: C.blueLight,   border: C.blueBorder },
  rdv:         { label: "RDV",         icon: "📅", color: C.teal,   bg: C.tealLight,   border: "#99E6D5" },
  reclamation: { label: "Réclamation", icon: "⚠️", color: C.red,    bg: C.redLight,    border: C.redBorder },
  facturation: { label: "Facturation", icon: "🧾", color: C.amber,  bg: C.amberLight,  border: C.amberBorder },
};

const STATUTS = {
  auto:   { label: "Auto",          color: C.green,  bg: C.greenLight,  border: C.greenBorder },
  humain: { label: "Humain requis", color: C.red,    bg: C.redLight,    border: C.redBorder },
};

function Badge({ cfg, size = "sm" }) {
  const pad = size === "lg" ? "5px 14px" : "3px 10px";
  const fs = size === "lg" ? 13 : 11;
  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      padding: pad, borderRadius: 20,
      fontSize: fs, fontWeight: 700, whiteSpace: "nowrap",
    }}>{cfg.label}</span>
  );
}

function StatCard({ label, value, sub, topColor, icon }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = parseInt(value);
    if (isNaN(t)) { setN(value); return; }
    let cur = 0;
    const step = Math.ceil(t / 24);
    const iv = setInterval(() => {
      cur = Math.min(cur + step, t);
      setN(cur);
      if (cur >= t) clearInterval(iv);
    }, 35);
    return () => clearInterval(iv);
  }, [value]);

  return (
    <div style={{
      background: C.white, borderRadius: 14,
      boxShadow: C.shadow, flex: 1, minWidth: 150,
      overflow: "hidden",
    }}>
      <div style={{ height: 4, background: topColor }} />
      <div style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 600, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
          <span style={{ fontSize: 20 }}>{icon}</span>
        </div>
        <p style={{ margin: 0, fontSize: 48, fontWeight: 800, color: C.navy, lineHeight: 1, letterSpacing: "-2px" }}>
          {typeof n === "number" ? n : value}{typeof value === "string" && value.includes("%") ? "%" : ""}
        </p>
        {sub && <p style={{ margin: "8px 0 0", fontSize: 12, color: C.gray }}>{sub}</p>}
      </div>
    </div>
  );
}

function FilterTab({ label, icon, count, color, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600,
      border: active ? `2px solid ${color}` : `2px solid transparent`,
      background: active ? color + "15" : C.white,
      color: active ? color : C.gray,
      cursor: "pointer", boxShadow: active ? `0 0 0 0px ${color}` : C.shadow,
      transition: "all .15s",
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span>{label}</span>
      <span style={{
        background: active ? color : C.grayLight,
        color: active ? C.white : C.gray,
        borderRadius: 20, padding: "1px 8px", fontSize: 12, fontWeight: 700,
      }}>{count}</span>
    </button>
  );
}

export default function App() {
  const [demo, setDemo] = useState(true);
  const [filter, setFilter] = useState("tous");
  const [expanded, setExpanded] = useState(null);

  const raw = demo ? anonymize(EMAILS) : EMAILS;
  const filtered = filter === "tous" ? raw : raw.filter(e => e.type === filter);
  const urgents = raw.filter(e => e.urgence);
  const auto = raw.filter(e => e.statut === "auto");
  const devisAll = raw.filter(e => e.type === "devis");
  const tauxAuto = Math.round((auto.length / raw.length) * 100);

  const TABS = [
    { key: "tous",        label: "Tous",         icon: "📨", count: raw.length,                                  color: C.navy },
    { key: "devis",       label: "Devis",        icon: "📋", count: raw.filter(e=>e.type==="devis").length,       color: C.blue },
    { key: "rdv",         label: "RDV",          icon: "📅", count: raw.filter(e=>e.type==="rdv").length,         color: C.teal },
    { key: "reclamation", label: "Réclamations", icon: "⚠️", count: raw.filter(e=>e.type==="reclamation").length, color: C.red },
    { key: "facturation", label: "Facturation",  icon: "🧾", count: raw.filter(e=>e.type==="facturation").length, color: C.amber },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: C.navy, padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, background: C.teal, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 16 }}>✉</span>
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: 16, color: C.white, letterSpacing: "-0.3px" }}>Email Auto</span>
              {!demo && <span style={{ marginLeft: 8, fontSize: 12, color: "#94A3B8" }}>· Domicile Clean</span>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {urgents.length > 0 && (
              <div style={{ background: C.red, color: C.white, borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <span>⚠</span> {urgents.length} urgent{urgents.length > 1 ? "s" : ""}
              </div>
            )}
            <button onClick={() => setDemo(!demo)} style={{
              background: demo ? C.teal : "#334155",
              color: C.white, border: "none", borderRadius: 8,
              padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              {demo ? "🔒 Mode démo" : "🔴 Données réelles"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 32px" }}>

        {/* Stats */}
        <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
          <StatCard label="Emails traités"  value={raw.length}    sub="Aujourd'hui"              topColor={C.navy}  icon="📨" />
          <StatCard label="Réponses auto"   value={auto.length}   sub={`${tauxAuto}% du total`}  topColor={C.teal}  icon="⚡" />
          <StatCard label="Devis envoyés"   value={devisAll.length} sub="Réponse < 3 min"        topColor={C.blue}  icon="📋" />
          <StatCard label="Taux d'auto"     value={`${tauxAuto}`} sub="Objectif : 90%"            topColor={tauxAuto >= 85 ? C.green : C.amber} icon="🎯" />
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          {TABS.map(t => (
            <FilterTab key={t.key} label={t.label} icon={t.icon} count={t.count}
              color={t.color} active={filter === t.key}
              onClick={() => setFilter(t.key)} />
          ))}
        </div>

        {/* Email list */}
        <div style={{ background: C.white, borderRadius: 14, boxShadow: C.shadow, overflow: "hidden" }}>

          {/* List header */}
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAFBFC" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.navy }}>
              Emails traités — {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <span style={{ fontSize: 13, color: C.gray, fontWeight: 500 }}>{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
          </div>

          {filtered.map((email, i) => {
            const typeCfg = TYPES[email.type] || TYPES.devis;
            const statutCfg = STATUTS[email.statut];
            const isOpen = expanded === email.id;

            return (
              <div key={email.id}
                style={{
                  borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none",
                  background: email.urgence ? "#FFFAFA" : (isOpen ? "#FAFEFF" : C.white),
                  cursor: "pointer", transition: "background .1s",
                }}
                onClick={() => setExpanded(isOpen ? null : email.id)}
              >
                {/* Row */}
                <div style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 14 }}>
                  {email.urgence && <div style={{ width: 4, height: 44, background: C.red, borderRadius: 2, flexShrink: 0 }} />}

                  {/* Type icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: typeCfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>{typeCfg.icon}</div>

                  {/* Name + email */}
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.navy }}>{email.nom}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: C.gray }}>{email.email}</p>
                  </div>

                  <span style={{ fontSize: 12, color: C.gray, background: C.grayLight, padding: "3px 10px", borderRadius: 20 }}>{email.service}</span>
                  <span style={{ fontSize: 12, color: C.gray, minWidth: 44 }}>{email.heure}</span>
                  <Badge cfg={typeCfg} />
                  <Badge cfg={statutCfg} />
                  <span style={{ fontSize: 18, color: C.gray, marginLeft: 4 }}>{isOpen ? "▲" : "▼"}</span>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding: "0 24px 20px 24px", borderTop: `1px dashed ${C.border}` }}>
                    <p style={{ margin: "14px 0 8px", fontSize: 11, fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Réponse envoyée automatiquement
                    </p>
                    <div style={{
                      background: email.statut === "auto" ? C.greenLight : C.redLight,
                      border: `1px solid ${email.statut === "auto" ? C.greenBorder : C.redBorder}`,
                      borderRadius: 10, padding: "12px 16px",
                      fontSize: 14, color: C.navyLight, lineHeight: 1.65,
                    }}>
                      {email.reponse}
                    </div>
                    {email.statut === "humain" && (
                      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                        <button style={{ padding: "8px 18px", background: C.teal, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                          ✓ Marquer comme traité
                        </button>
                        <button style={{ padding: "8px 18px", background: C.grayLight, color: C.gray, border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                          📞 Rappeler le client
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontSize: 11, color: C.gray }}>Make.com + Claude API + Airtable</p>
          <p style={{ margin: 0, fontSize: 11, color: demo ? C.teal : C.red, fontWeight: 700 }}>
            {demo ? "🔒 Données anonymisées" : "🔴 Données réelles"}
          </p>
        </div>
      </div>
    </div>
  );
}
