import { useState } from "react";

// ── DATA DEFINITIONS ────────────────────────────────────────────────────────

const METRICS = [
  { id: "nss_teaching_quality",      label: "NSS: Teaching Quality",          controllability: 72, description: "National Student Survey — teaching quality", unit: "%", min: 60, max: 100, benchmarkLow: 72, benchmarkMid: 84.55, benchmarkTop: 92.2, sourceused: "Times" },
  { id: "nss_assessment",    label: "NSS: Assessment & Feedback",     controllability: 78, description: "National Student Survey — assessment & feedback", unit: "%", min: 50, max: 100, benchmarkLow: 65, benchmarkMid: 81.4, benchmarkTop: 92.6, sourceused: "Guardian" },
  { id: "nss_overall",       label: "NSS: Overall Satisfaction",      controllability: 58, description: "National Student Survey — overall satisfaction score", unit: "%", min: 55, max: 100, benchmarkLow: 68, benchmarkMid: 78, benchmarkTop: 83, sourceused: "CUG" },
  { id: "nss_student_experience", label: "NSS: Student Experience", controllability: 63, description: "National Student Survey - student experience score", unit: "%", min: 55, max: 100, benchmarkLow: 65.9, benchmarkMid: 81.1, benchmarkTop: 88.7, sourceused:"Times" },
  { id: "nss_support", label: "NSS: Student Support", controllability: 71, description: "National Student Survey - student support score", unit: "%", min: 55, max: 100, benchmarkLow: 70.1, benchmarkMid: 82.7, benchmarkTop: 91.4, sourceused: "DailyMail" },
  { id: "nss_teaching_excellence", label: "NSS: Teaching Excellence", controllability: 73, description: "National Student Survey - teaching excellence score", unit: "%", min: 55, max: 100, benchmarkLow: 72.4, benchmarkMid: 85.2, benchmarkTop: 92.5, sourceused: "DailyMail" },
  { id: "nss_teaching_on_course", label: "NSS:Teaching on my Course", controllability: 74, description: "National Student Survey - teaching on my course score", unit: "%", min: 55, max: 100, benchmarkLow: 80.1, benchmarkMid: 82, benchmarkTop: 94, sourceused: "Guardian" },
  { id: "continuation",      label: "Continuation / Completion",       controllability: 67, description: "% of students continuing to next year of study", unit: "%", min: 70, max: 100, benchmarkLow: 75.9, benchmarkMid: 89.2, benchmarkTop: 98.4, sourceused: "Guardian" },
  { id: "graduate_outcomes", label: "Graduate Outcomes (Employment)",  controllability: 47, description: "% in highly skilled employment or further study 15 months after graduation (HESA)", unit: "%", min: 55, max: 100, benchmarkLow: 67, benchmarkMid: 79, benchmarkTop: 95, sourceused: "Guardian" },
  { id: "entry_tariff",      label: "Entry Tariff",                   controllability: 56, description: "Average UCAS tariff points of new entrants", unit: "pts", min: 80, max: 220, benchmarkLow: 93, benchmarkMid: 123, benchmarkTop: 210, sourceused: "Guardian" },
  { id: "staff_student",     label: "Staff–Student Ratio",            controllability: 72, description: "Students per academic FTE (lower = better)", unit: ":1", min: 8, max: 35, benchmarkLow: 23, benchmarkMid: 15.1, benchmarkTop: 9.1, lowerIsBetter: true, sourceused: "Guardian" },
  { id: "academic_services_spend", label: "Academic Services Spend",        controllability: 84, description: "Expenditure on academic services per student (£)", unit: "pts", min: 0, max: 10, benchmarkLow: 1.7, benchmarkMid: 4.9, benchmarkTop: 10, sourceused: "Guardian" },
  { id: "facilities_spend",  label: "Facilities Spend",               controllability: 80, description: "Expenditure on student facilities per student (£)", unit: "£", min: 200, max: 3800, benchmarkLow: 117, benchmarkMid: 691.5, benchmarkTop: 2164, sourceused: "CUG" },
  { id: "research_quality",  label: "Research Quality (REF)",         controllability: 34, description: "GPA-weighted REF output/impact/environment scores (max 4.0)", unit: "GPA", min: 1.0, max: 4.0, benchmarkLow: 1.74, benchmarkMid: 2.99, benchmarkTop: 3.63, sourceused: "CUG" },
  { id: "research_intensity",label: "Research Intensity",             controllability: 44, description: "Proportion of staff submitted to REF (%)", unit: "%", min: 10, max: 100, benchmarkLow: 10, benchmarkMid: 45.5, benchmarkTop: 100, sourceused: "CUG" },
  { id: "degree_classification", label: "Good Honours Rate",          controllability: 52, description: "% of graduates achieving 1st or 2:1", unit: "%", min: 50, max: 100, benchmarkLow: 54, benchmarkMid: 75.6, benchmarkTop: 93, sourceused: "Times" },
  { id: "research_income", label: "Research Income", controllability: 39, description: "Per capita measure of research grants and contracts", unit: "£", min: 0, max: 120000, benchmarkLow: 0, benchmarkMid: 14637, benchmarkTop: 111032, sourceused: "DailyMail" }, 
  { id: "graduate_on_track", label: "Graduate Prospects on Track", controllability: 50, description: "Measure of how many students felt their career is on track", unit: "%", min: 0, max: 100, benchmarkLow: 62.3, benchmarkMid: 75.7, benchmarkTop: 86.9, sourceused: "CUG" },
  { id: "graduate_salaries", label: "Graduate Salaries", controllability: 18, description: "median salary of first-degree, UK-domiciled graduates in full-time paid UK employment", unit: "£", min: 20000, max: 40000, benchmarkLow: 22000, benchmarkMid: 27500, benchmarkTop: 37000, sourceused: "DailyMail" },
  { id: "first_generation", label: "First Generation Students", controllability: 28, description: "The proportion of UK-domiciled undergraduate students whose parents did not attend university", unit: "%", min: 10, max: 100, benchmarkLow: 15.7, benchmarkMid: 43, benchmarkTop: 73.6, sourceused: "DailyMail" },
  { id: "value_added", label: "Value Added Score", controllability: 61, description: "Tracks student from enrolment to graduation and how a university supports its students towards good grades", unit: "pts", min: 0, max: 10, benchmarkLow: 2, benchmarkMid: 5.4, benchmarkTop: 8, sourceused: "CUG" },
  { id: "people_planet", label: "People & Planet Score", controllability: 69, description: "Score derived from the sustainability ranking People & Planet", unit: "pts", min: 10, max: 100, benchmarkLow: 10.5, benchmarkMid: 50.6, benchmarkTop: 80.7, sourceused: "Times" }
];

