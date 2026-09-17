import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronDown, 
  FileText, 
  Info,
  Clock
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const PoliciesSection: React.FC = () => {
  const { policies } = useCMS();
  const [openPolicyId, setOpenPolicyId] = useState<string | null>(null);

  const publishedPolicies = policies.filter(p => p.published && p.content.trim().length > 0);

  if (publishedPolicies.length === 0) {
    return null;
  }

  const togglePolicy = (id: string) => {
    setOpenPolicyId(openPolicyId === id ? null : id);
  };

  return (
    <section 
      id="policies" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0f1115] border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8a97e] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TERMS & RESIDENCY GUIDELINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Residency Policies & Code of Conduct
          </h2>
          <p className="mt-3 text-sm text-[#a09e99] font-light leading-relaxed">
            Standard guidelines governing stay procedures, check-in verification, and community harmony at Galaxy Residency.
          </p>
        </div>

        {/* Policy Accordion */}
        <div className="space-y-4">
          {publishedPolicies.map((pol) => {
            const isOpen = openPolicyId === pol.id;

            return (
              <div
                key={pol.id}
                className="rounded-2xl bg-[#14171f] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => togglePolicy(pol.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a97e]"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#c8a97e] shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e8c87] block">
                        {pol.type}
                      </span>
                      <span className="text-base sm:text-lg font-serif font-medium text-white">
                        {pol.title}
                      </span>
                    </div>
                  </div>

                  <ChevronDown 
                    className={`w-5 h-5 text-[#c8a97e] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 text-sm text-[#bbb8b0] leading-relaxed font-light">
                    <p className="whitespace-pre-line">{pol.content}</p>
                    
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#787671]">
                      <Clock className="w-3 h-3" />
                      <span>Last reviewed for Galaxy Residency dormitory regulations</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
