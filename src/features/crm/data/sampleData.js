import { STATUSES } from "../constants/status";
import { today, uuid } from "../utils/helpers";

export const SAMPLE_LEADS = [
  { id: uuid(), companyName: "บริษัท อมตะ จำกัด", companyNumber: "0105562001234", contactName: "คุณสมชาย ใจดี", contactPhone: "081-234-5678", contactEmail: "somchai@amata.co.th", revenue: 12500000, registeredCapital: 5000000, profit: 1800000, latestStatus: "มีตติ้ง", latestContactDate: "2026-05-28", nextFollowupDate: "2026-06-03", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: uuid(), companyName: "หจก. ไทยพัฒนา", companyNumber: "0315561009876", contactName: "คุณมาลี สวัสดี", contactPhone: "089-876-5432", contactEmail: "malee@thaipat.com", revenue: 3200000, registeredCapital: 1000000, profit: 450000, latestStatus: "ฝากโปรไฟล์", latestContactDate: "2026-05-30", nextFollowupDate: "2026-06-10", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: uuid(), companyName: "บริษัท เทคโนวิชั่น จำกัด", companyNumber: "0105563007777", contactName: "คุณวิชัย นวัตกรรม", contactPhone: "062-555-0101", contactEmail: "wichai@techvision.th", revenue: 28000000, registeredCapital: 10000000, profit: 4200000, latestStatus: "ต้องตามต่อ", latestContactDate: "2026-05-25", nextFollowupDate: today(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: uuid(), companyName: "บริษัท กรีนเอเชีย จำกัด", companyNumber: "0205564005555", contactName: "คุณปรียา ธรรมดา", contactPhone: "095-111-2233", contactEmail: "preya@greenasia.co", revenue: 7800000, registeredCapital: 2000000, profit: 890000, latestStatus: "ปิดการขาย", latestContactDate: "2026-05-20", nextFollowupDate: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: uuid(), companyName: "ร้าน นายดี มาร์เก็ต", companyNumber: "0405562088888", contactName: "คุณนายดี ร้านค้า", contactPhone: "087-999-0000", contactEmail: "naidee@market.th", revenue: 950000, registeredCapital: 500000, profit: 120000, latestStatus: "ไม่สนใจ", latestContactDate: "2026-05-15", nextFollowupDate: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export const SAMPLE_FOLLOWUPS = {
  [SAMPLE_LEADS[0].id]: [
    { id: uuid(), leadId: SAMPLE_LEADS[0].id, sequence: 1, date: "2026-05-28", detail: "โทรหาครั้งแรก นัดประชุมวันที่ 5 มิถุนายน", status: "มีตติ้ง", nextFollowupDate: "2026-06-03", completed: false, createdAt: new Date().toISOString() },
  ],
  [SAMPLE_LEADS[1].id]: [
    { id: uuid(), leadId: SAMPLE_LEADS[1].id, sequence: 1, date: "2026-05-30", detail: "ส่งโปรไฟล์บริษัททางอีเมล รอการตอบกลับ", status: "ฝากโปรไฟล์", nextFollowupDate: "2026-06-10", completed: false, createdAt: new Date().toISOString() },
  ],
  [SAMPLE_LEADS[2].id]: [
    { id: uuid(), leadId: SAMPLE_LEADS[2].id, sequence: 1, date: "2026-05-25", detail: "คุยเบื้องต้น ต้องโทรตามผลการพิจารณา", status: "ต้องตามต่อ", nextFollowupDate: today(), completed: false, createdAt: new Date().toISOString() },
  ],
};

export function createNewLead(form) {
  return {
    id: uuid(),
    ...form,
    revenue: Number(form.revenue) || 0,
    registeredCapital: Number(form.registeredCapital) || 0,
    profit: Number(form.profit) || 0,
    latestStatus: form.latestStatus || STATUSES[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}