export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  bloodGroup: string;
  address: string;
  registeredAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: { name: string; dosage: string; duration: string }[];
  notes: string;
}

export const patients: Patient[] = [
  { id: "p1", name: "John Doe", age: 34, gender: "Male", phone: "+92 300 1234567", email: "john@email.com", bloodGroup: "O+", address: "123 Main St, Karachi", registeredAt: "2025-01-15" },
  { id: "p2", name: "Fatima Khan", age: 28, gender: "Female", phone: "+92 321 9876543", email: "fatima@email.com", bloodGroup: "A+", address: "45 Park Ave, Lahore", registeredAt: "2025-02-03" },
  { id: "p3", name: "Ahmed Ali", age: 45, gender: "Male", phone: "+92 333 4567890", email: "ahmed@email.com", bloodGroup: "B+", address: "78 Garden Rd, Islamabad", registeredAt: "2025-01-20" },
  { id: "p4", name: "Sara Malik", age: 22, gender: "Female", phone: "+92 345 6789012", email: "sara@email.com", bloodGroup: "AB-", address: "12 Lake View, Karachi", registeredAt: "2025-03-10" },
  { id: "p5", name: "Usman Raza", age: 55, gender: "Male", phone: "+92 312 3456789", email: "usman@email.com", bloodGroup: "O-", address: "90 Hill St, Peshawar", registeredAt: "2025-02-18" },
  { id: "p6", name: "Ayesha Noor", age: 31, gender: "Female", phone: "+92 300 8765432", email: "ayesha@email.com", bloodGroup: "A-", address: "56 River Rd, Multan", registeredAt: "2025-03-01" },
];

export const appointments: Appointment[] = [
  { id: "a1", patientId: "p1", patientName: "John Doe", doctorName: "Dr. James Wilson", date: "2026-02-28", time: "09:00 AM", status: "confirmed", type: "General Checkup" },
  { id: "a2", patientId: "p2", patientName: "Fatima Khan", doctorName: "Dr. James Wilson", date: "2026-02-28", time: "10:30 AM", status: "pending", type: "Follow-up" },
  { id: "a3", patientId: "p3", patientName: "Ahmed Ali", doctorName: "Dr. James Wilson", date: "2026-02-28", time: "11:00 AM", status: "completed", type: "Consultation" },
  { id: "a4", patientId: "p4", patientName: "Sara Malik", doctorName: "Dr. James Wilson", date: "2026-03-01", time: "09:30 AM", status: "pending", type: "Lab Results Review" },
  { id: "a5", patientId: "p5", patientName: "Usman Raza", doctorName: "Dr. James Wilson", date: "2026-03-01", time: "02:00 PM", status: "confirmed", type: "General Checkup" },
  { id: "a6", patientId: "p6", patientName: "Ayesha Noor", doctorName: "Dr. James Wilson", date: "2026-02-28", time: "03:00 PM", status: "cancelled", type: "Dental" },
];

export const prescriptions: Prescription[] = [
  {
    id: "rx1", patientId: "p1", patientName: "John Doe", doctorName: "Dr. James Wilson", date: "2026-02-25",
    diagnosis: "Seasonal Flu",
    medicines: [
      { name: "Paracetamol", dosage: "500mg - 2x daily", duration: "5 days" },
      { name: "Cetirizine", dosage: "10mg - 1x daily", duration: "7 days" },
    ],
    notes: "Rest and drink plenty of fluids. Follow up in 1 week."
  },
  {
    id: "rx2", patientId: "p3", patientName: "Ahmed Ali", doctorName: "Dr. James Wilson", date: "2026-02-28",
    diagnosis: "Hypertension - Stage 1",
    medicines: [
      { name: "Amlodipine", dosage: "5mg - 1x daily", duration: "30 days" },
      { name: "Aspirin", dosage: "75mg - 1x daily", duration: "30 days" },
    ],
    notes: "Monitor BP daily. Low sodium diet recommended. Follow up in 4 weeks."
  },
  {
    id: "rx3", patientId: "p2", patientName: "Fatima Khan", doctorName: "Dr. James Wilson", date: "2026-02-20",
    diagnosis: "Vitamin D Deficiency",
    medicines: [
      { name: "Vitamin D3", dosage: "50,000 IU - 1x weekly", duration: "8 weeks" },
      { name: "Calcium", dosage: "500mg - 2x daily", duration: "30 days" },
    ],
    notes: "Increase sun exposure. Recheck levels after 8 weeks."
  },
];
