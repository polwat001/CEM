import React from "react";
import { RG } from "../../constants/theme";
import { parseDateTH, today } from "../../utils/helpers";
import Btn from "../common/Btn";
import Modal from "../common/Modal";
import StatusBadge from "../common/StatusBadge";

export default function NotificationsPanel({ leads, onMarkDone, onClose }) {
  const due = leads.filter(l => {
    if (!l.nextFollowupDate) return false;
    return l.nextFollowupDate <= today();
  });

  return (
    <Modal title={`แจ้งเตือนการติดตาม (${due.length} รายการ)`} onClose={onClose}>
      {due.length === 0 ? (
        <p style={{ color: RG.textMuted, textAlign: "center", padding: "20px 0" }}>ไม่มีรายการที่ต้องติดตามวันนี้ 🎉</p>
      ) : (
        due.map(l => (
          <div key={l.id} style={{ border: `1px solid ${RG.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", background: RG.rowOdd }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: RG.text, fontSize: 14 }}>{l.companyName}</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: RG.textMuted }}>กำหนดติดตาม: {parseDateTH(l.nextFollowupDate)}</p>
              <StatusBadge status={l.latestStatus} />
            </div>
            <Btn small variant="success" onClick={() => onMarkDone(l)}>ติดตามแล้ว ✓</Btn>
          </div>
        ))
      )}
    </Modal>
  );
}