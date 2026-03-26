import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MolData {
  id: string; formula: string; name: string; en: string;
  color: string; bg: string;
  bondType: string; bondLabel: string;
  sharedPairs: number; lonePairs: number; desc: string;
  bohrAtoms: BohrAtom[];
  bohrBonds: BohrBond[];
  lewisAtoms: LAtom[];
  lewisBonds: LBond[];
}

// ── 보어 모형 ───────────────────────────────────────────────────
interface BohrAtom {
  id: string; symbol: string;
  cx: number; cy: number;
  nColor: string; eColors: string[];
  shells: number[];
}
interface BohrBond { from: string; to: string; order: 1|2|3; }

// ── 루이스 점자식 ────────────────────────────────────────────────
interface LAtom {
  id: string; symbol: string; x: number; y: number;
  fill: string; stroke: string; textColor: string;
  dots: { x: number; y: number }[]; // 비공유 전자쌍 점 위치 (pair 단위로 2개씩)
}
interface LBond { from: string; to: string; order: 1|2|3; }

const MOLS: MolData[] = [
  {
    id:"h2", formula:"H₂", name:"수소 분자", en:"Hydrogen",
    color:"#6366f1", bg:"#eef2ff", bondType:"단일 결합", bondLabel:"─",
    sharedPairs:1, lonePairs:0,
    desc:"두 수소 원자가 전자 1개씩을 내어 전자쌍 1개를 공유합니다. 각 수소는 헬륨(He)과 같은 2전자 배치를 이룹니다.",
    bohrAtoms:[
      { id:"H1", symbol:"H", cx:110, cy:150, nColor:"#ef4444", eColors:["#818cf8"], shells:[1] },
      { id:"H2", symbol:"H", cx:250, cy:150, nColor:"#ef4444", eColors:["#818cf8"], shells:[1] },
    ],
    bohrBonds:[{ from:"H1", to:"H2", order:1 }],
    lewisAtoms:[
      { id:"H1", symbol:"H", x:100, y:110, fill:"#eef2ff", stroke:"#6366f1", textColor:"#4338ca", dots:[] },
      { id:"H2", symbol:"H", x:230, y:110, fill:"#eef2ff", stroke:"#6366f1", textColor:"#4338ca", dots:[] },
    ],
    lewisBonds:[{ from:"H1", to:"H2", order:1 }],
  },
  {
    id:"f2", formula:"F₂", name:"플루오린 분자", en:"Fluorine",
    color:"#10b981", bg:"#ecfdf5", bondType:"단일 결합", bondLabel:"─",
    sharedPairs:1, lonePairs:6,
    desc:"플루오린 원자 2개가 최외각에서 전자 1개씩 공유합니다. 각 원자에 비공유 전자쌍 3개씩 존재합니다.",
    bohrAtoms:[
      { id:"F1", symbol:"F", cx:110, cy:150, nColor:"#ef4444", eColors:["#fcd34d","#34d399"], shells:[2,7] },
      { id:"F2", symbol:"F", cx:250, cy:150, nColor:"#ef4444", eColors:["#fcd34d","#34d399"], shells:[2,7] },
    ],
    bohrBonds:[{ from:"F1", to:"F2", order:1 }],
    lewisAtoms:[
      { id:"F1", symbol:"F", x:100, y:110, fill:"#ecfdf5", stroke:"#10b981", textColor:"#065f46",
        dots:[{x:-38,y:-8},{x:-38,y:8},{x:-20,y:-28},{x:-8,y:-28},{x:-20,y:28},{x:-8,y:28}] },
      { id:"F2", symbol:"F", x:240, y:110, fill:"#ecfdf5", stroke:"#10b981", textColor:"#065f46",
        dots:[{x:28,y:-8},{x:38,y:-8},{x:8,y:-28},{x:20,y:-28},{x:8,y:28},{x:20,y:28}] },
    ],
    lewisBonds:[{ from:"F1", to:"F2", order:1 }],
  },
  {
    id:"o2", formula:"O₂", name:"산소 분자", en:"Oxygen",
    color:"#ef4444", bg:"#fff5f5", bondType:"이중 결합", bondLabel:"═",
    sharedPairs:2, lonePairs:4,
    desc:"산소 원자 2개가 전자쌍 2개를 공유하는 이중 결합을 형성합니다. 각 원자에 비공유 전자쌍 2개가 있습니다.",
    bohrAtoms:[
      { id:"O1", symbol:"O", cx:110, cy:150, nColor:"#dc2626", eColors:["#fcd34d","#f87171"], shells:[2,6] },
      { id:"O2", symbol:"O", cx:250, cy:150, nColor:"#dc2626", eColors:["#fcd34d","#f87171"], shells:[2,6] },
    ],
    bohrBonds:[{ from:"O1", to:"O2", order:2 }],
    lewisAtoms:[
      { id:"O1", symbol:"O", x:100, y:110, fill:"#fff5f5", stroke:"#ef4444", textColor:"#991b1b",
        dots:[{x:-28,y:-10},{x:-28,y:10},{x:0,y:-30},{x:12,y:-30}] },
      { id:"O2", symbol:"O", x:240, y:110, fill:"#fff5f5", stroke:"#ef4444", textColor:"#991b1b",
        dots:[{x:18,y:-10},{x:28,y:-10},{x:0,y:28},{x:12,y:28}] },
    ],
    lewisBonds:[{ from:"O1", to:"O2", order:2 }],
  },
  {
    id:"n2", formula:"N₂", name:"질소 분자", en:"Nitrogen",
    color:"#3b82f6", bg:"#eff6ff", bondType:"삼중 결합", bondLabel:"≡",
    sharedPairs:3, lonePairs:2,
    desc:"질소 원자 2개가 전자쌍 3개를 공유하는 삼중 결합을 형성합니다. 각 원자에 비공유 전자쌍 1개씩 있습니다.",
    bohrAtoms:[
      { id:"N1", symbol:"N", cx:108, cy:150, nColor:"#2563eb", eColors:["#fcd34d","#60a5fa"], shells:[2,5] },
      { id:"N2", symbol:"N", cx:252, cy:150, nColor:"#2563eb", eColors:["#fcd34d","#60a5fa"], shells:[2,5] },
    ],
    bohrBonds:[{ from:"N1", to:"N2", order:3 }],
    lewisAtoms:[
      { id:"N1", symbol:"N", x:100, y:110, fill:"#eff6ff", stroke:"#3b82f6", textColor:"#1e40af",
        dots:[{x:-28,y:-6},{x:-28,y:6}] },
      { id:"N2", symbol:"N", x:240, y:110, fill:"#eff6ff", stroke:"#3b82f6", textColor:"#1e40af",
        dots:[{x:28,y:-6},{x:28,y:6}] },
    ],
    lewisBonds:[{ from:"N1", to:"N2", order:3 }],
  },
  {
    id:"h2o", formula:"H₂O", name:"물 분자", en:"Water",
    color:"#0ea5e9", bg:"#f0f9ff", bondType:"단일 결합", bondLabel:"─",
    sharedPairs:2, lonePairs:2,
    desc:"산소가 수소 2개와 각각 전자쌍 1개를 공유합니다. 산소에 비공유 전자쌍 2개, 결합각 약 104.5°.",
    bohrAtoms:[
      { id:"O",  symbol:"O", cx:180, cy:120, nColor:"#dc2626", eColors:["#fcd34d","#f87171"], shells:[2,6] },
      { id:"H1", symbol:"H", cx:90,  cy:200, nColor:"#ef4444", eColors:["#818cf8"], shells:[1] },
      { id:"H2", symbol:"H", cx:270, cy:200, nColor:"#ef4444", eColors:["#818cf8"], shells:[1] },
    ],
    bohrBonds:[
      { from:"O", to:"H1", order:1 },
      { from:"O", to:"H2", order:1 },
    ],
    lewisAtoms:[
      { id:"O",  symbol:"O", x:165, y:80,  fill:"#f0f9ff", stroke:"#0ea5e9", textColor:"#0c4a6e",
        dots:[{x:-10,y:-28},{x:4,y:-28},{x:-28,y:-10},{x:-28,y:4}] },
      { id:"H1", symbol:"H", x:90,  y:160, fill:"#f0f9ff", stroke:"#0ea5e9", textColor:"#0c4a6e", dots:[] },
      { id:"H2", symbol:"H", x:240, y:160, fill:"#f0f9ff", stroke:"#0ea5e9", textColor:"#0c4a6e", dots:[] },
    ],
    lewisBonds:[
      { from:"O", to:"H1", order:1 },
      { from:"O", to:"H2", order:1 },
    ],
  },
  {
    id:"co2", formula:"CO₂", name:"이산화탄소", en:"Carbon Dioxide",
    color:"#78716c", bg:"#fafaf9", bondType:"이중 결합", bondLabel:"═",
    sharedPairs:4, lonePairs:4,
    desc:"탄소 원자가 양쪽 산소와 각각 이중 결합을 형성합니다. 직선형 구조(O═C═O).",
    bohrAtoms:[
      { id:"C",  symbol:"C", cx:180, cy:150, nColor:"#292524", eColors:["#fcd34d","#a8a29e"], shells:[2,4] },
      { id:"O1", symbol:"O", cx:60,  cy:150, nColor:"#dc2626", eColors:["#fcd34d","#f87171"], shells:[2,6] },
      { id:"O2", symbol:"O", cx:300, cy:150, nColor:"#dc2626", eColors:["#fcd34d","#f87171"], shells:[2,6] },
    ],
    bohrBonds:[
      { from:"C", to:"O1", order:2 },
      { from:"C", to:"O2", order:2 },
    ],
    lewisAtoms:[
      { id:"C",  symbol:"C", x:165, y:110, fill:"#fafaf9", stroke:"#78716c", textColor:"#1c1917", dots:[] },
      { id:"O1", symbol:"O", x:60,  y:110, fill:"#fafaf9", stroke:"#78716c", textColor:"#1c1917",
        dots:[{x:-28,y:-8},{x:-28,y:8},{x:-10,y:-28},{x:4,y:-28}] },
      { id:"O2", symbol:"O", x:270, y:110, fill:"#fafaf9", stroke:"#78716c", textColor:"#1c1917",
        dots:[{x:18,y:-8},{x:28,y:-8},{x:-4,y:22},{x:8,y:22}] },
    ],
    lewisBonds:[
      { from:"C", to:"O1", order:2 },
      { from:"C", to:"O2", order:2 },
    ],
  },
  {
    id:"nh3", formula:"NH₃", name:"암모니아", en:"Ammonia",
    color:"#8b5cf6", bg:"#f5f3ff", bondType:"단일 결합", bondLabel:"─",
    sharedPairs:3, lonePairs:1,
    desc:"질소가 수소 3개와 각각 단일 결합을 형성합니다. 질소에 비공유 전자쌍 1개. 삼각뿔 구조.",
    bohrAtoms:[
      { id:"N",  symbol:"N", cx:180, cy:120, nColor:"#2563eb", eColors:["#fcd34d","#a78bfa"], shells:[2,5] },
      { id:"H1", symbol:"H", cx:90,  cy:195, nColor:"#ef4444", eColors:["#c4b5fd"], shells:[1] },
      { id:"H2", symbol:"H", cx:180, cy:210, nColor:"#ef4444", eColors:["#c4b5fd"], shells:[1] },
      { id:"H3", symbol:"H", cx:270, cy:195, nColor:"#ef4444", eColors:["#c4b5fd"], shells:[1] },
    ],
    bohrBonds:[
      { from:"N", to:"H1", order:1 },
      { from:"N", to:"H2", order:1 },
      { from:"N", to:"H3", order:1 },
    ],
    lewisAtoms:[
      { id:"N",  symbol:"N", x:165, y:80,  fill:"#f5f3ff", stroke:"#8b5cf6", textColor:"#4c1d95",
        dots:[{x:-8,y:-30},{x:8,y:-30}] },
      { id:"H1", symbol:"H", x:80,  y:160, fill:"#f5f3ff", stroke:"#8b5cf6", textColor:"#4c1d95", dots:[] },
      { id:"H2", symbol:"H", x:165, y:175, fill:"#f5f3ff", stroke:"#8b5cf6", textColor:"#4c1d95", dots:[] },
      { id:"H3", symbol:"H", x:250, y:160, fill:"#f5f3ff", stroke:"#8b5cf6", textColor:"#4c1d95", dots:[] },
    ],
    lewisBonds:[
      { from:"N", to:"H1", order:1 },
      { from:"N", to:"H2", order:1 },
      { from:"N", to:"H3", order:1 },
    ],
  },
  {
    id:"ch4", formula:"CH₄", name:"메테인", en:"Methane",
    color:"#6b7280", bg:"#f9fafb", bondType:"단일 결합", bondLabel:"─",
    sharedPairs:4, lonePairs:0,
    desc:"탄소 원자가 수소 4개와 각각 단일 결합을 형성합니다. 정사면체 구조 (2D 표현).",
    bohrAtoms:[
      { id:"C",  symbol:"C", cx:180, cy:150, nColor:"#292524", eColors:["#fcd34d","#9ca3af"], shells:[2,4] },
      { id:"H1", symbol:"H", cx:180, cy:60,  nColor:"#ef4444", eColors:["#d1d5db"], shells:[1] },
      { id:"H2", symbol:"H", cx:90,  cy:210, nColor:"#ef4444", eColors:["#d1d5db"], shells:[1] },
      { id:"H3", symbol:"H", cx:270, cy:210, nColor:"#ef4444", eColors:["#d1d5db"], shells:[1] },
      { id:"H4", symbol:"H", cx:105, cy:85,  nColor:"#ef4444", eColors:["#d1d5db"], shells:[1] },
    ],
    bohrBonds:[
      { from:"C", to:"H1", order:1 },
      { from:"C", to:"H2", order:1 },
      { from:"C", to:"H3", order:1 },
      { from:"C", to:"H4", order:1 },
    ],
    lewisAtoms:[
      { id:"C",  symbol:"C", x:165, y:110, fill:"#f9fafb", stroke:"#6b7280", textColor:"#111827", dots:[] },
      { id:"H1", symbol:"H", x:165, y:20,  fill:"#f9fafb", stroke:"#6b7280", textColor:"#111827", dots:[] },
      { id:"H2", symbol:"H", x:75,  y:175, fill:"#f9fafb", stroke:"#6b7280", textColor:"#111827", dots:[] },
      { id:"H3", symbol:"H", x:255, y:175, fill:"#f9fafb", stroke:"#6b7280", textColor:"#111827", dots:[] },
      { id:"H4", symbol:"H", x:75,  y:48,  fill:"#f9fafb", stroke:"#6b7280", textColor:"#111827", dots:[] },
    ],
    lewisBonds:[
      { from:"C", to:"H1", order:1 },
      { from:"C", to:"H2", order:1 },
      { from:"C", to:"H3", order:1 },
      { from:"C", to:"H4", order:1 },
    ],
  },
];

