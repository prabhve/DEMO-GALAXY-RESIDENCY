import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  Phone, 
  Mail, 
  User, 
  HelpCircle 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { EnquiryType } from '../../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const { addEnquiry } = useCMS();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    type: 'General Enquiry' as EnquiryType,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setError('Please fill in all required fields (Name, Phone, and Message).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      const id = addEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject || `${formData.type} from ${formData.name}`,
        type: formData.type,
        message: formData.message
      });

      setSubmittedId(id);
      setIsSubmitting(false);
    }, 500);
  };

  const handleClose = () => {
    setSubmittedId(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      type: 'General Enquiry',
      message: ''
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#14171f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#c8a97e] block">
              GALAXY RESIDENCY
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
              {submittedId ? 'Enquiry Submitted' : 'Submit an Enquiry'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
          {submittedId ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                Your Enquiry Has Been Received.
              </h3>

              <div className="inline-block px-4 py-1.5 bg-white/5 rounded-lg border border-white/10 font-mono text-sm text-[#c8a97e] my-3">
                Enquiry ID: {submittedId}
              </div>

              <p className="text-sm text-[#bbb8b0] max-w-md mx-auto leading-relaxed font-light mb-6">
                Thank you for contacting Galaxy Residency. Our administration desk will review your inquiry and get back to you shortly.
              </p>

              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#c8a97e] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-300">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                    Phone Number *
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
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8e8c87] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0f1115] border border-white/10 rounded-lg pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                    Enquiry Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as EnquiryType })}
                    className="w-full bg-[#0f1115] border border-white/10 rounded-lg px-3 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Room Enquiry">Room Enquiry</option>
                    <option value="Availability Enquiry">Availability Enquiry</option>
                    <option value="Dining Enquiry">Dining Enquiry</option>
                    <option value="Facility Enquiry">Facility Enquiry</option>
                    <option value="Meeting / Event Enquiry">Meeting / Event Enquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Short description of query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#0f1115] border border-white/10 rounded-lg px-4 py-3 sm:py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a09e99] mb-1.5">
                  Message / Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you regarding your stay, amenities, or admission?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0f1115] border border-white/10 rounded-lg p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#c8a97e]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-enquiry-form-btn"
                  className="w-full sm:w-auto min-h-[44px] px-7 py-3 bg-[#c8a97e] hover:bg-[#dbbe96] text-[#0f1115] font-semibold text-xs font-mono uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#c8a97e]/15"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
