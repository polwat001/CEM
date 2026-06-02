import React from "react";
import { useState } from "react";
import { RG } from "../../constants/theme";

export default function LoginScreen({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = () => {
    if (user === "crm" && pass === "1234") {
      localStorage.setItem("crm_session", "authenticated");
      onLogin();
    } else {
      setErr("Username หรือ Password ไม่ถูกต้อง");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: RG.gradientSoft, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sarabun', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');`}</style>
      <div style={{ background: RG.surface, borderRadius: 20, boxShadow: "0 8px 40px rgba(192,132,151,0.2)", padding: "48px 40px", width: 380, border: `1px solid ${RG.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, background: RG.gradient, borderRadius: 16, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 28, color: "#fff" }}>Q</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: RG.text }}>QoraQot CRM</h1>
          <p style={{ margin: "4px 0 0", color: RG.textMuted, fontSize: 14 }}>ระบบจัดการลีดและการขาย</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, color: RG.textMuted, marginBottom: 6 }}>Username</label>
          <input value={user} onChange={e => setUser(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="กรอก Username" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${RG.border}`, outline: "none", fontSize: 14, boxSizing: "border-box", color: RG.text }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 13, color: RG.textMuted, marginBottom: 6 }}>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="กรอก Password" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${RG.border}`, outline: "none", fontSize: 14, boxSizing: "border-box", color: RG.text }} />
        </div>
        {err && <p style={{ color: RG.danger, fontSize: 13, margin: "8px 0" }}>{err}</p>}
        <button onClick={handleLogin} style={{ width: "100%", padding: "12px", borderRadius: 8, background: RG.gradient, border: "none", color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer", marginTop: 16 }}>
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}