const TABLES = [
  { id: "guardian", label: "Guardian",              shortLabel: "Guard.",   color: "#005689" },
  { id: "times",    label: "Times / Sunday Times",  shortLabel: "Times",    color: "#c8102e" },
  { id: "cug",      label: "Complete University Guide", shortLabel: "CUG",  color: "#2d6a4f" },
  { id: "dailymail",  label: "Daily Mail",               shortLabel: "Daily",  color: "#7b2d8b" },
];

const WEIGHTS = {
  guardian:   { nss_teaching_quality: 0,  nss_assessment: 10, nss_overall: 0,  nss_student_experience: 0, nss_support: 0,  nss_teaching_excellence: 0,  nss_teaching_on_course: 10, continuation: 15, graduate_outcomes: 15, entry_tariff: 15, staff_student: 15, facilities_spend: 0, research_quality: 0,  research_intensity: 0, degree_classification: 0,  research_income: 0, graduate_on_track: 0, graduate_salaries: 0, academic_services_spend: 0, first_generation: 0, value_added: 15, people_planet: 0},
  times:      { nss_teaching_quality: 13, nss_assessment: 0,  nss_overall: 0,  nss_student_experience: 6, nss_support: 0,  nss_teaching_excellence: 0,  nss_teaching_on_course: 0,  continuation: 13, graduate_outcomes: 19, entry_tariff: 13, staff_student: 0,  facilities_spend: 0, research_quality: 19, research_intensity: 0, degree_classification: 13, research_income: 0, graduate_on_track: 0, graduate_salaries: 0, academic_services_spend: 0, first_generation: 0, value_added: 0,  people_planet: 6},
  cug:        { nss_teaching_quality: 0,  nss_assessment: 0,  nss_overall: 19, nss_student_experience: 0, nss_support: 0,  nss_teaching_excellence: 0,  nss_teaching_on_course: 0,  continuation: 13, graduate_outcomes: 8,  entry_tariff: 13, staff_student: 13, facilities_spend: 6, research_quality: 13, research_intensity: 6, degree_classification: 0,  research_income: 0, graduate_on_track: 4, graduate_salaries: 0, academic_services_spend: 6, first_generation: 0, value_added: 0,  people_planet: 0},
  dailymail:  { nss_teaching_quality: 0,  nss_assessment: 0,  nss_overall: 0,  nss_student_experience: 5, nss_support: 10, nss_teaching_excellence: 10, nss_teaching_on_course: 0,  continuation: 10,  graduate_outcomes: 15, entry_tariff: 5,  staff_student: 0,  facilities_spend: 0, research_quality: 10, research_intensity: 0, degree_classification: 10, research_income: 5, graduate_on_track: 5, graduate_salaries: 5, academic_services_spend: 0, first_generation: 10, value_added: 0, people_planet: 0},
};

