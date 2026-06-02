import React from "react";
import { useState } from "react";
import { STATUSES, STATUS_COLORS } from "../constants/status";
import { RG } from "../constants/theme";
import { today } from "../utils/helpers";
import StatusBadge from "../components/common/StatusBadge";
import { inputStyle } from "../components/common/styles";

export default function Reports({ leads }) {
  const [mode, setMode] = useState("daily");
  const [selDate, setSelDate] = useState(today());
  const [selMonth, setSelMonth] = useState(today().slice(0, 7));

  const dailyLeads = leads.filter(l => l.latestContactDate === selDate);
  const monthlyLeads = leads.filter(l => l.latestContactDate && l.latestContactDate.startsWith(selMonth));

  const reportLeads = mode === "daily" ? dailyLeads : monthlyLeads;
  const statGroups = STATUSES.map(s => ({ status: s, items: reportLeads.filter(l => l.latestStatus === s) })).filter(g => g.items.length > 0);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["daily", "monthly"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ padding: "8px 20px", borderRadius: 8, border: `2px solid ${mode === m ? RG.primary : RG.border}`, background: mode === m ? RG.gradient : "#fff", color: mode === m ? "#fff" : RG.textMuted, cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "'Sarabun', sans-serif" }}>
              {m === "daily" ? "รายวัน" : "รายเดือน"}
            </button>
          ))}
        </div>
        {mode === "daily" ? <input type="date" value={selDate} onChange={e => setSelDate(e.target.value)} style={{ ...inputStyle, width: "auto" }} /> : <input type="month" value={selMonth} onChange={e => setSelMonth(e.target.value)} style={{ ...inputStyle, width: "auto" }} />}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        <div style={{ background: RG.surface, borderRadius: 10, border: `1px solid ${RG.border}`, padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: RG.primary }}>{reportLeads.length}</div>
          <div style={{ fontSize: 12, color: RG.textMuted }}>โทรทั้งหมด</div>
        </div>
        {["ปิดการขาย", "มีตติ้ง", "ต้องตามต่อ"].map(s => (
          <div key={s} style={{ background: RG.surface, borderRadius: 10, border: `1px solid ${RG.border}`, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: STATUS_COLORS[s] }}>{reportLeads.filter(l => l.latestStatus === s).length}</div>
            <div style={{ fontSize: 12, color: RG.textMuted }}>{s}</div>
          </div>
        ))}
      </div>

      {statGroups.map(g => (
        <div key={g.status} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <StatusBadge status={g.status} />
            <span style={{ color: RG.textMuted, fontSize: 13 }}>{g.items.length} บริษัท</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#F8E8EC" }}>
                <th style={{ padding: "8px 12px", textAlign: "left", color: RG.text }}>ชื่อบริษัท</th>
                <th style={{ padding: "8px 12px", textAlign: "left", color: RG.text }}>ผู้ติดต่อ</th>
                <th style={{ padding: "8px 12px", textAlign: "left", color: RG.text }}>เบอร์โทร</th>
              </tr>
            </thead>
            <tbody>
              {g.items.map((l, i) => (
                <tr key={l.id} style={{ background: i % 2 === 0 ? RG.rowOdd : RG.rowEven }}>
                  <td style={{ padding: "8px 12px", color: RG.text }}>{l.companyName}</td>
                  <td style={{ padding: "8px 12px", color: RG.text }}>{l.contactName}</td>
                  <td style={{ padding: "8px 12px", color: RG.text }}>{l.contactPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {reportLeads.length === 0 && <div style={{ textAlign: "center", padding: "40px 0", color: RG.textMuted }}>ไม่มีข้อมูลในช่วงเวลาที่เลือก</div>}
    </div>
  );
}