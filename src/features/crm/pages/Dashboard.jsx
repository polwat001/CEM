import React from "react";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { STATUSES, STATUS_COLORS } from "../constants/status";
import { RG } from "../constants/theme";
import { today } from "../utils/helpers";

export default function Dashboard({ leads, followups }) {
  const total = leads.length;
  const closed = leads.filter(l => l.latestStatus === "ปิดการขาย").length;
  const needFollow = leads.filter(l => l.nextFollowupDate && l.nextFollowupDate <= today()).length;
  const notInterested = leads.filter(l => l.latestStatus === "ไม่สนใจ").length;
  const meetings = leads.filter(l => l.latestStatus === "มีตติ้ง").length;

  const pieData = STATUSES.map(s => ({ name: s, value: leads.filter(l => l.latestStatus === s).length })).filter(d => d.value > 0);

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - 5 + i);
    return { key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleDateString("th-TH", { month: "short" }) };
  });

  const lineData = months.map(m => ({
    name: m.label,
    ติดตาม: Object.values(followups).flat().filter(f => f.date && f.date.startsWith(m.key)).length,
    ปิดการขาย: leads.filter(l => l.latestStatus === "ปิดการขาย" && l.latestContactDate && l.latestContactDate.startsWith(m.key)).length,
  }));

  const barData = months.map(m => ({
    name: m.label,
    โทร: leads.filter(l => l.latestContactDate && l.latestContactDate.startsWith(m.key)).length,
    ปิด: leads.filter(l => l.latestStatus === "ปิดการขาย" && l.latestContactDate && l.latestContactDate.startsWith(m.key)).length,
  }));

  const kpis = [
    { label: "ลีดทั้งหมด", value: total, icon: "👥", color: "#7B68EE" },
    { label: "ปิดการขาย", value: closed, icon: "✅", color: RG.success },
    { label: "ต้องติดตามวันนี้", value: needFollow, icon: "🔔", color: RG.warn },
    { label: "ไม่สนใจ", value: notInterested, icon: "❌", color: RG.danger },
    { label: "นัดประชุม", value: meetings, icon: "📅", color: RG.primary },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 28 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: RG.surface, borderRadius: 12, border: `1px solid ${RG.border}`, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{k.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 12, color: RG.textMuted, marginTop: 2 }}>{k.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ background: RG.surface, borderRadius: 12, border: `1px solid ${RG.border}`, padding: 20 }}>
          <h4 style={{ margin: "0 0 16px", color: RG.text, fontSize: 14, fontWeight: 700 }}>สัดส่วนสถานะลีด</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`} labelLine={false} fontSize={11}>
                {pieData.map(entry => <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#ccc"} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: RG.surface, borderRadius: 12, border: `1px solid ${RG.border}`, padding: 20 }}>
          <h4 style={{ margin: "0 0 16px", color: RG.text, fontSize: 14, fontWeight: 700 }}>แนวโน้มการติดตาม (6 เดือน)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e0e4" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ติดตาม" stroke={RG.primary} strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="ปิดการขาย" stroke={RG.success} strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ background: RG.surface, borderRadius: 12, border: `1px solid ${RG.border}`, padding: 20 }}>
        <h4 style={{ margin: "0 0 16px", color: RG.text, fontSize: 14, fontWeight: 700 }}>Monthly Conversion (6 เดือน)</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e0e4" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="โทร" fill={RG.primary} radius={[4, 4, 0, 0]} />
            <Bar dataKey="ปิด" fill={RG.success} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}