// ── 보어 모형 렌더 ────────────────────────────────────────────
const SHELL_R = [0, 28, 52, 78];

function BohrView({ mol }: { mol: MolData }) {
  const atomMap = Object.fromEntries(mol.bohrAtoms.map(a => [a.id, a]));
  return (
    <svg viewBox="0 0 360 300" style={{ width:"100%", height:"auto" }}>
      {/* 결합 공유 영역 */}
      {mol.bohrBonds.map((bond, bi) => {
        const a = atomMap[bond.from], b = atomMap[bond.to];
        if (!a || !b) return null;
        const mx = (a.cx + b.cx) / 2, my = (a.cy + b.cy) / 2;
        const dx = b.cx - a.cx, dy = b.cy - a.cy;
        const len = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        return (
          <g key={bi}>
            {Array.from({length: bond.order}).map((_, i) => {
              const off = (i - (bond.order-1)/2) * 10;
              return (
                <ellipse key={i}
                  cx={mx - Math.sin(angle*Math.PI/180)*off}
                  cy={my + Math.cos(angle*Math.PI/180)*off}
                  rx={len*0.18} ry={8}
                  fill="rgba(52,211,153,0.12)"
                  stroke="rgba(52,211,153,0.35)" strokeWidth="1"
                  transform={`rotate(${angle}, ${mx}, ${my})`}
                />
              );
            })}
          </g>
        );
      })}
      {/* 원자 */}
      {mol.bohrAtoms.map(atom => {
        return (
          <g key={atom.id}>
            {atom.shells.map((_, si) => (
              <circle key={si} cx={atom.cx} cy={atom.cy} r={SHELL_R[si+1]}
                fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
            ))}
            {atom.shells.map((count, si) =>
              Array.from({length: count}, (_, ei) => {
                const angle = ((360/count)*ei - 90) * Math.PI/180;
                const r = SHELL_R[si+1];
                return (
                  <circle key={`${si}-${ei}`}
                    cx={atom.cx + Math.cos(angle)*r}
                    cy={atom.cy + Math.sin(angle)*r}
                    r={5} fill={atom.eColors[si]}
                    stroke="rgba(255,255,255,0.6)" strokeWidth="1"
                  />
                );
              })
            )}
            <circle cx={atom.cx} cy={atom.cy} r={14}
              fill={atom.nColor} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <text x={atom.cx} y={atom.cy+5} textAnchor="middle"
              fontSize="11" fontWeight="800" fill="#fff"
              style={{ fontFamily:"'Pretendard',sans-serif" }}>{atom.symbol}</text>
          </g>
        );
      })}
      {/* 공유 전자쌍 */}
      {mol.bohrBonds.map((bond, bi) => {
        const a = atomMap[bond.from], b = atomMap[bond.to];
        if (!a || !b) return null;
        const dx = b.cx - a.cx, dy = b.cy - a.cy;
        const mx = (a.cx + b.cx)/2, my = (a.cy + b.cy)/2;
        const angle = Math.atan2(dy, dx);
        const px = -Math.sin(angle), py = Math.cos(angle);
        return Array.from({length: bond.order}).map((_, i) => {
          const off = (i - (bond.order-1)/2) * 11;
          const cx = mx + px*off, cy = my + py*off;
          return (
            <g key={`${bi}-${i}`}>
              <circle cx={cx - Math.cos(angle)*7} cy={cy - Math.sin(angle)*7}
                r={5.5} fill="#34d399" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <circle cx={cx + Math.cos(angle)*7} cy={cy + Math.sin(angle)*7}
                r={5.5} fill="#34d399" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
            </g>
          );
        });
      })}
    </svg>
  );
}

