import React, { useState, useMemo } from 'react';
import {
  Calendar, Clock, User, Users, Shield, HeartPulse, Stethoscope, 
  FileText, Settings, Plus, CheckCircle2, XCircle, AlertCircle, 
  Edit3, Trash2, Search, Filter, Phone, Mail, MapPin, 
  ChevronRight, Activity, Award, Check, X, Bell, LogOut,
  Download, Printer, RefreshCw, Eye, Sparkles, Building, Lock
} from 'lucide-react';

const INITIAL_USERS = [
  {
    id: 'u-admin-1',
    name: 'Admin Chief Officer',
    email: 'admin@medicare-plus.org',
    role: 'Admin',
    department: 'Hospital Administration',
    status: 'Active',
    phone: '+1 (555) 019-2831',
    joinDate: '2023-01-15'
  },
  {
    id: 'u-doc-1',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@medicare-plus.org',
    role: 'Doctor',
    department: 'Cardiology',
    status: 'Active',
    phone: '+1 (555) 234-5678',
    specialty: 'Cardiology',
    room: 'Wing B - Suite 304',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00', end: '17:00' },
    joinDate: '2023-03-10'
  },
  {
    id: 'u-doc-2',
    name: 'Dr. Alex Rivera',
    email: 'alex.rivera@medicare-plus.org',
    role: 'Doctor',
    department: 'Neurology',
    status: 'Active',
    phone: '+1 (555) 345-6789',
    specialty: 'Neurology',
    room: 'Wing A - Suite 102',
    workingDays: ['Monday', 'Wednesday', 'Friday'],
    workingHours: { start: '10:00', end: '16:00' },
    joinDate: '2023-05-20'
  },
  {
    id: 'u-doc-3',
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@medicare-plus.org',
    role: 'Doctor',
    department: 'Dermatology',
    status: 'Active',
    phone: '+1 (555) 876-5432',
    specialty: 'Dermatology',
    room: 'Wing C - Suite 201',
    workingDays: ['Tuesday', 'Thursday', 'Saturday'],
    workingHours: { start: '08:30', end: '15:30' },
    joinDate: '2023-08-11'
  },
  {
    id: 'u-pat-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Patient',
    department: 'General Patient',
    status: 'Active',
    phone: '+1 (555) 987-6543',
    bloodGroup: 'O+',
    allergies: 'Penicillin, Peanuts',
    emergencyContact: 'Jane Doe (+1 555-888-0011)',
    joinDate: '2024-02-14'
  },
  {
    id: 'u-pat-2',
    name: 'Emma Watson',
    email: 'emma.watson@example.com',
    role: 'Patient',
    department: 'General Patient',
    status: 'Active',
    phone: '+1 (555) 443-2211',
    bloodGroup: 'A-',
    allergies: 'None',
    emergencyContact: 'Mark Watson (+1 555-221-7788)',
    joinDate: '2024-03-01'
  },
  {
    id: 'u-pat-3',
    name: 'Robert Miller',
    email: 'r.miller@example.com',
    role: 'Patient',
    department: 'General Patient',
    status: 'Inactive',
    phone: '+1 (555) 321-9988',
    bloodGroup: 'B+',
    allergies: 'Sulfa drugs',
    emergencyContact: 'Claire Miller (+1 555-901-4433)',
    joinDate: '2024-01-20'
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-101',
    patientId: 'u-pat-1',
    patientName: 'John Doe',
    doctorId: 'u-doc-1',
    doctorName: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    date: '2026-10-10',
    time: '10:00 AM',
    reason: 'Routine ECG and checkup for mild palpitations',
    symptoms: 'Occasional flutter in chest after light exertion.',
    status: 'Confirmed',
    notes: 'Patient advised to bring past cardiac logs.'
  },
  {
    id: 'apt-102',
    patientId: 'u-pat-1',
    patientName: 'John Doe',
    doctorId: 'u-doc-3',
    doctorName: 'Dr. Elena Rostova',
    specialty: 'Dermatology',
    date: '2026-10-14',
    time: '02:30 PM',
    reason: 'Annual skin mole inspection',
    symptoms: 'Mild irritation around forearm patch.',
    status: 'Pending',
    notes: ''
  },
  {
    id: 'apt-103',
    patientId: 'u-pat-2',
    patientName: 'Emma Watson',
    doctorId: 'u-doc-1',
    doctorName: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    date: '2026-10-09',
    time: '11:30 AM',
    reason: 'Hypertension follow-up',
    symptoms: 'Minor morning dizziness.',
    status: 'Confirmed',
    notes: 'Check blood pressure journal.'
  },
  {
    id: 'apt-104',
    patientId: 'u-pat-2',
    patientName: 'Emma Watson',
    doctorId: 'u-doc-2',
    doctorName: 'Dr. Alex Rivera',
    specialty: 'Neurology',
    date: '2026-09-28',
    time: '09:00 AM',
    reason: 'Migraine aura evaluation',
    symptoms: 'Visual flashing lights before headache.',
    status: 'Completed',
    notes: 'Prescribed Topiramate 25mg. Scheduled MRI baseline.'
  },
  {
    id: 'apt-105',
    patientId: 'u-pat-3',
    patientName: 'Robert Miller',
    doctorId: 'u-doc-1',
    doctorName: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    date: '2026-09-15',
    time: '03:00 PM',
    reason: 'Chest tightness check',
    symptoms: 'Shortness of breath on stairs.',
    status: 'Cancelled',
    notes: 'Cancelled by patient due to schedule conflict.'
  }
];

