import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Calendar, 
  Users, 
  Bed, 
  Phone, 
  Mail, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Info,
  CalendarCheck
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomName?: string;
  preselectedRoomId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  preselectedRoomName = '', 
  preselectedRoomId = '' 
}) => {
  const { rooms, addBookingRequest } = useCMS();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    preferredContact: 'Phone' as 'Phone' | 'WhatsApp' | 'Email',
    roomId: preselectedRoomId || (rooms[0] ? rooms[0].id : ''),
    roomName: preselectedRoomName || (rooms[0] ? rooms[0].name : 'Accommodation'),
    checkIn: '',
    checkOut: '',
    guests: 1,
    purposeOfStay: 'Student / Academic',
    specialRequest: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedRequestId, setGeneratedRequestId] = useState<string | null>(null);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name.';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = 'Please enter a valid mobile phone number.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.roomId) {
      newErrors.roomId = 'Please select an accommodation type.';
    }
    if (!formData.checkIn) {
      newErrors.checkIn = 'Please select your tentative check-in date.';
    }
    if (!formData.checkOut) {
      newErrors.checkOut = 'Please select your tentative check-out date.';
    } else if (formData.checkIn && formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = 'Check-out date must be after check-in date.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const selected = rooms.find(r => r.id === id);
    setFormData(prev => ({
      ...prev,
      roomId: id,
      roomName: selected ? selected.name : ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const reqId = addBookingRequest({
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        roomId: formData.roomId,
        roomName: formData.roomName,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: Number(formData.guests),
        specialRequest: formData.specialRequest 
          ? `[Purpose: ${formData.purposeOfStay}] ${formData.specialRequest}` 
          : `[Purpose: ${formData.purposeOfStay}]`,
        preferredContact: formData.preferredContact
      });

      setGeneratedRequestId(reqId);
      setIsSubmitting(false);
      setStep(4);
    }, 600);
  };

  const resetAndClose = () => {
    setStep(1);
    setGeneratedRequestId(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={resetAndClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#14171f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#c8a97e] block">
              GALAXY RESIDENCY • KNOWLEDGE PARK III
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
              {step === 4 ? 'Booking Request Received' : 'Request Stay Booking'}
            </h2>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress (Steps 1-3) */}
        {step < 4 && (
          <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-2 shrink-0">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono mb-2">
              <span className={step >= 1 ? 'text-[#c8a97e]' : 'text-[#787671]'}>1. Details</span>
              <span className={step >= 2 ? 'text-[#c8a97e]' : 'text-[#787671]'}>2. Dates & Room</span>
              <span className={step >= 3 ? 'text-[#c8a97e]' : 'text-[#787671]'}>3. Preferences</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#c8a97e] to-[#dfc7a5] transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Your legal or institutional name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                  />
                </div>
                {errors.customerName && <p className="text-xs text-rose-400 mt-1">{errors.customerName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Phone', 'WhatsApp', 'Email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredContact: method })}
                      className={`min-h-[44px] py-2.5 text-xs font-mono uppercase rounded-lg border transition-all ${
                        formData.preferredContact === method
                          ? 'bg-[#c8a97e] text-[#0f1115] font-semibold border-[#c8a97e]'
                          : 'bg-white/5 text-[#a09e99] border-white/10 hover:border-white/20'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-3 sm:py-2.5 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                >
                  <span>NEXT: STAY DATES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Stay Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                  Select Accommodation Type *
                </label>
                <div className="relative">
                  <Bed className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.roomId}
                    onChange={handleRoomChange}
                    className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.availabilityStatus})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.roomId && <p className="text-xs text-rose-400 mt-1">{errors.roomId}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                    Tentative Check-in *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                  {errors.checkIn && <p className="text-xs text-rose-400 mt-1">{errors.checkIn}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                    Tentative Check-out *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                  {errors.checkOut && <p className="text-xs text-rose-400 mt-1">{errors.checkOut}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                  >
                    <option value={1}>1 Resident / Guest</option>
                    <option value={2}>2 Residents / Guests</option>
                    <option value={3}>3 Residents / Group</option>
                    <option value={4}>4+ Group Accommodation</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-mono uppercase text-[#bbb8b0] hover:text-white rounded-lg border border-white/10 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                >
                  <span>NEXT: PREFERENCES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Preferences & Confirmation */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                  Purpose of Stay
                </label>
                <select
                  value={formData.purposeOfStay}
                  onChange={(e) => setFormData({ ...formData, purposeOfStay: e.target.value })}
                  className="w-full bg-[#0f1115] border border-white/10 rounded-lg px-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                >
                  <option value="Student / Academic">University / College Student</option>
                  <option value="Internship / Training">Internship / Corporate Training in Greater Noida</option>
                  <option value="Parent / Visitor">Parent / Visiting Family Member</option>
                  <option value="Faculty / Professional">Visiting Academic / Faculty</option>
                  <option value="Other">Other Residency Purpose</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                  Special Requests / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., quiet study corner, upper floor preference, mess meal plan details, batch enrollment"
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  className="w-full bg-[#0f1115] border border-white/10 rounded-lg p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                />
              </div>

              {/* Factual Disclaimer */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs text-[#a09e99]">
                <Info className="w-4 h-4 text-[#c8a97e] shrink-0 mt-0.5" />
                <div>
                  <strong>Request-Based Model:</strong> This website does not charge automatic payment. Submitting this form creates a request. The Galaxy Residency front desk team will contact you to verify room availability, dormitory rules, and final confirmation.
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-mono uppercase text-[#bbb8b0] hover:text-white rounded-lg border border-white/10 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-booking-request-btn"
                  className="w-full sm:w-auto min-h-[44px] px-7 py-2.5 bg-[#c8a97e] hover:bg-[#dbbe96] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#c8a97e]/20"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{isSubmitting ? 'SUBMITTING REQUEST...' : 'CONFIRM REQUEST'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success State */}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                Your Stay Request Has Been Received.
              </h3>

              <div className="inline-block px-4 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-sm text-[#c8a97e] my-4">
                Request ID: {generatedRequestId}
              </div>

              <p className="text-sm text-[#bbb8b0] max-w-md mx-auto leading-relaxed font-light mb-6">
                Thank you, <strong>{formData.customerName}</strong>. Our front office team will review your accommodation request for <strong>{formData.roomName}</strong> and connect with you via {formData.preferredContact}.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg"
                >
                  DONE
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