// ── 루이스 점자식 렌더 ─────────────────────────────────────────
function LewisView({ mol }: { mol: MolData }) {
  const atomMap = Object.fromEntries(mol.lewisAtoms.map(a => [a.id, a]));
  const vbW = 340, vbH = 240;
  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} style={{ width:"100%", height:"auto" }}>
      {/* 결합선 */}
      {mol.lewisBonds.map((bond, bi) => {
        const a = atomMap[bond.from], b = atomMap[bond.to];
        if (!a || !b) return null;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy);
        const ux = dx/len, uy = dy/len;
        const px = -uy, py = ux;
        const ar = 24, br = 24;
        const x1 = a.x + ux*ar, y1 = a.y + uy*ar;
        const x2 = b.x - ux*br, y2 = b.y - uy*br;
        const offsets = bond.order === 1 ? [0] : bond.order === 2 ? [-5,5] : [-8,0,8];
        return offsets.map((off, j) => (
          <line key={`${bi}-${j}`}
            x1={x1+px*off} y1={y1+py*off}
            x2={x2+px*off} y2={y2+py*off}
            stroke="#1d1d1f" strokeWidth="2.5" strokeLinecap="round" />
        ));
      })}
      {/* 원자 */}
      {mol.lewisAtoms.map(a => (
        <g key={a.id}>
          <circle cx={a.x} cy={a.y} r={22} fill={a.fill} stroke={a.stroke} strokeWidth="2" />
          <text x={a.x} y={a.y+5} textAnchor="middle" fontSize="14" fontWeight="800"
            fill={a.textColor} style={{ fontFamily:"monospace" }}>{a.symbol}</text>
          {/* 비공유 전자쌍 점 */}
          {a.dots.map((d, di) => (
            <circle key={di} cx={a.x+d.x} cy={a.y+d.y} r="3" fill="#374151" />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function CovalentBonding() {
  const [selId, setSelId] = useState("h2");
  const [viewMode, setViewMode] = useState<"bohr"|"lewis">("bohr");
  const mol = MOLS.find(m => m.id === selId)!;

  const card: React.CSSProperties = {
    background: "#fff", borderRadius: 20,
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      <div>
        <p style={{ fontSize:11, fontWeight:700, color:"#86868b",
          letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:6 }}>UNIT 02 — 실습</p>
        <h1 style={{ fontSize:32, fontWeight:800, color:"#1d1d1f",
          letterSpacing:"-0.03em", marginBottom:8 }}>공유 결합</h1>
        <p style={{ fontSize:15, color:"#86868b", lineHeight:1.6 }}>
          보어 원자 모형과 루이스 점자식으로 전자 공유 과정을 확인하세요.
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:20 }}
        className="block lg:grid">

        {/* 분자 선택 */}
        <div style={{ ...card, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(0,0,0,0.05)", background:"#fafafa" }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#86868b",
              letterSpacing:"0.06em", textTransform:"uppercase" }}>분자 선택</p>
          </div>
          <div style={{ overflowY:"auto", maxHeight:520 }}>
            {MOLS.map(m => {
              const active = m.id === selId;
              return (
                <button key={m.id} onClick={() => setSelId(m.id)} style={{
                  width:"100%", display:"flex", alignItems:"center",
                  justifyContent:"space-between",
                  padding:"13px 18px",
                  borderBottom:"1px solid rgba(0,0,0,0.04)",
                  background: active ? m.bg : "transparent",
                  border:"none", cursor:"pointer", textAlign:"left",
                  transition:"background 0.15s",
                }}>
                  <div>
                    <p style={{ fontSize:16, fontWeight:800,
                      color: active ? m.color : "#1d1d1f",
                      fontFamily:"monospace", letterSpacing:"-0.01em" }}>{m.formula}</p>
                    <p style={{ fontSize:11, color:"#86868b", marginTop:2 }}>{m.name}</p>
                  </div>
                  <span style={{
                    fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:6,
                    background: active ? m.color : "rgba(0,0,0,0.06)",
                    color: active ? "#fff" : "#86868b",
                  }}>{m.bondLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 오른쪽 */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* 뷰 모드 토글 */}
          <AnimatePresence mode="wait">
            <motion.div key={mol.id} initial={{ opacity:0, scale:0.97 }}
              animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.25 }} style={{ ...card, overflow:"hidden" }}>

              {/* 제목 바 */}
              <div style={{ padding:"18px 24px", borderBottom:"1px solid rgba(0,0,0,0.05)",
                display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontSize:11, color:"#86868b", marginBottom:3 }}>{mol.en}</p>
                  <h2 style={{ fontSize:20, fontWeight:800, color:"#1d1d1f",
                    letterSpacing:"-0.025em", margin:0 }}>
                    <span style={{ fontFamily:"monospace", color:mol.color }}>{mol.formula}</span>
                    &nbsp; {mol.name}
                  </h2>
                </div>
                {/* 뷰 전환 탭 */}
                <div style={{ display:"flex", background:"#f5f5f7", borderRadius:12, padding:3, gap:2 }}>
                  {([["bohr","보어 모형"],["lewis","루이스 구조"]] as const).map(([mode, label]) => (
                    <button key={mode} onClick={() => setViewMode(mode)} style={{
                      padding:"7px 14px", borderRadius:9, border:"none", cursor:"pointer",
                      fontSize:12, fontWeight:700, letterSpacing:"-0.01em",
                      background: viewMode === mode ? "#fff" : "transparent",
                      color: viewMode === mode ? "#1d1d1f" : "#86868b",
                      boxShadow: viewMode === mode ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
                      transition:"all 0.15s",
                    }}>{label}</button>
                  ))}
                </div>
              </div>

              {/* 시각화 영역 */}
              <div style={{ padding:"28px 24px", background:"#fafafa",
                display:"flex", justifyContent:"center", minHeight:240 }}>
                <div style={{ width:"100%", maxWidth:420 }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={viewMode}
                      initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}>
                      {viewMode === "bohr"
                        ? <BohrView mol={mol} />
                        : <LewisView mol={mol} />
                      }
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* 범례 */}
              <div style={{ padding:"12px 24px 16px",
                borderTop:"1px solid rgba(0,0,0,0.05)",
                display:"flex", gap:20, flexWrap:"wrap" }}>
                {viewMode === "bohr" ? (
                  <>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:12, height:12, borderRadius:"50%", background:"#ef4444" }} />
                      <span style={{ fontSize:12, color:"#86868b" }}>핵 (원자핵)</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:12, height:12, borderRadius:"50%", background:"#60a5fa" }} />
                      <span style={{ fontSize:12, color:"#86868b" }}>전자</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:12, height:12, borderRadius:"50%", background:"#34d399" }} />
                      <span style={{ fontSize:12, color:"#86868b" }}>공유 전자쌍</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:20, height:2.5, background:"#1d1d1f", borderRadius:2 }} />
                      <span style={{ fontSize:12, color:"#86868b" }}>공유 결합 (선)</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:"#374151" }} />
                      <div style={{ width:5, height:5, borderRadius:"50%", background:"#374151" }} />
                      <span style={{ fontSize:12, color:"#86868b", marginLeft:2 }}>비공유 전자쌍 (:)</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:12, height:12, borderRadius:"50%",
                        background:mol.bg, border:`1.5px solid ${mol.color}` }} />
                      <span style={{ fontSize:12, color:"#86868b" }}>원자 기호</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 통계 */}
          <AnimatePresence mode="wait">
            <motion.div key={mol.id+"s"} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
              style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              {[
                { label:"공유 전자쌍", val:mol.sharedPairs, unit:"쌍", color:"#34d399", bg:"#ecfdf5" },
                { label:"비공유 전자쌍", val:mol.lonePairs,  unit:"쌍", color:"#60a5fa", bg:"#eff6ff" },
                { label:"결합 수",      val:mol.bohrBonds.length, unit:"개", color:mol.color, bg:mol.bg },
              ].map((stat, i) => (
                <div key={i} style={{ ...card, padding:"18px 20px" }}>
                  <p style={{ fontSize:12, color:"#86868b", marginBottom:8 }}>{stat.label}</p>
                  <p style={{ fontSize:28, fontWeight:800, color:stat.color,
                    letterSpacing:"-0.03em", lineHeight:1 }}>
                    {stat.val}<span style={{ fontSize:14, fontWeight:600, marginLeft:4 }}>{stat.unit}</span>
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* 설명 */}
          <AnimatePresence mode="wait">
            <motion.div key={mol.id+"d"} initial={{ opacity:0 }} animate={{ opacity:1 }}
              style={{ ...card, padding:"20px 24px" }}>
              <p style={{ fontSize:11, fontWeight:700, color:"#86868b",
                letterSpacing:"0.05em", textTransform:"uppercase", marginBottom:10 }}>구조 설명</p>
              <p style={{ fontSize:14, color:"#1d1d1f", lineHeight:1.8 }}>{mol.desc}</p>
              <div style={{ marginTop:12, padding:"10px 14px", borderRadius:10,
                background:"#f5f5f7", fontFamily:"monospace",
                fontSize:13, color:"#1d1d1f", fontWeight:600 }}>
                {mol.formula} — {mol.bondType} ({mol.bondLabel})
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 결합 유형 정리 */}
          <div style={{ ...card, padding:"20px 24px" }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#86868b",
              letterSpacing:"0.05em", textTransform:"uppercase", marginBottom:14 }}>결합 유형 정리</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {[
                { sym:"─", type:"단일", pairs:1, ex:"H₂, CH₄", color:"#3b82f6", bg:"#eff6ff" },
                { sym:"═", type:"이중", pairs:2, ex:"O₂, CO₂", color:"#8b5cf6", bg:"#f5f3ff" },
                { sym:"≡", type:"삼중", pairs:3, ex:"N₂",      color:"#06b6d4", bg:"#ecfeff" },
              ].map(b => (
                <div key={b.type} style={{ padding:"14px 16px", borderRadius:12,
                  background:b.bg, border:`1px solid ${b.color}20` }}>
                  <span style={{ fontSize:22, fontWeight:900, color:b.color,
                    fontFamily:"monospace", display:"block", marginBottom:6 }}>{b.sym}</span>
                  <p style={{ fontSize:12, fontWeight:700, color:"#1d1d1f" }}>{b.type} 결합</p>
                  <p style={{ fontSize:11, color:"#86868b", marginTop:2 }}>전자쌍 {b.pairs}개</p>
                  <p style={{ fontSize:11, color:b.color, fontWeight:600, marginTop:4 }}>{b.ex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