const INITIAL_RECORDS = [
  {
    id: 'rec-01',
    patientId: 'u-pat-1',
    doctorId: 'u-doc-1',
    doctorName: 'Dr. Sarah Smith',
    date: '2026-08-15',
    diagnosis: 'Mild Sinus Bradycardia',
    vitals: { bp: '118/76 mmHg', pulse: '58 bpm', weight: '76 kg', temp: '98.4 F' },
    prescriptions: ['CoQ10 100mg Daily', 'Multivitamin Plus - 1 tab/day'],
    clinicalNotes: 'Electrocardiogram demonstrated rhythmic normal sinus pacing. No ischemic ST changes. Advised routine aerobic walking and hydration.',
    labReports: ['Resting ECG 12-lead (Normal)', 'Complete Blood Count (WNL)']
  },
  {
    id: 'rec-02',
    patientId: 'u-pat-1',
    doctorId: 'u-doc-3',
    doctorName: 'Dr. Elena Rostova',
    date: '2026-05-10',
    diagnosis: 'Contact Dermatitis (Forearm)',
    vitals: { bp: '120/80 mmHg', pulse: '68 bpm', weight: '75.5 kg', temp: '98.6 F' },
    prescriptions: ['Hydrocortisone 1% Topical Cream - Apply twice daily for 7 days'],
    clinicalNotes: 'Well demarcated erythematous plaque over left distal arm. Suspected contact with industrial cleansing detergent. Good response to topical treatment.',
    labReports: ['Skin patch test negative for nickel']
  },
  {
    id: 'rec-03',
    patientId: 'u-pat-2',
    doctorId: 'u-doc-2',
    doctorName: 'Dr. Alex Rivera',
    date: '2026-09-28',
    diagnosis: 'Classic Migraine with Aura',
    vitals: { bp: '112/70 mmHg', pulse: '72 bpm', weight: '62 kg', temp: '98.2 F' },
    prescriptions: ['Sumatriptan 50mg (at onset of aura)', 'Magnesium Glycinate 400mg daily'],
    clinicalNotes: 'Patient experiences scintillating scotoma followed by unilateral throbbing pain. Cranial nerves I-XII grossly intact. No focal deficits.',
    labReports: ['Brain MRI scan ordered']
  }
];

const INITIAL_SETTINGS = {
  facilityName: 'Medicare+ Regional Healthcare System',
  supportEmail: 'contact@medicare-plus.org',
  emergencyHotline: '+1 (800) 555-9111',
  operatingHours: 'Monday - Saturday: 08:00 AM - 08:00 PM (Emergency 24/7)',
  address: '742 Healthcare Boulevard, Metro Medical City, CA 90210',
  appointmentNoticeHours: 24,
  autoConfirmEmergency: true,
  allowPatientCancellations: true,
  maintenanceMode: false,
  departments: ['Cardiology', 'Neurology', 'Dermatology', 'General Medicine', 'Pediatrics', 'Orthopedics']
};

