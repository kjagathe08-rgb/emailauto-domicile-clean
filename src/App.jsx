import { useState, useEffect } from "react";

const C = {
  teal: "#0B9E7F", tealLight: "#E6F7F3", tealDark: "#087A62",
  navy: "#1C2B3A", navyLight: "#2D3F52",
  gray: "#64748B", grayLight: "#F1F5F9",
  white: "#FFFFFF", bg: "#F7FAFB",
  red: "#DC2626", redLight: "#FEF2F2",
  amber: "#D97706", amberLight: "#FFFBEB",
  green: "#059669", greenLight: "#ECFDF5",
  blue: "#2563EB", blueLight: "#EFF6FF",
  border: "#E2E8F0",
};

const EMAILS = [
  { id: 1, nom: "Mme Dupont Marie", email: "marie.dupont@gmail.com", heure: "08:14", type: "devis", service: "Ménage", statut: "auto", urgence: false, reponse: "Bonjour Marie, merci pour votre demande. Ménage à partir de 22 €/h — soit 132 €/mois net après crédit d'impôt pour 3h/semaine. RDV de présentation ?" },
  { id: 2, nom: "M. Bernard Pierre", email: "p.bernard@orange.fr", heure: "08:32", type: "rdv", service: "Ménage", statut: "auto", urgence: false, reponse: "Bonjour Pierre, passage du lundi bien décalé au mercredi 10 juin à 14h. Confirmation reçue." },
  { id: 3, nom: "Mme Leroy Christine", email: "c.leroy@sfr.fr", heure: "09:05", type: "reclamation", service: "Ménage", statut: "humain", urgence: true, reponse: "Bonjour Christine, nous sommes sincèrement désolés. Votre message a été transmis en priorité — retour de notre équipe dans l'heure." },
  { id: 4, nom: "M. Martin Thomas", email: "t.martin@hotmail.fr", heure: "09:20", type: "devis", service: "Garderie", statut: "auto", urgence: false, reponse: "Bonjour Thomas, garde d'enfants à partir de 13 €/h net, avance immédiate du crédit d'impôt. Présentation sans engagement ?" },
  { id: 5, nom: "Mme Petit Isabelle", email: "i.petit@gmail.com", heure: "10:15", type: "facturation", service: "Ménage", statut: "auto", urgence: false, reponse: "Bonjour Isabelle, votre facture de mai est en pièce jointe. Pour le CESU, oui nous l'acceptons." },
  { id: 6, nom: "M. Moreau Julien", email: "j.moreau@free.fr", heure: "10:44", type: "devis", service: "Ménage", statut: "auto", urgence: false, reponse: "Bonjour Julien, intervention de 2h/semaine à partir de 22 €/h — soit 88 €/mois net après crédit d'impôt. On se rencontre ?" },
  { id: 7, nom: "Mme Garcia Sofia", email: "s.garcia@gmail.com", heure: "11:02", type: "rdv", service: "Garderie", statut: "auto", urgence: false, reponse: "Bonjour Sofia, RDV du jeudi bien noté. Je vous confirme la disponibilité de notre intervenante." },
  { id: 8, nom: "M. Roux Emmanuel", email: "e.roux@yahoo.fr", heure: "11:33", type: "devis", service: "Ménage", statut: "auto", urgence: false, reponse: "Bonjour Emmanuel, ménage à partir de 22 €/h. 50 % récupérés via crédit d'impôt. Disponible pour un échange ?" },
  { id: 9, nom: "Mme Lambert Céline", email: "c.lambert@orange.fr", heure: "13:05", type: "reclamation", service: "Ménage", statut: "humain", urgence: true, reponse: "Bonjour Céline, nous prenons votre retour très au sérieux. Notre responsable vous recontacte rapidement." },
  { id: 10, nom: "M. Fontaine Hugo", email: "h.fontaine@gmail.com", heure: "13:47", type: "devis", service: "Garderie", statut: "auto", urgence: false, reponse: "Bonjour Hugo, garde périscolaire à partir de 13 €/h net. Crédit d'impôt immédiat disponible. RDV ?" },
  { id: 11, nom: "Mme Chevalier Anne", email: "a.chevalier@sfr.fr", heure: "14:20", type: "facturation", service: "Ménage", statut: "auto", urgence: false, reponse: "Bonjour Anne, facture d'avril jointe. N'hésitez pas pour toute question." },
  { id: 12, nom: "M. Simon Nicolas", email: "n.simon@free.fr", heure: "15:08", type: "devis", service: "Ménage", statut: "auto", urgence: false, reponse: "Bonjour Nicolas, ménage 3h/quinzaine à partir de 22 €/h. 50 % récupérés via crédit d'impôt. On en parle ?" },
];

const anonymize = (emails) => emails.map((e, i) => ({
  ...e,
  nom: `Client ${String.fromCharCode(65 + i)}`,
  email: "c****@gmail.com",
}));

const TYPE_CONFIG = {
  devis:       { label: "Devis",       bg: "#EFF6FF", color: "#2563EB" },
  rdv:         { label: "RDV",         bg: "#E6F7F3", color: "#0B9E7F" },
  reclamation: { label: "Réclamation", bg: "#FEF2F2", color: "#DC2626" },
  facturation: { label: "Facturation", bg: "#FFFBEB", color: "#D97706" },
};

const STATUT_CONFIG = {
  auto:   { label: "Auto",          bg: "#ECFDF5", color: "#059669" },
  humain: { label: "Humain requis", bg: "#FEF2F2", color: "#DC2626" },
};

function Badge({ config, small }) {
  return (
    <span style={{
      background: config.bg, color: config.color,
      padding: small ? "2px 8px" : "3px 10px",
      borderRadius: 20, fontSize: small ? 11 : 12,
      fontWeight: 600, whiteSpace: "nowrap",
    }}>{config.label}</span>
  );
}