const CONTROLLABILITY_BANDS = [
  { min: 70, label: "High Control",   color: "#22c55e", bg: "#f0fdf4" },
  { min: 45, label: "Med. Control",   color: "#f59e0b", bg: "#fffbeb" },
  { min: 0,  label: "Lower Control",  color: "#ef4444", bg: "#fef2f2" },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────

function getBand(val) { return CONTROLLABILITY_BANDS.find(b => val >= b.min); }
function getTableImpact(id) { return TABLES.map(t => ({ table: t, weight: WEIGHTS[t.id][id] || 0 })).filter(x => x.weight > 0); }
function getTotalInfluence(id) { return TABLES.reduce((s, t) => s + (WEIGHTS[t.id][id] || 0), 0); }
function getPriority(id, ctrl) { return Math.round((getTotalInfluence(id) / TABLES.length) * (ctrl / 100)); }

// Normalise a raw score to 0–100 for a metric, respecting lowerIsBetter
function normalise(m, val) {
  if (val === null || val === undefined || val === "") return null;
  const v = parseFloat(val);
  if (isNaN(v)) return null;
  const range = m.max - m.min;
  if (range === 0) return 50;
  if (m.lowerIsBetter) return Math.max(0, Math.min(100, ((m.max - v) / range) * 100));
  return Math.max(0, Math.min(100, ((v - m.min) / range) * 100));
}

// Gap label relative to benchmarks
function getGapLabel(m, val) {
  if (val === null || val === "") return null;
  const v = parseFloat(val);
  if (isNaN(v)) return null;
  const top = m.benchmarkTop, mid = m.benchmarkMid, low = m.benchmarkLow;
  if (m.lowerIsBetter) {
    if (v <= top) return { label: "Top quartile", color: "#22c55e", bg: "#f0fdf4" };
    if (v <= mid) return { label: "Above median", color: "#84cc16", bg: "#f7fee7" };
    if (v <= low) return { label: "Below median", color: "#f59e0b", bg: "#fffbeb" };
    return { label: "Bottom quartile", color: "#ef4444", bg: "#fef2f2" };
  } else {
    if (v >= top) return { label: "Top quartile", color: "#22c55e", bg: "#f0fdf4" };
    if (v >= mid) return { label: "Above median", color: "#84cc16", bg: "#f7fee7" };
    if (v >= low) return { label: "Below median", color: "#f59e0b", bg: "#fffbeb" };
    return { label: "Bottom quartile", color: "#ef4444", bg: "#fef2f2" };
  }
}

// Compute a weighted score for a table given performance data (0–100)
function tableScore(tableId, perfData) {
  let score = 0, totalWeight = 0;
  METRICS.forEach(m => {
    const w = WEIGHTS[tableId][m.id] || 0;
    if (w === 0) return;
    const n = normalise(m, perfData[m.id]);
    if (n !== null) { score += n * w; totalWeight += w; }
  });
  return totalWeight > 0 ? Math.round((score / totalWeight) * 10) / 10 : null;
}

function hasAnyData(perfData) {
  return METRICS.some(m => perfData[m.id] !== "" && perfData[m.id] !== undefined && perfData[m.id] !== null);
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

const S = {
  card: { background: "#fff", border: "1px solid #e2e0d8", borderRadius: 12, overflow: "hidden" },
  section: { marginBottom: 28 },
  label: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#6b6880" },
};

function GapBar({ m, val }) {
  const norm = normalise(m, val);
  const normLow = normalise(m, m.benchmarkLow);
  const normMid = normalise(m, m.benchmarkMid);
  const normTop = normalise(m, m.benchmarkTop);
  const gapInfo = getGapLabel(m, val);
  if (norm === null) return <div style={{ color: "#ccc", fontSize: 12, fontStyle: "italic" }}>No data entered</div>;

  return (
    <div>
      <div style={{ position: "relative", height: 18, background: "#f0ede6", borderRadius: 99, marginBottom: 4, overflow: "visible" }}>
        {/* Benchmark markers */}
        {[{ n: normLow, label: "Sector low", col: "#f59e0b" }, { n: normMid, label: "Median", col: "#6b6880" }, { n: normTop, label: "Top quartile", col: "#22c55e" }].map(bm => (
          <div key={bm.label} style={{ position: "absolute", left: `${bm.n}%`, top: 0, bottom: 0, width: 2, background: bm.col, transform: "translateX(-50%)", zIndex: 1 }} title={`${bm.label}: ${bm.n?.toFixed(0)}%`} />
        ))}
        {/* Your score bar */}
        <div style={{ position: "absolute", left: 0, top: 2, bottom: 2, width: `${norm}%`, background: gapInfo?.color || "#3b82f6", borderRadius: 99, transition: "width 0.5s ease", zIndex: 2 }} />
        {/* Dot */}
        <div style={{ position: "absolute", left: `${norm}%`, top: "50%", width: 14, height: 14, borderRadius: "50%", background: gapInfo?.color || "#3b82f6", border: "2px solid #fff", transform: "translate(-50%, -50%)", zIndex: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b6880" }}>
        <span>Sector floor</span>
        <span style={{ display: "flex", gap: 12 }}>
          <span style={{ color: "#f59e0b" }}>▏Low</span>
          <span>▏Median</span>
          <span style={{ color: "#22c55e" }}>▏Top</span>
        </span>
        <span>Sector ceiling</span>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("matrix");
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [perfData, setPerfData] = useState(() => Object.fromEntries(METRICS.map(m => [m.id, ""])));
  const [dataEntered, setDataEntered] = useState(false);

  const metric = selectedMetric ? METRICS.find(m => m.id === selectedMetric) : null;
  const sortedByPriority = [...METRICS].sort((a, b) => getPriority(b.id, b.controllability) - getPriority(a.id, a.controllability));

  function updatePerf(id, val) {
    const next = { ...perfData, [id]: val };
    setPerfData(next);
    setDataEntered(hasAnyData(next));
  }

  // Compute gap priority: metrics where we're below median AND high strategic priority
  const gapPriorities = METRICS.map(m => {
    const gap = getGapLabel(m, perfData[m.id]);
    const priority = getPriority(m.id, m.controllability);
    const norm = normalise(m, perfData[m.id]);
    const normMid = normalise(m, m.benchmarkMid);
    return { m, gap, priority, norm, normMid, belowMedian: norm !== null && normMid !== null && norm < normMid };
  }).filter(x => x.gap !== null);

  const TABS = [
    { id: "matrix",  label: "📊 Methodology Matrix" },
    { id: "levers",  label: "🎯 Strategic Levers" },
    { id: "data",    label: "📥 Enter Performance Data" },
    { id: "gap",     label: dataEntered ? "📈 Gap Analysis ●" : "📈 Gap Analysis" },
    { id: "detail",  label: "🔍 Metric Explorer" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#f8f7f4", minHeight: "100vh", color: "#1a1a2e" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "#1a1a2e", color: "#f8f7f4", padding: "28px 40px 24px", borderBottom: "4px solid #c8a96e" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#c8a96e", marginBottom: 8 }}>Strategic Intelligence Tool</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>UK University League Table Navigator</h1>
          <p style={{ margin: "8px 0 0", fontSize: 14, color: "#b0afc4", lineHeight: 1.5 }}>Understand the levers that drive rankings across Guardian, Times, CUG & Daily Mail — and where to focus institutional effort</p>
        </div>
      </div>

      {/* ── NAV ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e0d8", padding: "0 40px", overflowX: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setView(tab.id)} style={{
              background: "none", border: "none", padding: "16px 20px", fontSize: 13,
              fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap",
              borderBottom: view === tab.id ? "3px solid #c8a96e" : "3px solid transparent",
              color: view === tab.id ? "#1a1a2e" : "#6b6880",
              fontWeight: view === tab.id ? 700 : 400,
              transition: "all 0.15s",
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 40px" }}>

        {/* ══════════════════════════════════════════════════════
            VIEW 1 — METHODOLOGY MATRIX
        ══════════════════════════════════════════════════════ */}
        {view === "matrix" && (
          <div>
            <div style={S.section}>
              <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>Which metrics drive which tables?</h2>
              <p style={{ margin: 0, fontSize: 14, color: "#6b6880", lineHeight: 1.6 }}>
                Each cell shows the approximate weighting (%) that metric carries in that table's overall score. Darker = higher weight. Grey = not used. Click any row to explore it in detail.
              </p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "10px 16px", ...S.label, borderBottom: "2px solid #e2e0d8", width: 240 }}>Metric</th>
                    {TABLES.map(t => (
                      <th key={t.id} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, fontSize: 12, borderBottom: "2px solid #e2e0d8", color: t.color, width: 110 }}>{t.shortLabel}</th>
                    ))}
                    <th style={{ padding: "10px 12px", textAlign: "center", ...S.label, borderBottom: "2px solid #e2e0d8", width: 110 }}>Breadth</th>
                    <th style={{ padding: "10px 12px", textAlign: "center", ...S.label, borderBottom: "2px solid #e2e0d8", width: 100 }}>Control</th>
                    {dataEntered && <th style={{ padding: "10px 12px", textAlign: "center", ...S.label, borderBottom: "2px solid #e2e0d8", width: 110 }}>Your Position</th>}
                  </tr>
                </thead>
                <tbody>
                  {METRICS.map((m, i) => {
                    const band = getBand(m.controllability);
                    const tableCount = TABLES.filter(t => (WEIGHTS[t.id][m.id] || 0) > 0).length;
                    const isHovered = hoveredMetric === m.id;
                    const gapInfo = dataEntered ? getGapLabel(m, perfData[m.id]) : null;
                    return (
                      <tr key={m.id}
                        onClick={() => { setSelectedMetric(m.id); setView("detail"); }}
                        onMouseEnter={() => setHoveredMetric(m.id)}
                        onMouseLeave={() => setHoveredMetric(null)}
                        style={{ background: isHovered ? "#f0ede6" : i % 2 === 0 ? "#fff" : "#faf9f6", cursor: "pointer", transition: "background 0.12s" }}>
                        <td style={{ padding: "11px 16px", fontSize: 13, borderBottom: "1px solid #e2e0d8" }}>{m.label}</td>
                        {TABLES.map(t => {
                          const w = WEIGHTS[t.id][m.id] || 0;
                          const intensity = w > 0 ? Math.max(0.18, w / 22) : 0;
                          return (
                            <td key={t.id} style={{ padding: "11px 12px", textAlign: "center", borderBottom: "1px solid #e2e0d8", background: w > 0 ? `${t.color}${Math.round(intensity * 255).toString(16).padStart(2, "0")}` : "transparent" }}>
                              {w > 0 ? <span style={{ fontWeight: 700, fontSize: 13, color: intensity > 0.55 ? "#fff" : t.color }}>{w}%</span> : <span style={{ color: "#ccc" }}>—</span>}
                            </td>
                          );
                        })}
                        <td style={{ padding: "11px 12px", textAlign: "center", borderBottom: "1px solid #e2e0d8" }}>
                          <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
                            {TABLES.map(t => <div key={t.id} style={{ width: 10, height: 10, borderRadius: 2, background: (WEIGHTS[t.id][m.id] || 0) > 0 ? t.color : "#e2e0d8" }} />)}
                          </div>
                          <div style={{ fontSize: 11, color: "#6b6880", marginTop: 2 }}>{tableCount}/{TABLES.length}</div>
                        </td>
                        <td style={{ padding: "11px 12px", textAlign: "center", borderBottom: "1px solid #e2e0d8" }}>
                          <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 12, fontWeight: 700, background: band.bg, color: band.color }}>{m.controllability}%</span>
                        </td>
                        {dataEntered && (
                          <td style={{ padding: "11px 12px", textAlign: "center", borderBottom: "1px solid #e2e0d8" }}>
                            {gapInfo
                              ? <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: gapInfo.bg, color: gapInfo.color }}>{gapInfo.label}</span>
                              : <span style={{ color: "#ccc", fontSize: 12 }}>—</span>}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 20, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "#6b6880" }}><strong>Control:</strong></div>
              {CONTROLLABILITY_BANDS.map(b => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 99, background: b.color }} />
                  <span style={{ color: "#6b6880" }}>{b.label}</span>
                </div>
              ))}
              {!dataEntered && <span style={{ fontSize: 12, color: "#c8a96e", marginLeft: 12 }}>💡 Enter performance data to see your position in the final column</span>}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            VIEW 2 — STRATEGIC LEVERS
        ══════════════════════════════════════════════════════ */}
        {view === "levers" && (
          <div>
            <div style={S.section}>
              <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>Strategic Lever Prioritisation Matrix</h2>
              <p style={{ margin: 0, fontSize: 14, color: "#6b6880", lineHeight: 1.6 }}>
                Metrics plotted by <strong>institutional controllability</strong> (x-axis) vs <strong>cross-table influence</strong> (y-axis). Bubble size = number of tables. <strong>Top-right = highest-priority levers.</strong>
                {dataEntered && " Colour fill shows your current sector position."}
              </p>
            </div>
            <div style={{ position: "relative", background: "#fff", border: "1px solid #e2e0d8", borderRadius: 8, padding: 24 }}>
              <div style={{ position: "relative", height: 480 }}>
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#e2e0d8", zIndex: 0 }} />
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#e2e0d8", zIndex: 0 }} />
                {[
                  { label: "🎯 Priority Levers",  sub: "High influence, high control",   top: "6%",  left: "54%", color: "#22c55e" },
                  { label: "📋 Monitor & Plan",   sub: "High influence, lower control",  top: "6%",  left: "4%",  color: "#f59e0b" },
                  { label: "✅ Table-Specific",   sub: "Lower influence, high control",  top: "60%", left: "54%", color: "#3b82f6" },
                  { label: "⬇ Deprioritise",     sub: "Lower influence, lower control", top: "60%", left: "4%",  color: "#9ca3af" },
                ].map(q => (
                  <div key={q.label} style={{ position: "absolute", top: q.top, left: q.left, zIndex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: q.color }}>{q.label}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{q.sub}</div>
                  </div>
                ))}
                <div style={{ position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "#6b6880", textAlign: "center" }}>← Lower controllability &nbsp;&nbsp;&nbsp; Higher controllability →</div>
                {METRICS.map(m => {
                  const tableCount = TABLES.filter(t => (WEIGHTS[t.id][m.id] || 0) > 0).length;
                  const avgW = tableCount > 0 ? TABLES.reduce((s, t) => s + (WEIGHTS[t.id][m.id] || 0), 0) / tableCount : 0;
                  const xPct = ((m.controllability - 35) / 45) * 85 + 5;
                  const yPct = 90 - ((avgW / 22) * 85);
                  const r = 18 + tableCount * 6;
                  const band = getBand(m.controllability);
                  const gapInfo = dataEntered ? getGapLabel(m, perfData[m.id]) : null;
                  const bubbleFill = gapInfo ? gapInfo.color + "44" : band.color + "33";
                  const bubbleBorder = gapInfo ? gapInfo.color : band.color;
                  return (
                    <div key={m.id}
                      onClick={() => { setSelectedMetric(m.id); setView("detail"); }}
                      title={`${m.label}\nControl: ${m.controllability}%\nAvg weight: ${avgW.toFixed(0)}%\n${tableCount} tables${gapInfo ? "\nYour position: " + gapInfo.label : ""}`}
                      style={{ position: "absolute", left: `${xPct}%`, top: `${yPct}%`, width: r * 2, height: r * 2, borderRadius: "50%", background: bubbleFill, border: `2px solid ${bubbleBorder}`, transform: "translate(-50%,-50%)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.zIndex = 10; e.currentTarget.style.background = bubbleBorder + "66"; }}
                      onMouseLeave={e => { e.currentTarget.style.zIndex = 2; e.currentTarget.style.background = bubbleFill; }}>
                      <span style={{ fontSize: 9, fontWeight: 700, textAlign: "center", color: "#1a1a2e", lineHeight: 1.2, padding: "0 2px", maxWidth: r * 1.8 }}>
                        {m.label.replace("NSS: ", "").replace(" Ratio", "").replace(" Rate", "").substring(0, 20)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {dataEntered && (
              <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap", fontSize: 12 }}>
                <span style={{ color: "#6b6880" }}>Bubble colour = your sector position:</span>
                {[{ label: "Top quartile", color: "#22c55e" }, { label: "Above median", color: "#84cc16" }, { label: "Below median", color: "#f59e0b" }, { label: "Bottom quartile", color: "#ef4444" }].map(s => (
                  <span key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color }} />
                    <span style={{ color: "#6b6880" }}>{s.label}</span>
                  </span>
                ))}
              </div>
            )}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 16, margin: "0 0 16px" }}>Ranked Priority Levers</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {sortedByPriority.slice(0, 10).map((m, i) => {
                  const band = getBand(m.controllability);
                  const tableCount = TABLES.filter(t => (WEIGHTS[t.id][m.id] || 0) > 0).length;
                  const gapInfo = dataEntered ? getGapLabel(m, perfData[m.id]) : null;
                  return (
                    <div key={m.id} onClick={() => { setSelectedMetric(m.id); setView("detail"); }}
                      style={{ background: "#fff", border: "1px solid #e2e0d8", borderRadius: 8, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "box-shadow 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#c8a96e", flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{m.label}</div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, padding: "1px 7px", borderRadius: 99, background: band.bg, color: band.color, fontWeight: 700 }}>{band.label}</span>
                          <span style={{ fontSize: 11, color: "#6b6880" }}>{tableCount} tables</span>
                          {gapInfo && <span style={{ fontSize: 11, padding: "1px 7px", borderRadius: 99, background: gapInfo.bg, color: gapInfo.color, fontWeight: 700 }}>{gapInfo.label}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            VIEW 3 — ENTER PERFORMANCE DATA
        ══════════════════════════════════════════════════════ */}
        {view === "data" && (
          <div>
            <div style={S.section}>
              <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>Enter Your Institution's Performance Data</h2>
              <p style={{ margin: 0, fontSize: 14, color: "#6b6880", lineHeight: 1.6 }}>
                Enter your most recent published figures. Leave blank if data is unavailable — the tool will work with partial data. Values are benchmarked against indicative sector quartiles for the Scottish / UK HE sector.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {METRICS.map(m => {
                const val = perfData[m.id];
                const gapInfo = getGapLabel(m, val);
                return (
                  <div key={m.id} style={{ background: "#fff", border: `1px solid ${gapInfo ? gapInfo.color + "66" : "#e2e0d8"}`, borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>
                          {m.label}{m.sourceused ? ` (${m.sourceused})` : ""}
                        </div>
                        <div style={{ fontSize: 11, color: "#6b6880" }}>{m.description}</div>
                      </div>
                      {gapInfo && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: gapInfo.bg, color: gapInfo.color, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{gapInfo.label}</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                      <input
                        type="number"
                        value={val}
                        onChange={e => updatePerf(m.id, e.target.value)}
                        placeholder={`e.g. ${m.benchmarkMid}`}
                        min={m.min} max={m.max} step={m.unit === "pts" || m.unit === "£" ? 1 : 0.1}
                        style={{ width: 100, padding: "8px 12px", border: "1px solid #e2e0d8", borderRadius: 6, fontSize: 14, fontFamily: "inherit", outline: "none", background: "#f8f7f4" }}
                      />
                      <span style={{ fontSize: 13, color: "#6b6880" }}>{m.unit}</span>
                      <div style={{ flex: 1, fontSize: 11, color: "#9ca3af", lineHeight: 1.4 }}>
                        Sector: <span style={{ color: "#f59e0b" }}>{m.benchmarkLow}{m.unit}</span> → <span>{m.benchmarkMid}{m.unit}</span> → <span style={{ color: "#22c55e" }}>{m.benchmarkTop}{m.unit}</span>
                        {m.lowerIsBetter && " (lower is better)"}
                      </div>
                    </div>
                    {val !== "" && <div style={{ marginTop: 10 }}><GapBar m={m} val={val} /></div>}
                  </div>
                );
              })}
            </div>

            {dataEntered && (
              <div style={{ marginTop: 24, background: "#1a1a2e", borderRadius: 10, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: "#f8f7f4", fontSize: 14 }}>Data entered — head to <strong style={{ color: "#c8a96e" }}>Gap Analysis</strong> to see your strategic picture</div>
                <button onClick={() => setView("gap")} style={{ background: "#c8a96e", color: "#1a1a2e", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
                  View Gap Analysis →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            VIEW 4 — GAP ANALYSIS
        ══════════════════════════════════════════════════════ */}
        {view === "gap" && (
          <div>
            <div style={S.section}>
              <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>Gap Analysis & Ranking Score Simulation</h2>
              <p style={{ margin: 0, fontSize: 14, color: "#6b6880", lineHeight: 1.6 }}>
                Your performance benchmarked against sector quartiles, weighted by each table's methodology. Scores are normalised — they indicate relative positioning, not actual published scores.
              </p>
            </div>

            {!dataEntered ? (
              <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 12, border: "1px solid #e2e0d8" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📥</div>
                <div style={{ fontSize: 16, marginBottom: 12 }}>No performance data entered yet</div>
                <button onClick={() => setView("data")} style={{ background: "#1a1a2e", color: "#c8a96e", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
                  Enter Performance Data →
                </button>
              </div>
            ) : (
              <>
                {/* Table score cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
                  {TABLES.map(t => {
                    const score = tableScore(t.id, perfData);
                    const benchScore = tableScore(t.id, Object.fromEntries(METRICS.map(m => [m.id, m.benchmarkMid])));
                    const topScore = tableScore(t.id, Object.fromEntries(METRICS.map(m => [m.id, m.benchmarkTop])));
                    const gap = score !== null && benchScore !== null ? (score - benchScore).toFixed(1) : null;
                    return (
                      <div key={t.id} style={{ background: "#fff", border: `2px solid ${t.color}33`, borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 4 }}>{t.label}</div>
                        {score !== null ? (
                          <>
                            <div style={{ fontSize: 36, fontWeight: 900, color: "#1a1a2e", margin: "8px 0 4px" }}>{score.toFixed(0)}</div>
                            <div style={{ fontSize: 11, color: "#6b6880", marginBottom: 10 }}>/ 100 (normalised)</div>
                            <div style={{ height: 8, background: "#f0ede6", borderRadius: 99, overflow: "hidden", marginBottom: 8 }}>
                              <div style={{ height: "100%", width: `${score}%`, background: t.color, borderRadius: 99 }} />
                            </div>
                            <div style={{ fontSize: 11, color: gap >= 0 ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
                              {gap >= 0 ? `▲ +${gap} vs median` : `▼ ${gap} vs median`}
                            </div>
                          </>
                        ) : (
                          <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 20 }}>Insufficient data</div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Priority gap table */}
                <h3 style={{ fontSize: 16, margin: "0 0 16px" }}>Metrics Requiring Attention — by Strategic Impact</h3>
                {(() => {
                  const belowMedian = gapPriorities.filter(x => x.belowMedian).sort((a, b) => b.priority - a.priority);
                  if (belowMedian.length === 0) {
                    return <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "20px 24px", color: "#166534", fontSize: 14 }}>
                      🎉 All entered metrics are at or above sector median. Focus on maintaining performance and targeting top-quartile thresholds.
                    </div>;
                  }
                  return (
                    <div style={{ background: "#fff", border: "1px solid #e2e0d8", borderRadius: 10, overflow: "hidden" }}>
                      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#1a1a2e" }}>
                            {["Metric", "Your Score", "Sector Median", "Gap to Median", "Gap to Top", "Tables Affected", "Control", "Priority"].map(h => (
                              <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#c8a96e", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {belowMedian.map(({ m, gap, priority }, i) => {
                            const val = perfData[m.id];
                            const v = parseFloat(val);
                            const gapToMed = m.lowerIsBetter ? (m.benchmarkMid - v).toFixed(1) : (v - m.benchmarkMid).toFixed(1);
                            const gapToTop = m.lowerIsBetter ? (m.benchmarkTop - v).toFixed(1) : (v - m.benchmarkTop).toFixed(1);
                            const tableCount = TABLES.filter(t => (WEIGHTS[t.id][m.id] || 0) > 0).length;
                            const band = getBand(m.controllability);
                            const maxP = Math.max(...METRICS.map(mm => getPriority(mm.id, mm.controllability)));
                            return (
                              <tr key={m.id} onClick={() => { setSelectedMetric(m.id); setView("detail"); }} style={{ background: i % 2 === 0 ? "#fff" : "#faf9f6", cursor: "pointer" }}
                                onMouseEnter={e => e.currentTarget.style.background = "#f0ede6"}
                                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#faf9f6"}>
                                <td style={{ padding: "11px 14px", fontWeight: 600, borderBottom: "1px solid #e2e0d8" }}>{m.label}</td>
                                <td style={{ padding: "11px 14px", borderBottom: "1px solid #e2e0d8", color: "#ef4444", fontWeight: 700 }}>{v}{m.unit}</td>
                                <td style={{ padding: "11px 14px", borderBottom: "1px solid #e2e0d8", color: "#6b6880" }}>{m.benchmarkMid}{m.unit}</td>
                                <td style={{ padding: "11px 14px", borderBottom: "1px solid #e2e0d8", color: "#ef4444", fontWeight: 700 }}>{m.lowerIsBetter ? "+" : ""}{gapToMed}{m.unit}</td>
                                <td style={{ padding: "11px 14px", borderBottom: "1px solid #e2e0d8", color: "#9ca3af" }}>{m.lowerIsBetter ? "+" : ""}{gapToTop}{m.unit}</td>
                                <td style={{ padding: "11px 14px", borderBottom: "1px solid #e2e0d8" }}>
                                  <div style={{ display: "flex", gap: 3 }}>
                                    {TABLES.map(t => <div key={t.id} style={{ width: 10, height: 10, borderRadius: 2, background: (WEIGHTS[t.id][m.id] || 0) > 0 ? t.color : "#e2e0d8" }} />)}
                                  </div>
                                </td>
                                <td style={{ padding: "11px 14px", borderBottom: "1px solid #e2e0d8" }}>
                                  <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: band.bg, color: band.color }}>{band.label}</span>
                                </td>
                                <td style={{ padding: "11px 14px", borderBottom: "1px solid #e2e0d8" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <div style={{ height: 6, width: 60, background: "#f0ede6", borderRadius: 99, overflow: "hidden" }}>
                                      <div style={{ height: "100%", width: `${(priority / maxP) * 100}%`, background: "#c8a96e", borderRadius: 99 }} />
                                    </div>
                                    <span style={{ fontSize: 11, color: "#6b6880" }}>{priority}/{maxP}</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}

                {/* Above median summary */}
                {(() => {
                  const above = gapPriorities.filter(x => !x.belowMedian);
                  if (above.length === 0) return null;
                  return (
                    <div style={{ marginTop: 24 }}>
                      <h3 style={{ fontSize: 15, margin: "0 0 12px", color: "#22c55e" }}>✅ At or Above Sector Median</h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {above.map(({ m, gap }) => (
                          <span key={m.id} onClick={() => { setSelectedMetric(m.id); setView("detail"); }}
                            style={{ padding: "6px 12px", background: gap?.bg || "#f0fdf4", color: gap?.color || "#22c55e", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${gap?.color || "#22c55e"}44` }}>
                            {m.label} ({perfData[m.id]}{m.unit})
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            VIEW 5 — METRIC EXPLORER
        ══════════════════════════════════════════════════════ */}
        {view === "detail" && (
          <div>
            <div style={S.section}>
              <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>Metric Explorer</h2>
              <p style={{ margin: 0, fontSize: 14, color: "#6b6880" }}>Select a metric to see how it feeds into each table, your current position, and strategic guidance.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8, marginBottom: 28 }}>
              {METRICS.map(m => {
                const band = getBand(m.controllability);
                const gapInfo = dataEntered ? getGapLabel(m, perfData[m.id]) : null;
                return (
                  <button key={m.id} onClick={() => setSelectedMetric(m.id)} style={{
                    background: selectedMetric === m.id ? "#1a1a2e" : "#fff",
                    color: selectedMetric === m.id ? "#c8a96e" : "#1a1a2e",
                    border: selectedMetric === m.id ? "2px solid #c8a96e" : "2px solid #e2e0d8",
                    borderRadius: 8, padding: "10px 14px", textAlign: "left",
                    cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, transition: "all 0.15s",
                  }}>
                    <div style={{ marginBottom: 5 }}>{m.label}</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, padding: "1px 6px", borderRadius: 99, background: selectedMetric === m.id ? "#c8a96e22" : band.bg, color: selectedMetric === m.id ? "#c8a96e" : band.color, fontWeight: 700 }}>{band.label}</span>
                      {gapInfo && <span style={{ fontSize: 11, padding: "1px 6px", borderRadius: 99, background: selectedMetric === m.id ? "#ffffff22" : gapInfo.bg, color: selectedMetric === m.id ? "#fff" : gapInfo.color, fontWeight: 700 }}>{gapInfo.label}</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {metric && (() => {
              const impacts = getTableImpact(metric.id);
              const band = getBand(metric.controllability);
              const priority = getPriority(metric.id, metric.controllability);
              const maxPriority = Math.max(...METRICS.map(m => getPriority(m.id, m.controllability)));
              const gapInfo = dataEntered ? getGapLabel(metric, perfData[metric.id]) : null;
              const val = perfData[metric.id];

              return (
                <div style={S.card}>
                  <div style={{ background: "#1a1a2e", padding: "24px 28px", color: "#f8f7f4" }}>
                    <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#c8a96e", marginBottom: 6 }}>Metric Detail</div>
                    <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700 }}>{metric.label}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: "#b0afc4", lineHeight: 1.5 }}>{metric.description}</p>
                  </div>

                  <div style={{ padding: "24px 28px" }}>
                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
                      {[
                        { label: "Institutional Control", value: `${metric.controllability}%`, color: band.color, bg: band.bg },
                        { label: "Tables Using Metric",   value: `${impacts.length} of ${TABLES.length}`, color: "#1a1a2e", bg: "#f0ede6" },
                        { label: "Strategic Priority",    value: `${priority}/${maxPriority}`, color: "#7b2d8b", bg: "#f5f0ff" },
                        gapInfo
                          ? { label: "Your Sector Position", value: gapInfo.label, color: gapInfo.color, bg: gapInfo.bg }
                          : { label: "Your Score", value: "—", color: "#9ca3af", bg: "#f8f7f4" },
                      ].map(s => (
                        <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "14px 16px" }}>
                          <div style={{ fontSize: 11, color: "#6b6880", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                          <div style={{ fontSize: 20, fontWeight: 900, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Your score vs benchmarks */}
                    {dataEntered && (
                      <div style={{ marginBottom: 28 }}>
                        <h4 style={{ margin: "0 0 12px", fontSize: 15 }}>Your position against sector benchmarks</h4>
                        <div style={{ background: "#f8f7f4", borderRadius: 10, padding: "18px 20px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13 }}>
                            <span><strong>Your score:</strong> {val !== "" ? `${val}${metric.unit}` : "Not entered"}</span>
                            <span style={{ color: "#f59e0b" }}>Sector low: {metric.benchmarkLow}{metric.unit}</span>
                            <span>Median: {metric.benchmarkMid}{metric.unit}</span>
                            <span style={{ color: "#22c55e" }}>Top quartile: {metric.benchmarkTop}{metric.unit}</span>
                          </div>
                          <GapBar m={metric} val={val} />
                          {val !== "" && (
                            <div style={{ marginTop: 12, fontSize: 13, color: "#3d3b52" }}>
                              {gapInfo && !gapInfo.label.includes("Top") && (
                                <span>
                                  To reach <strong>sector median</strong>: move by <strong style={{ color: "#f59e0b" }}>
                                    {metric.lowerIsBetter
                                      ? `${(parseFloat(val) - metric.benchmarkMid).toFixed(1)}${metric.unit} reduction`
                                      : `${(metric.benchmarkMid - parseFloat(val)).toFixed(1)}${metric.unit} increase`}
                                  </strong>. To reach <strong>top quartile</strong>: move by <strong style={{ color: "#22c55e" }}>
                                    {metric.lowerIsBetter
                                      ? `${(parseFloat(val) - metric.benchmarkTop).toFixed(1)}${metric.unit} reduction`
                                      : `${(metric.benchmarkTop - parseFloat(val)).toFixed(1)}${metric.unit} increase`}
                                  </strong>.
                                </span>
                              )}
                              {gapInfo?.label === "Top quartile" && <span style={{ color: "#22c55e" }}>✅ You are already in the top quartile. Focus on maintaining this position.</span>}
                              {gapInfo?.label === "Above median" && (
                                <span>Above sector median. To reach <strong>top quartile</strong>: move by <strong style={{ color: "#22c55e" }}>
                                  {metric.lowerIsBetter
                                    ? `${(parseFloat(val) - metric.benchmarkTop).toFixed(1)}${metric.unit} reduction`
                                    : `${(metric.benchmarkTop - parseFloat(val)).toFixed(1)}${metric.unit} increase`}
                                </strong>.</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Table weights */}
                    <h4 style={{ margin: "0 0 14px", fontSize: 15 }}>Weighting in each table</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                      {TABLES.map(t => {
                        const w = WEIGHTS[t.id][metric.id] || 0;
                        return (
                          <div key={t.id}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                              <span style={{ fontWeight: 600, color: w > 0 ? t.color : "#9ca3af" }}>{t.label}</span>
                              <span style={{ fontWeight: 700, color: w > 0 ? "#1a1a2e" : "#9ca3af" }}>{w > 0 ? `${w}% of overall score` : "Not included"}</span>
                            </div>
                            <div style={{ height: 10, background: "#f0ede6", borderRadius: 99, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${(w / 22) * 100}%`, background: w > 0 ? t.color : "transparent", borderRadius: 99 }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Strategic guidance */}
                    <div style={{ background: "#f8f7f4", borderRadius: 10, padding: "18px 20px", borderLeft: "4px solid #c8a96e" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#c8a96e", marginBottom: 8 }}>Strategic Guidance</div>
                      <div style={{ fontSize: 14, color: "#3d3b52", lineHeight: 1.7 }}>
                        {impacts.length === 0 && "This metric does not feature in any of the major tables tracked here. Investment in this area will not directly influence rankings."}
                        {impacts.length >= 3 && metric.controllability >= 65 && <span><strong>High-priority lever.</strong> This metric appears across {impacts.length} tables and sits firmly within institutional control. A sustained improvement programme will yield broad ranking benefits. Establish a dedicated workstream with clear ownership and 12-month milestones.</span>}
                        {impacts.length >= 3 && metric.controllability < 65 && metric.controllability >= 45 && <span><strong>Monitor and invest strategically.</strong> Cross-table breadth is strong ({impacts.length} tables), but controllability is moderate — improvement requires multi-year commitment. Build pipeline interventions now; results materialise over 2–3 cycles.</span>}
                        {impacts.length >= 3 && metric.controllability < 45 && <span><strong>Structural challenge.</strong> High cross-table importance but limited short-term controllability. Focus on root-cause analysis, sector benchmarking, and setting realistic multi-year targets rather than expecting rapid gains.</span>}
                        {impacts.length === 2 && metric.controllability >= 60 && <span><strong>Targeted quick win.</strong> Limited to {impacts.length} tables but highly controllable. Identify which tables matter most to your recruitment strategy before committing resource.</span>}
                        {impacts.length === 1 && <span><strong>Table-specific lever.</strong> This metric is unique to {impacts[0]?.table.label}. Prioritise only if that table is strategically important for your institution's profile.</span>}
                        {impacts.length === 2 && metric.controllability < 60 && <span><strong>Medium-term investment.</strong> Appears in {impacts.length} tables with moderate controllability. Worth inclusion in a broader improvement programme.</span>}
                        {gapInfo && val !== "" && (
                          <span> <br /><br /><strong>Current position:</strong> {gapInfo.label.toLowerCase()}.{" "}
                            {gapInfo.label === "Bottom quartile" && "Urgent attention recommended — this is likely dragging your composite score below sector norms."}
                            {gapInfo.label === "Below median" && "Meaningful improvement is achievable and would move your composite score into a more competitive position."}
                            {gapInfo.label === "Above median" && "Solid position. Maintaining momentum and targeting the top quartile threshold would further strengthen rankings."}
                            {gapInfo.label === "Top quartile" && "Strong position. Protect this and use it as an institutional narrative strength in marketing and strategy communications."}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
            {!metric && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>☝️</div>
                <div style={{ fontSize: 16 }}>Select a metric above to explore its strategic detail</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #e2e0d8", padding: "20px 40px", marginTop: 40, background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>
          <strong>Note:</strong> Weightings are approximate, based on publicly available methodology statements for Guardian University Guide, Times Good University Guide, Complete University Guide, and Daily Mail. Sector benchmark quartiles are indicative for the UK HE sector and should be validated against current HESA / OfS data. Normalised scores indicate relative positioning only. This tool is for strategic planning purposes.
        </div>
      </div>
    </div>
  );
}