const ToastNotification = ({ toast, onClose }) => {
  if (!toast) return null;
  const isError = toast.type === 'error';
  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center space-x-3 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 ${
      isError ? 'bg-rose-600 text-white' : 'bg-emerald-700 text-white'
    }`}>
      {isError ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
      <span className="text-sm font-medium pr-2">{toast.message}</span>
      <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function App() {
  // Global Application State
  const [currentUserRole, setCurrentUserRole] = useState('Patient'); // 'Patient' | 'Doctor' | 'Admin'
  const [activeTab, setActiveTab] = useState('appointments'); // Role-dependent default tab
  const [users, setUsers] = useState(INITIAL_USERS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [toast, setToast] = useState(null);

  // Active User Contexts based on role
  const currentPatient = useMemo(() => users.find(u => u.id === 'u-pat-1') || users[4], [users]);
  const currentDoctor = useMemo(() => users.find(u => u.id === 'u-doc-1') || users[1], [users]);
  const currentAdmin = useMemo(() => users.find(u => u.id === 'u-admin-1') || users[0], [users]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Switch Role Handler
  const handleRoleChange = (newRole) => {
    setCurrentUserRole(newRole);
    if (newRole === 'Patient') setActiveTab('book');
    if (newRole === 'Doctor') setActiveTab('schedule');
    if (newRole === 'Admin') setActiveTab('analytics');
    showToast(`Switched workspace to: ${newRole} View`);
  };

  const PatientDashboard = () => {
    const [subTab, setSubTab] = useState('book'); // 'book', 'my-appointments', 'medical-history', 'profile'
    
    // Booking Form State
    const [selectedDept, setSelectedDept] = useState('Cardiology');
    const [selectedDoctorId, setSelectedDoctorId] = useState(currentDoctor.id);
    const [bookingDate, setBookingDate] = useState('2026-10-12');
    const [bookingTime, setBookingTime] = useState('10:30 AM');
    const [reason, setReason] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedRecordToView, setSelectedRecordToView] = useState(null);

    // Patient Profile Form State
    const [profileData, setProfileData] = useState({
      name: currentPatient.name,
      email: currentPatient.email,
      phone: currentPatient.phone,
      bloodGroup: currentPatient.bloodGroup,
      allergies: currentPatient.allergies,
      emergencyContact: currentPatient.emergencyContact,
      newPassword: ''
    });

    const doctorsInDept = useMemo(() => {
      return users.filter(u => u.role === 'Doctor' && u.department === selectedDept && u.status === 'Active');
    }, [users, selectedDept]);

    const patientAppointments = useMemo(() => {
      return appointments.filter(a => a.patientId === currentPatient.id);
    }, [appointments, currentPatient.id]);

    const patientRecords = useMemo(() => {
      return records.filter(r => r.patientId === currentPatient.id);
    }, [records, currentPatient.id]);

    const handleCreateBooking = (e) => {
      e.preventDefault();
      if (!reason.trim()) {
        showToast('Please specify the primary reason for your consultation', 'error');
        return;
      }
      const targetDoc = users.find(u => u.id === selectedDoctorId);
      const newApt = {
        id: `apt-${Date.now().toString().slice(-4)}`,
        patientId: currentPatient.id,
        patientName: currentPatient.name,
        doctorId: targetDoc ? targetDoc.id : currentDoctor.id,
        doctorName: targetDoc ? targetDoc.name : currentDoctor.name,
        specialty: selectedDept,
        date: bookingDate,
        time: bookingTime,
        reason: reason,
        symptoms: symptoms || 'None specified',
        status: 'Confirmed',
        notes: 'Booked via patient online portal.'
      };

      setAppointments(prev => [newApt, ...prev]);
      setShowConfirmModal(false);
      setReason('');
      setSymptoms('');
      showToast('Appointment booked successfully! Confirmation sent to your email.');
      setSubTab('my-appointments');
    };

    const handleCancelAppointment = (id) => {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
      showToast('Appointment successfully cancelled');
    };

    const handleProfileUpdate = (e) => {
      e.preventDefault();
      setUsers(prev => prev.map(u => u.id === currentPatient.id ? { ...u, ...profileData } : u));
      showToast('Personal medical profile updated successfully');
    };

    return (
      <div className="space-y-6">
        {/* Patient Sub Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setSubTab('book')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              subTab === 'book'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
          <button
            onClick={() => setSubTab('my-appointments')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              subTab === 'my-appointments'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>My Appointments ({patientAppointments.length})</span>
          </button>
          <button
            onClick={() => setSubTab('medical-history')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              subTab === 'medical-history'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Medical History ({patientRecords.length})</span>
          </button>
          <button
            onClick={() => setSubTab('profile')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              subTab === 'profile'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Vitals</span>
          </button>
        </div>

        {/* TAB 1: BOOK APPOINTMENT */}
        {subTab === 'book' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Schedule a Consultation</h3>
                  <p className="text-sm text-slate-500">Choose a specialist, date, and preferred time slot</p>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Medical Specialty
                    </label>
                    <select
                      value={selectedDept}
                      onChange={(e) => {
                        setSelectedDept(e.target.value);
                        const match = users.find(u => u.role === 'Doctor' && u.department === e.target.value);
                        if (match) setSelectedDoctorId(match.id);
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-800 text-sm"
                    >
                      {settings.departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Select Doctor
                    </label>
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-800 text-sm"
                    >
                      {doctorsInDept.length > 0 ? (
                        doctorsInDept.map(doc => (
                          <option key={doc.id} value={doc.id}>{doc.name} ({doc.room || 'General OPD'})</option>
                        ))
                      ) : (
                        <option value="">No active doctors in this department</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Consultation Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      min="2026-10-09"
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Available Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['09:30 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '04:45 PM'].map(time => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setBookingTime(time)}
                          className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                            bookingTime === time
                              ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Reason for Visit <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chest pain follow-up, Routine cardiovascular check, Skin rash"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Current Symptoms or Observations
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Describe any symptoms, duration, intensity, or previous medications taken..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-800 text-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl text-sm shadow-md shadow-teal-700/20 transition-all flex items-center space-x-2"
                  >
                    <span>Proceed to Confirm</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar quick info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center space-x-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <HeartPulse className="w-4 h-4" />
                  <span>Immediate Assistance</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Need Urgent Care?</h4>
                <p className="text-sm text-slate-300 mb-4">
                  If you are experiencing severe chest pain, shortness of breath, or trauma, please reach our 24/7 ER directly.
                </p>
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                  <p className="text-xs text-slate-300">Hospital Emergency Hotline</p>
                  <p className="text-lg font-bold text-teal-200">{settings.emergencyHotline}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Building className="w-4 h-4 text-teal-600" />
                  <span>Facility Notice</span>
                </h4>
                <ul className="text-xs space-y-2 text-slate-600">
                  <li className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                    <span>Please arrive 15 minutes prior to appointment for vitals screening.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                    <span>Bring government photo ID and relevant prior diagnostic files.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                    <span>Free cancellation up to 24 hours prior to booked consultation.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* BOOKING CONFIRMATION MODAL */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
              <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-center mb-1">Confirm Appointment Booking</h3>
              <p className="text-xs text-slate-500 text-center mb-5">Please verify your consultation details before confirming.</p>

              <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 text-xs text-slate-700 border border-slate-200/60 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-900">{selectedDept}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Physician:</span>
                  <span className="font-semibold text-slate-900">
                    {users.find(u => u.id === selectedDoctorId)?.name || 'Dr. Selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-semibold text-slate-900">{bookingDate} at {bookingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reason:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[200px]">{reason}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-100"
                >
                  Adjust Details
                </button>
                <button
                  type="button"
                  onClick={handleCreateBooking}
                  className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-700/20"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY APPOINTMENTS */}
        {subTab === 'my-appointments' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Scheduled Appointments</h3>
                <p className="text-sm text-slate-500">Track and manage upcoming and past clinical visits</p>
              </div>
              <button
                onClick={() => setSubTab('book')}
                className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 hover:bg-teal-800 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Appointment</span>
              </button>
            </div>

            {patientAppointments.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <p className="font-medium text-slate-700">No appointments scheduled</p>
                <p className="text-xs text-slate-400 mt-1">Book your first doctor appointment above.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {patientAppointments.map(apt => (
                  <div key={apt.id} className="p-6 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-slate-900 text-base">{apt.doctorName}</span>
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                          {apt.specialty}
                        </span>
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          apt.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          apt.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{apt.reason}</p>
                      {apt.notes && (
                        <p className="text-xs text-slate-400 italic">Doctor notes: {apt.notes}</p>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-teal-600" />
                          <span>{apt.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          <span>{apt.time}</span>
                        </span>
                        <span className="text-slate-400">ID: {apt.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => handleCancelAppointment(apt.id)}
                          className="px-3 py-1.5 border border-rose-200 text-rose-600 text-xs font-medium rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          Cancel Appointment
                        </button>
                      )}
                      {apt.status === 'Completed' && (
                        <button
                          onClick={() => setSubTab('medical-history')}
                          className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-lg hover:bg-teal-100 transition-colors"
                        >
                          View EMR Report
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MEDICAL HISTORY (EMR) */}
        {subTab === 'medical-history' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Personal Health & Clinical Records</h3>
                <p className="text-sm text-slate-500">Verified doctor diagnoses, prescriptions, and lab history</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Health Summary</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {patientRecords.map(rec => (
                <div key={rec.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">{rec.date}</span>
                      <h4 className="text-lg font-bold text-slate-900">{rec.diagnosis}</h4>
                      <p className="text-xs text-slate-500">Consultant: {rec.doctorName}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-700">BP: <b>{rec.vitals.bp}</b></span>
                      <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-700">Pulse: <b>{rec.vitals.pulse}</b></span>
                      <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-700">Weight: <b>{rec.vitals.weight}</b></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Evaluation</h5>
                      <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                        {rec.clinicalNotes}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Prescriptions & Investigations</h5>
                      <div className="space-y-2">
                        {rec.prescriptions.map((p, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{p}</span>
                          </div>
                        ))}
                        {rec.labReports.map((lab, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-teal-800 bg-teal-50 px-3 py-2 rounded-lg border border-teal-100 font-medium">
                            <Activity className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span>{lab}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE MANAGEMENT */}
        {subTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 max-w-3xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Personal Health Profile</h3>
            <p className="text-sm text-slate-500 mb-6">Manage personal records, emergency contacts, and vital information</p>

            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Blood Group</label>
                  <select
                    value={profileData.bloodGroup}
                    onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Known Allergies</label>
                  <input
                    type="text"
                    value={profileData.allergies}
                    onChange={(e) => setProfileData({ ...profileData, allergies: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Emergency Contact (Name & Phone)</label>
                <input
                  type="text"
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-700 text-white rounded-xl text-sm font-semibold hover:bg-teal-800 shadow-md transition-all"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };

  const DoctorDashboard = () => {
    const [docTab, setDocTab] = useState('appointments'); // 'appointments', 'schedule', 'records'
    const [selectedPatientForEncounter, setSelectedPatientForEncounter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Schedule form state
    const [startHour, setStartHour] = useState(currentDoctor.workingHours?.start || '09:00');
    const [endHour, setEndHour] = useState(currentDoctor.workingHours?.end || '17:00');
    const [selectedDays, setSelectedDays] = useState(currentDoctor.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

    // EMR Encounter Entry State
    const [encounterDiagnosis, setEncounterDiagnosis] = useState('');
    const [encounterVitalsBp, setEncounterVitalsBp] = useState('120/80');
    const [encounterVitalsPulse, setEncounterVitalsPulse] = useState('72');
    const [encounterVitalsWeight, setEncounterVitalsWeight] = useState('70 kg');
    const [encounterNotes, setEncounterNotes] = useState('');
    const [encounterPrescription, setEncounterPrescription] = useState('');

    const doctorAppointments = useMemo(() => {
      return appointments.filter(a => a.doctorId === currentDoctor.id);
    }, [appointments, currentDoctor.id]);

    const doctorPatients = useMemo(() => {
      return users.filter(u => u.role === 'Patient' && (
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phone.includes(searchQuery)
      ));
    }, [users, searchQuery]);

    const handleUpdateAppointmentStatus = (aptId, newStatus) => {
      setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: newStatus } : a));
      showToast(`Appointment status updated to ${newStatus}`);
    };

    const handleSaveSchedule = (e) => {
      e.preventDefault();
      setUsers(prev => prev.map(u => u.id === currentDoctor.id ? {
        ...u,
        workingDays: selectedDays,
        workingHours: { start: startHour, end: endHour }
      } : u));
      showToast('Doctor schedule and working hours updated successfully!');
    };

    const handleToggleDay = (day) => {
      if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter(d => d !== day));
      } else {
        setSelectedDays([...selectedDays, day]);
      }
    };

    const handleSaveEncounterNote = (e) => {
      e.preventDefault();
      if (!selectedPatientForEncounter || !encounterDiagnosis.trim()) {
        showToast('Please provide diagnosis details', 'error');
        return;
      }

      const newRecord = {
        id: `rec-${Date.now().toString().slice(-4)}`,
        patientId: selectedPatientForEncounter.id,
        doctorId: currentDoctor.id,
        doctorName: currentDoctor.name,
        date: new Date().toISOString().split('T')[0],
        diagnosis: encounterDiagnosis,
        vitals: {
          bp: `${encounterVitalsBp} mmHg`,
          pulse: `${encounterVitalsPulse} bpm`,
          weight: encounterVitalsWeight,
          temp: '98.6 F'
        },
        prescriptions: encounterPrescription ? [encounterPrescription] : ['None'],
        clinicalNotes: encounterNotes || 'Follow-up consultation conducted.',
        labReports: ['Standard clinical assessment completed']
      };

      setRecords(prev => [newRecord, ...prev]);
      
      // Update any pending appointment for this patient to completed
      setAppointments(prev => prev.map(a => 
        (a.patientId === selectedPatientForEncounter.id && a.doctorId === currentDoctor.id && a.status === 'Confirmed')
          ? { ...a, status: 'Completed', notes: `Encounter logged: ${encounterDiagnosis}` }
          : a
      ));

      setSelectedPatientForEncounter(null);
      setEncounterDiagnosis('');
      setEncounterNotes('');
      setEncounterPrescription('');
      showToast('Electronic Medical Record (EMR) successfully logged!');
    };

    return (
      <div className="space-y-6">
        {/* Doctor Sub Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setDocTab('appointments')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              docTab === 'appointments'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Consultation Queue ({doctorAppointments.length})</span>
          </button>
          <button
            onClick={() => setDocTab('records')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              docTab === 'records'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Patient EMR Records</span>
          </button>
          <button
            onClick={() => setDocTab('schedule')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              docTab === 'schedule'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule & Availability</span>
          </button>
        </div>

        {/* SUBTAB 1: DOCTOR APPOINTMENTS QUEUE */}
        {docTab === 'appointments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Upcoming Today</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {doctorAppointments.filter(a => a.status === 'Confirmed').length}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Awaiting Confirmation</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">
                    {doctorAppointments.filter(a => a.status === 'Pending').length}
                  </p>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Completed Visits</p>
                  <p className="text-2xl font-bold text-teal-700 mt-1">
                    {doctorAppointments.filter(a => a.status === 'Completed').length}
                  </p>
                </div>
                <div className="p-3 bg-teal-50 text-teal-700 rounded-xl">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Patient Appointments for {currentDoctor.name}</h3>
                  <p className="text-sm text-slate-500">Confirm visits, review symptoms, and trigger medical encounters</p>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {doctorAppointments.map(apt => (
                  <div key={apt.id} className="p-6 hover:bg-slate-50/60 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-slate-900 text-base">{apt.patientName}</span>
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          apt.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          apt.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium">{apt.reason}</p>
                      {apt.symptoms && (
                        <p className="text-xs text-slate-500">
                          <span className="font-semibold text-slate-600">Reported Symptoms:</span> {apt.symptoms}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-slate-400 pt-1">
                        <span>Date: <b>{apt.date}</b></span>
                        <span>Slot: <b>{apt.time}</b></span>
                        <span>Appt ID: {apt.id}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {apt.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateAppointmentStatus(apt.id, 'Confirmed')}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Confirm</span>
                        </button>
                      )}

                      {apt.status === 'Confirmed' && (
                        <button
                          onClick={() => {
                            const pat = users.find(u => u.id === apt.patientId);
                            if (pat) {
                              setSelectedPatientForEncounter(pat);
                              setDocTab('records');
                            }
                          }}
                          className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm"
                        >
                          <Stethoscope className="w-3.5 h-3.5" />
                          <span>Start Consultation</span>
                        </button>
                      )}

                      {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateAppointmentStatus(apt.id, 'Cancelled')}
                          className="px-3 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium"
                        >
                          Decline
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: PATIENT EMR RECORDS & ENCOUNTERS */}
        {docTab === 'records' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Search & List */}
            <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Select Patient</h4>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search patient name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                {doctorPatients.map(pat => (
                  <div
                    key={pat.id}
                    onClick={() => setSelectedPatientForEncounter(pat)}
                    className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                      selectedPatientForEncounter?.id === pat.id
                        ? 'bg-teal-50 border border-teal-200 text-teal-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-xs text-slate-900">{pat.name}</p>
                      <p className="text-[11px] text-slate-500">{pat.phone} • {pat.bloodGroup}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Encounter Creator or View */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
              {selectedPatientForEncounter ? (
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        Medical Encounter: {selectedPatientForEncounter.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Blood: <span className="font-semibold">{selectedPatientForEncounter.bloodGroup}</span> | 
                        Allergies: <span className="font-semibold text-rose-600">{selectedPatientForEncounter.allergies || 'None'}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedPatientForEncounter(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  </div>

                  <form onSubmit={handleSaveEncounterNote} className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Blood Pressure</label>
                        <input
                          type="text"
                          value={encounterVitalsBp}
                          onChange={(e) => setEncounterVitalsBp(e.target.value)}
                          placeholder="e.g. 120/80"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Pulse (bpm)</label>
                        <input
                          type="text"
                          value={encounterVitalsPulse}
                          onChange={(e) => setEncounterVitalsPulse(e.target.value)}
                          placeholder="e.g. 72"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Weight</label>
                        <input
                          type="text"
                          value={encounterVitalsWeight}
                          onChange={(e) => setEncounterVitalsWeight(e.target.value)}
                          placeholder="e.g. 74 kg"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Primary Clinical Diagnosis <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={encounterDiagnosis}
                        onChange={(e) => setEncounterDiagnosis(e.target.value)}
                        placeholder="e.g. Stage 1 Essential Hypertension, Sinus Tachycardia"
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Prescription & Dosage</label>
                      <input
                        type="text"
                        value={encounterPrescription}
                        onChange={(e) => setEncounterPrescription(e.target.value)}
                        placeholder="e.g. Amlodipine 5mg OD, Aspirin 75mg post lunch"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Clinical Observations & Recommendations</label>
                      <textarea
                        rows="4"
                        value={encounterNotes}
                        onChange={(e) => setEncounterNotes(e.target.value)}
                        placeholder="Document physical findings, auscultation, risk factor assessment, and follow-up guidance..."
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Log to Patient Medical History</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400">
                  <User className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-600">No Patient Selected</p>
                  <p className="text-xs">Click on any patient from the left column to view or log their clinical encounter notes.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SUBTAB 3: SCHEDULE MANAGEMENT */}
        {docTab === 'schedule' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 max-w-2xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Physician Weekly Schedule</h3>
            <p className="text-sm text-slate-500 mb-6">Manage available consulting days and active operational clinic hours</p>

            <form onSubmit={handleSaveSchedule} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Available Consultation Days</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => handleToggleDay(day)}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{day}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Shift Start Time</label>
                  <input
                    type="time"
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Shift End Time</label>
                  <input
                    type="time"
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-700 text-white text-sm font-semibold rounded-xl hover:bg-teal-800 shadow-md transition-all"
                >
                  Save Schedule Preferences
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };

  const AdminDashboard = () => {
    const [adminTab, setAdminTab] = useState('analytics'); // 'analytics', 'users', 'appointments', 'settings'
    
    // User Filter & Search
    const [userSearch, setUserSearch] = useState('');
    const [userRoleFilter, setUserRoleFilter] = useState('All');
    
    // User Modal State (Add/Edit)
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userFormData, setUserFormData] = useState({
      name: '',
      email: '',
      role: 'Doctor',
      department: 'Cardiology',
      phone: '',
      status: 'Active'
    });

    // Appointment Filter
    const [aptStatusFilter, setAptStatusFilter] = useState('All');

    // System Settings Form
    const [settingsData, setSettingsData] = useState({ ...settings });

    // Filtered Users
    const filteredUsers = useMemo(() => {
      return users.filter(u => {
        const matchesRole = userRoleFilter === 'All' || u.role === userRoleFilter;
        const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                              u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                              u.department.toLowerCase().includes(userSearch.toLowerCase());
        return matchesRole && matchesSearch;
      });
    }, [users, userRoleFilter, userSearch]);

    // Filtered Hospital Appointments
    const filteredAppointments = useMemo(() => {
      return appointments.filter(a => {
        return aptStatusFilter === 'All' || a.status === aptStatusFilter;
      });
    }, [appointments, aptStatusFilter]);

    // Handlers for User CRUD
    const handleOpenUserModal = (user = null) => {
      if (user) {
        setEditingUser(user);
        setUserFormData({
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          phone: user.phone,
          status: user.status
        });
      } else {
        setEditingUser(null);
        setUserFormData({
          name: '',
          email: '',
          role: 'Doctor',
          department: 'Cardiology',
          phone: '',
          status: 'Active'
        });
      }
      setShowUserModal(true);
    };

    const handleSaveUser = (e) => {
      e.preventDefault();
      if (!userFormData.name.trim() || !userFormData.email.trim()) {
        showToast('Please fill all mandatory user fields', 'error');
        return;
      }

      if (editingUser) {
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...userFormData } : u));
        showToast(`User ${userFormData.name} successfully updated`);
      } else {
        const newUser = {
          id: `u-${Date.now().toString().slice(-4)}`,
          ...userFormData,
          joinDate: new Date().toISOString().split('T')[0]
        };
        setUsers(prev => [newUser, ...prev]);
        showToast(`New ${userFormData.role} account created successfully!`);
      }
      setShowUserModal(false);
    };

    const handleDeleteUser = (id, name) => {
      if (id === currentAdmin.id) {
        showToast('Cannot delete the root administrator account!', 'error');
        return;
      }
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast(`User ${name} has been removed from the system`);
    };

    const handleToggleUserStatus = (id) => {
      setUsers(prev => prev.map(u => {
        if (u.id === id) {
          const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      }));
      showToast('User account status updated');
    };

    const handleSaveSystemSettings = (e) => {
      e.preventDefault();
      setSettings(settingsData);
      showToast('Hospital system parameters and policies saved!');
    };

    return (
      <div className="space-y-6">
        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              adminTab === 'analytics'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Operations Overview</span>
          </button>
          <button
            onClick={() => setAdminTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              adminTab === 'users'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Management ({users.length})</span>
          </button>
          <button
            onClick={() => setAdminTab('appointments')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              adminTab === 'appointments'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointment Oversight ({appointments.length})</span>
          </button>
          <button
            onClick={() => setAdminTab('settings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              adminTab === 'settings'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Hospital Settings</span>
          </button>
        </div>

        {/* SUBTAB 1: ANALYTICS OVERVIEW */}
        {adminTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Active Patients</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {users.filter(u => u.role === 'Patient').length}
                  </p>
                  <span className="text-[11px] text-emerald-600 font-medium">100% portal verified</span>
                </div>
                <div className="p-3 bg-teal-50 text-teal-700 rounded-xl">
                  <User className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">On-Duty Doctors</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {users.filter(u => u.role === 'Doctor' && u.status === 'Active').length}
                  </p>
                  <span className="text-[11px] text-slate-400">Across 6 specialties</span>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Stethoscope className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Total Consultations</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{appointments.length}</p>
                  <span className="text-[11px] text-emerald-600 font-medium">94% fill rate</span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">System Health</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">Optimal</p>
                  <span className="text-[11px] text-slate-400">EMR sync active</span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <HeartPulse className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Department Breakdown & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4 text-base">Department Capacity & Doctors</h4>
                <div className="space-y-3">
                  {settings.departments.map(dept => {
                    const count = users.filter(u => u.role === 'Doctor' && u.department === dept).length;
                    return (
                      <div key={dept} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <span className="text-sm font-semibold text-slate-800">{dept}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-500">{count} Active Physician(s)</span>
                          <span className={`w-2.5 h-2.5 rounded-full ${count > 0 ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4 text-base">Facility & Network Status</h4>
                <div className="space-y-3.5 text-xs text-slate-600">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span>Clinical Facility:</span>
                    <span className="font-bold text-slate-900">{settings.facilityName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span>Emergency Hotline:</span>
                    <span className="font-bold text-rose-600">{settings.emergencyHotline}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span>Patient Booking Window:</span>
                    <span className="font-bold text-slate-900">{settings.appointmentNoticeHours}h advance notice</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Maintenance Window:</span>
                    <span className="font-semibold text-emerald-600">Online & Serving Patients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: USER MANAGEMENT */}
        {adminTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">User Accounts Directory</h3>
                <p className="text-sm text-slate-500">Manage access credentials, roles, and account status</p>
              </div>

              <button
                onClick={() => handleOpenUserModal()}
                className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 hover:bg-teal-800 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New User</span>
              </button>
            </div>

            {/* Filter bar */}
            <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, email, department..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500">Role:</span>
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
                >
                  <option value="All">All Roles</option>
                  <option value="Doctor">Doctors</option>
                  <option value="Patient">Patients</option>
                  <option value="Admin">Admins</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50/50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-6">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Department / Dept</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                            user.role === 'Doctor' ? 'bg-teal-100 text-teal-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-xs">{user.name}</p>
                            <p className="text-[11px] text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium">
                        <span className={`px-2 py-0.5 rounded-md ${
                          user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                          user.role === 'Doctor' ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                          'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-700">{user.department}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                            user.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">{user.phone}</td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenUserModal(user)}
                            className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-slate-100 rounded-lg"
                            title="Edit User"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USER CREATE / EDIT MODAL */}
        {showUserModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-bold text-slate-900 text-base">
                  {editingUser ? 'Edit User Credentials' : 'Add New Hospital User'}
                </h3>
                <button onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    required
                    placeholder="e.g. Dr. Jennifer Collins"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={userFormData.email}
                      onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                      required
                      placeholder="user@medicare.org"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={userFormData.phone}
                      onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">System Role</label>
                    <select
                      value={userFormData.role}
                      onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    >
                      <option value="Doctor">Doctor</option>
                      <option value="Patient">Patient</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Department</label>
                    <select
                      value={userFormData.department}
                      onChange={(e) => setUserFormData({ ...userFormData, department: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    >
                      {settings.departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                      <option value="General Patient">General Patient</option>
                      <option value="Hospital Administration">Hospital Administration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Account Status</label>
                  <select
                    value={userFormData.status}
                    onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold shadow-md"
                  >
                    {editingUser ? 'Save Updates' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SUBTAB 3: APPOINTMENT OVERSIGHT */}
        {adminTab === 'appointments' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Hospital-Wide Appointments</h3>
                <p className="text-sm text-slate-500">Monitor schedules, reassign slots, or override booking states</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500">Filter Status:</span>
                <select
                  value={aptStatusFilter}
                  onChange={(e) => setAptStatusFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredAppointments.map(apt => (
                <div key={apt.id} className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-slate-900 text-sm">Patient: {apt.patientName}</span>
                      <span className="text-xs text-slate-400">→</span>
                      <span className="text-xs font-semibold text-teal-700">{apt.doctorName} ({apt.specialty})</span>
                      <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                        apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        apt.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        apt.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">Reason: {apt.reason}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span>Schedule: {apt.date} at {apt.time}</span>
                      <span>Ref: {apt.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {apt.status !== 'Completed' && (
                      <button
                        onClick={() => {
                          setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: 'Completed' } : a));
                          showToast(`Appointment ${apt.id} marked Completed`);
                        }}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100"
                      >
                        Force Complete
                      </button>
                    )}
                    {apt.status !== 'Cancelled' && (
                      <button
                        onClick={() => {
                          setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: 'Cancelled' } : a));
                          showToast(`Appointment ${apt.id} cancelled by Administrator`);
                        }}
                        className="px-3 py-1.5 border border-rose-200 text-rose-600 rounded-lg text-xs font-medium hover:bg-rose-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 4: SYSTEM SETTINGS */}
        {adminTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 max-w-3xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Hospital System Settings</h3>
            <p className="text-sm text-slate-500 mb-6">Configure facility credentials, booking boundaries, and emergency information</p>

            <form onSubmit={handleSaveSystemSettings} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Facility Name</label>
                  <input
                    type="text"
                    value={settingsData.facilityName}
                    onChange={(e) => setSettingsData({ ...settingsData, facilityName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settingsData.supportEmail}
                    onChange={(e) => setSettingsData({ ...settingsData, supportEmail: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">24/7 Emergency Hotline</label>
                  <input
                    type="text"
                    value={settingsData.emergencyHotline}
                    onChange={(e) => setSettingsData({ ...settingsData, emergencyHotline: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-rose-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Advance Booking Notice (Hours)</label>
                  <input
                    type="number"
                    value={settingsData.appointmentNoticeHours}
                    onChange={(e) => setSettingsData({ ...settingsData, appointmentNoticeHours: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Facility Street Address</label>
                <input
                  type="text"
                  value={settingsData.address}
                  onChange={(e) => setSettingsData({ ...settingsData, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Allow Patient Direct Cancellations</p>
                    <p className="text-[11px] text-slate-500">Enable patients to independently cancel upcoming consultations</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsData.allowPatientCancellations}
                    onChange={(e) => setSettingsData({ ...settingsData, allowPatientCancellations: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Emergency Instant Confirmation</p>
                    <p className="text-[11px] text-slate-500">Auto-confirm urgent symptom bookings without doctor queue</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsData.autoConfirmEmergency}
                    onChange={(e) => setSettingsData({ ...settingsData, autoConfirmEmergency: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-semibold hover:bg-teal-800 shadow-md transition-all"
                >
                  Update System Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* TOP BAR: Role Switcher & Live Simulation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-lg tracking-tight flex items-center space-x-1.5">
                  <span>Medicare</span>
                  <span className="text-teal-700">+</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  Healthcare System
                </span>
              </div>
            </div>

            {/* Quick Interactive Role Switcher */}
            <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 hidden sm:inline-block">
                View Role:
              </span>
              <button
                onClick={() => handleRoleChange('Patient')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  currentUserRole === 'Patient'
                    ? 'bg-white text-teal-800 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Patient</span>
                <span className="text-[10px] text-slate-400 hidden md:inline">({currentPatient.name})</span>
              </button>

              <button
                onClick={() => handleRoleChange('Doctor')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  currentUserRole === 'Doctor'
                    ? 'bg-white text-teal-800 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                <span>Doctor</span>
                <span className="text-[10px] text-slate-400 hidden md:inline">({currentDoctor.name})</span>
              </button>

              <button
                onClick={() => handleRoleChange('Admin')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  currentUserRole === 'Admin'
                    ? 'bg-white text-teal-800 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-purple-600" />
                <span>Administrator</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Welcome Banner */}
        <div className="mb-6 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-teal-200 mb-3 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Workspace: {currentUserRole} Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentUserRole === 'Patient' && `Welcome, ${currentPatient.name}`}
              {currentUserRole === 'Doctor' && `Welcome back, ${currentDoctor.name}`}
              {currentUserRole === 'Admin' && `Hospital Oversight Control Center`}
            </h1>
            <p className="mt-1 text-sm text-teal-100/80 max-w-2xl">
              {currentUserRole === 'Patient' &&
                'Book consultations, review certified clinical records, and manage personal medical logs.'}
              {currentUserRole === 'Doctor' &&
                'Manage clinical appointment queues, examine patient symptoms, log EMR prescriptions, and customize weekly clinic hours.'}
              {currentUserRole === 'Admin' &&
                'Manage system-wide medical users, supervise doctor appointments across departments, and adjust hospital facility rules.'}
            </p>
          </div>
        </div>

        {/* Dynamic Role Dashboard Render */}
        {currentUserRole === 'Patient' && <PatientDashboard />}
        {currentUserRole === 'Doctor' && <DoctorDashboard />}
        {currentUserRole === 'Admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 {settings.facilityName}. Fully Compliant Online Healthcare Portal.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-600">
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>ER: {settings.emergencyHotline}</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-600">
              <Mail className="w-3.5 h-3.5 text-teal-600" />
              <span>{settings.supportEmail}</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating System Toast */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