function StatCard({ label, value, sub, color, icon }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    const target = parseInt(value);
    if (isNaN(target)) { setDisplayed(value); return; }
    let start = 0;
    const step = Math.ceil(target / 20);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setDisplayed(target); clearInterval(t); }
      else setDisplayed(start);
    }, 40);
    return () => clearInterval(t);
  }, [value]);

  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: "20px 24px",
      flex: 1, minWidth: 140,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 500, color: C.gray, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
          <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: color || C.navy, lineHeight: 1 }}>
            {typeof displayed === "number" ? displayed : value}
            {typeof value === "string" && value.includes("%") ? "%" : ""}
          </p>
          {sub && <p style={{ margin: "6px 0 0", fontSize: 12, color: C.gray }}>{sub}</p>}
        </div>
        <span style={{ fontSize: 22 }}>{icon}</span>
      </div>
    </div>
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
  const devis = raw.filter(e => e.type === "devis");
  const tauxAuto = Math.round((auto.length / raw.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: C.teal, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>✉</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>Email Auto</span>
            {!demo && <span style={{ marginLeft: 4, fontSize: 12, color: C.gray }}>· Domicile Clean</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {urgents.length > 0 && (
              <div style={{ background: C.redLight, color: C.red, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>
                ⚠ {urgents.length} urgent{urgents.length > 1 ? "s" : ""}
              </div>
            )}
            <button onClick={() => setDemo(!demo)} style={{
              background: demo ? C.tealLight : C.grayLight,
              color: demo ? C.teal : C.gray,
              border: "none", borderRadius: 8,
              padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>
              {demo ? "🔒 Mode démo" : "🔴 Données réelles"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px" }}>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <StatCard label="Emails traités" value={raw.length} sub="Aujourd'hui" icon="📨" color={C.navy} />
          <StatCard label="Réponses auto" value={auto.length} sub={`${tauxAuto}% du total`} icon="⚡" color={C.teal} />
          <StatCard label="Devis envoyés" value={devis.length} sub="Réponse < 3 min" icon="📋" color={C.blue} />
          <StatCard label="Taux d'auto" value={`${tauxAuto}`} sub="Objectif : 90%" icon="🎯" color={tauxAuto >= 85 ? C.green : C.amber} />
        </div>

        {/* Filtres */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {[
            { key: "tous",        label: `Tous (${raw.length})` },
            { key: "devis",       label: `Devis (${raw.filter(e => e.type === "devis").length})` },
            { key: "rdv",         label: `RDV (${raw.filter(e => e.type === "rdv").length})` },
            { key: "reclamation", label: `Réclamations (${raw.filter(e => e.type === "reclamation").length})` },
            { key: "facturation", label: `Facturation (${raw.filter(e => e.type === "facturation").length})` },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500,
              border: filter === f.key ? `1.5px solid ${C.teal}` : `1px solid ${C.border}`,
              background: filter === f.key ? C.tealLight : C.white,
              color: filter === f.key ? C.teal : C.gray,
              cursor: "pointer",
            }}>{f.label}</button>
          ))}
        </div>

        {/* Email list */}
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.navy }}>
              Emails traités — {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: C.gray }}>{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</p>
          </div>

          {filtered.map((email, i) => (
            <div key={email.id}
              style={{
                borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none",
                background: email.urgence ? "#FFFAFA" : C.white,
                cursor: "pointer",
              }}
              onClick={() => setExpanded(expanded === email.id ? null : email.id)}
            >
              <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                {email.urgence && <div style={{ width: 3, height: 36, background: C.red, borderRadius: 2, flexShrink: 0 }} />}
                <span style={{ fontSize: 12, color: C.gray, minWidth: 40 }}>{email.heure}</span>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.navy }}>{email.nom}</p>
                  <p style={{ margin: 0, fontSize: 11, color: C.gray }}>{email.email}</p>
                </div>
                <span style={{ fontSize: 11, color: C.gray, minWidth: 50 }}>{email.service}</span>
                <Badge config={TYPE_CONFIG[email.type] || TYPE_CONFIG.devis} small />
                <Badge config={STATUT_CONFIG[email.statut]} small />
                <span style={{ fontSize: 12, color: C.gray, marginLeft: "auto" }}>{expanded === email.id ? "▲" : "▼"}</span>
              </div>

              {expanded === email.id && (
                <div style={{ padding: "0 20px 16px 20px", borderTop: `1px dashed ${C.border}` }}>
                  <p style={{ margin: "12px 0 6px", fontSize: 11, fontWeight: 600, color: C.gray, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Réponse envoyée automatiquement
                  </p>
                  <div style={{
                    background: email.statut === "auto" ? C.greenLight : C.redLight,
                    border: `1px solid ${email.statut === "auto" ? "#A7F3D0" : "#FECACA"}`,
                    borderRadius: 8, padding: "10px 14px",
                    fontSize: 13, color: C.navyLight, lineHeight: 1.6,
                  }}>
                    {email.reponse}
                  </div>
                  {email.statut === "humain" && (
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                      <button style={{ padding: "6px 16px", background: C.teal, color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        Marquer comme traité
                      </button>
                      <button style={{ padding: "6px 16px", background: C.grayLight, color: C.gray, border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                        Rappeler le client
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontSize: 11, color: C.gray }}>Make.com + Claude API + Airtable</p>
          <p style={{ margin: 0, fontSize: 11, color: demo ? C.teal : C.red, fontWeight: 600 }}>
            {demo ? "🔒 Mode démo — données anonymisées" : "🔴 Données réelles"}
          </p>
        </div>
      </div>
    </div>
  );
}
