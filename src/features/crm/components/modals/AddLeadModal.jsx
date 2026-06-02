import React from "react";
import { useState } from "react";
import { STATUSES } from "../../constants/status";
import { today } from "../../utils/helpers";
import Btn from "../common/Btn";
import Field from "../common/Field";
import Modal from "../common/Modal";
import { inputStyle, selectStyle } from "../common/styles";

export default function AddLeadModal({ onClose, onSave }) {
  const [form, setForm] = useState({ companyName: "", companyNumber: "", contactName: "", contactPhone: "", contactEmail: "", revenue: "", registeredCapital: "", profit: "", latestStatus: STATUSES[0], latestContactDate: today(), nextFollowupDate: "" });
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <Modal title="เพิ่มลีดใหม่" onClose={onClose} wide>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
        <Field label="เลขนิติบุคคล *"><input value={form.companyNumber} onChange={e => up("companyNumber", e.target.value)} style={inputStyle} /></Field>
        <Field label="ชื่อบริษัท *"><input value={form.companyName} onChange={e => up("companyName", e.target.value)} style={inputStyle} /></Field>
        <Field label="ชื่อผู้ติดต่อ"><input value={form.contactName} onChange={e => up("contactName", e.target.value)} style={inputStyle} /></Field>
        <Field label="เบอร์โทร"><input value={form.contactPhone} onChange={e => up("contactPhone", e.target.value)} style={inputStyle} /></Field>
        <Field label="อีเมล"><input value={form.contactEmail} onChange={e => up("contactEmail", e.target.value)} style={inputStyle} /></Field>
        <Field label="สถานะ"><select value={form.latestStatus} onChange={e => up("latestStatus", e.target.value)} style={selectStyle}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></Field>
        <Field label="รายได้รวม (บาท)"><input type="number" value={form.revenue} onChange={e => up("revenue", e.target.value)} style={inputStyle} /></Field>
        <Field label="ทุนจดทะเบียน (บาท)"><input type="number" value={form.registeredCapital} onChange={e => up("registeredCapital", e.target.value)} style={inputStyle} /></Field>
        <Field label="กำไร (บาท)"><input type="number" value={form.profit} onChange={e => up("profit", e.target.value)} style={inputStyle} /></Field>
        <Field label="วันที่ติดต่อล่าสุด"><input type="date" value={form.latestContactDate} onChange={e => up("latestContactDate", e.target.value)} style={inputStyle} /></Field>
        <Field label="วันที่ติดตามครั้งถัดไป"><input type="date" value={form.nextFollowupDate} onChange={e => up("nextFollowupDate", e.target.value)} style={inputStyle} /></Field>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <Btn onClick={() => onSave(form)}>บันทึก</Btn>
        <Btn variant="secondary" onClick={onClose}>ยกเลิก</Btn>
      </div>
    </Modal>
  );
}