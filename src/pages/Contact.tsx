import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, ChevronDown, CheckCircle2, AlertCircle, Clock, MapPin, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Who is responsible for hosting and domain management?",
    answer: "I am not responsible for hosting or managing a domain. All domain registrations, DNS configurations, and ongoing subscription fees are owned and managed directly by you. I am happy to guide you through the initial setup or recommend premium hosting environments, but ultimate ownership and administrative control remains with the client."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Most bespoke design and frontend engineering projects span between 4 to 8 weeks. This structural workflow encompasses meticulous research, visual identity concepts, detailed wireframing, high-fidelity development, and strict optimization cycles."
  },
  {
    question: "What deliverables do I receive upon completion?",
    answer: "For branding, you will receive full brand guidelines, vector files, high-resolution graphic assets, and font licenses. For web development, you receive a production-ready, lightning-fast codebase configured to run perfectly across all devices and optimized for modern search engines."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes. I offer tailored post-launch retainers that cover ongoing technical updates, regular visual refinements, and optimization checks to ensure your application continues to deliver exceptional user-experiences."
  }
];

const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1-2 months',
  'Within 3-6 months',
  'Just exploring / No rush'
];

const SERVICE_OPTIONS = [
  'Brand Identity',
  'Web Design',
  'Graphics / Social Posts'
];

const BUDGET_OPTIONS = [
  'Under £500',
  '£500 - £750',
  '£750 - £1,000',
  '£1,000+'
];

const SOURCE_OPTIONS = [
  'Google Search',
  'Social Media',
  'Referral / Word of Mouth',
  'Previous Work',
  'Other'
];

interface CustomSelectProps {
  id?: string;
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (val: string) => void;
  required?: boolean;
}

function CustomSelect({ id, label, value, options, placeholder = "SELECT THE OPTION PLEASE", onChange, required = false }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="flex flex-col relative w-full">
      <label 
        className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-200 block mb-3.5"
      >
        {label}
      </label>
      
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#111111] border rounded-none h-16 px-5 flex items-center justify-between text-left transition-all duration-200 outline-none select-none ${
          isOpen 
            ? 'border-[#194896] shadow-[0_0_12px_rgba(25,72,150,0.15)]' 
            : 'border-neutral-900/80 hover:border-neutral-800'
        }`}
      >
        <span className={`font-mono text-xs uppercase tracking-[0.05em] ${value ? 'text-white' : 'text-neutral-500'}`}>
          {value ? value.toUpperCase() : placeholder}
        </span>
        <div className={`transition-transform duration-200 text-neutral-400 ${isOpen ? 'rotate-180 text-[#194896]' : ''}`}>
          <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
            <path d="M0 0L4 5L8 0H0Z" />
          </svg>
        </div>
      </button>

      {/* Hidden input to support standard HTML validation / required field checking */}
      <input 
        type="text"
        tabIndex={-1}
        required={required}
        value={value}
        onChange={() => {}}
        className="sr-only pointer-events-none absolute bottom-0 left-1/2 w-0 h-0 opacity-0"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-[#1e1e1e] border border-neutral-800 shadow-[0_15px_30px_rgba(0,0,0,0.5)] rounded-none overflow-hidden max-h-72 overflow-y-auto"
          >
            <div className="py-2">
              {options.map((opt) => {
                const isSelected = value === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className="w-full h-14 px-5 flex items-center justify-between text-left hover:bg-neutral-800/60 transition-colors group select-none"
                  >
                    <span className={`font-mono text-xs uppercase tracking-[0.05em] transition-colors ${
                      isSelected ? 'text-white font-medium' : 'text-neutral-300'
                    }`}>
                      {opt.toUpperCase()}
                    </span>
                    <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'border-[#194896] bg-[#194896]/10' 
                        : 'border-neutral-800 group-hover:border-neutral-600'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-[#194896]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    timeline: '',
    service: '',
    budget: '',
    source: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/jspaul2000@proton.me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          'Company Name': formData.companyName,
          'Company Website': formData.companyWebsite,
          'Project Timeline': formData.timeline,
          'Services Needed': formData.service,
          'Estimated Budget': formData.budget,
          'Referral Source': formData.source,
          Message: formData.message,
          _subject: `New Project Inquiry from ${formData.name}`
        })
      });

      const result = await response.json();
      if (result.success === 'true' || response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          companyName: '',
          companyWebsite: '',
          timeline: '',
          service: '',
          budget: '',
          source: '',
          message: ''
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 bg-[#050505] text-white min-h-screen selection:bg-neutral-800 selection:text-white">
      <div className="w-full">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 border-b border-neutral-900/60 pb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-neutral-500 tracking-[0.3em] uppercase block">Start a project</span>
            <span className="h-px w-6 bg-neutral-800"></span>
          </div>
          <h1 className="font-display text-[9vw] md:text-[5.5vw] leading-[1.05] font-extrabold tracking-tighter uppercase">
            LET'S WORK <span className="text-neutral-600 block sm:inline">TOGETHER.</span>
          </h1>
        </div>

        {/* Full Width Layout Stack */}
        <div className="space-y-24 md:space-y-32">
          
          {/* Interactive Premium Form (Full Width Column) */}
          <div className="relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.01] rounded-full blur-[100px] pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col items-center text-center py-20"
                >
                  <div className="w-14 h-14 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-white mb-6">
                    <CheckCircle2 className="w-6 h-6 text-neutral-300" />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-wider mb-3">INQUIRY DISPATCHED</h3>
                  <p className="text-neutral-400 text-xs md:text-sm max-w-sm mb-8 leading-relaxed font-sans">
                    Thank you. Your project brief has been logged successfully. I will review your deliverables and reach back via email within 24 to 48 hours.
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="font-mono text-xs uppercase tracking-widest px-6 py-2.5 border border-neutral-800 hover:border-white transition-colors rounded-none"
                  >
                    Submit Another Brief
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-10"
                  layout
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {/* Your Name */}
                    <div className="flex flex-col">
                      <label 
                        htmlFor="form-name" 
                        className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-200 block mb-3.5"
                      >
                        YOUR NAME *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#111111] border border-neutral-900/80 rounded-none h-16 px-5 outline-none focus:border-neutral-700 transition-all font-sans text-sm text-white"
                        placeholder=""
                        id="form-name"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                      <label 
                        htmlFor="form-email" 
                        className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-200 block mb-3.5"
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#111111] border border-neutral-900/80 rounded-none h-16 px-5 outline-none focus:border-neutral-700 transition-all font-sans text-sm text-white"
                        placeholder=""
                        id="form-email"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col">
                      <label 
                        htmlFor="form-company" 
                        className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-200 block mb-3.5"
                      >
                        COMPANY NAME
                      </label>
                      <input 
                        type="text" 
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-[#111111] border border-neutral-900/80 rounded-none h-16 px-5 outline-none focus:border-neutral-700 transition-all font-sans text-sm text-white"
                        placeholder=""
                        id="form-company"
                      />
                    </div>

                    {/* Company Website */}
                    <div className="flex flex-col">
                      <label 
                        htmlFor="form-website" 
                        className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-200 block mb-3.5"
                      >
                        COMPANY WEBSITE
                      </label>
                      <input 
                        type="url" 
                        value={formData.companyWebsite}
                        onChange={(e) => setFormData({...formData, companyWebsite: e.target.value})}
                        className="w-full bg-[#111111] border border-neutral-900/80 rounded-none h-16 px-5 outline-none focus:border-neutral-700 transition-all font-sans text-sm text-white"
                        placeholder=""
                        id="form-website"
                      />
                    </div>

                    {/* Project Timeline Select */}
                    <CustomSelect
                      id="form-timeline"
                      label="WHEN DO YOU NEED YOUR NEW BRAND TO COME TO LIFE? *"
                      value={formData.timeline}
                      options={TIMELINE_OPTIONS}
                      onChange={(val) => setFormData({...formData, timeline: val})}
                      required
                    />

                    {/* Services Needed Select */}
                    <CustomSelect
                      id="form-service"
                      label="WHAT SERVICES ARE YOU LOOKING FOR? *"
                      value={formData.service}
                      options={SERVICE_OPTIONS}
                      onChange={(val) => setFormData({...formData, service: val})}
                      required
                    />

                    {/* Estimated Budget Select */}
                    <CustomSelect
                      id="form-budget"
                      label="WHAT'S YOUR BUDGET? *"
                      value={formData.budget}
                      options={BUDGET_OPTIONS}
                      onChange={(val) => setFormData({...formData, budget: val})}
                      required
                    />

                    {/* Referral Source Select */}
                    <CustomSelect
                      id="form-source"
                      label="HOW DID YOU HEAR ABOUT US? *"
                      value={formData.source}
                      options={SOURCE_OPTIONS}
                      onChange={(val) => setFormData({...formData, source: val})}
                      required
                    />
                  </div>

                  {/* Message / Brief Box */}
                  <div className="flex flex-col">
                    <label 
                      htmlFor="form-message" 
                      className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-200 block mb-3.5"
                    >
                      TELL US ABOUT THE PROJECT (SCOPE, TIMELINE, BUDGET) *
                    </label>
                    <textarea 
                      id="form-message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder=""
                      className="w-full bg-[#111111] border border-neutral-900/80 rounded-none p-5 h-56 outline-none focus:border-neutral-700 transition-all font-sans text-sm text-white resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  {/* Error Notification */}
                  {formStatus === 'error' && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono p-4 rounded-none">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>An error occurred during submission. Please try again or email directly.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 px-6 font-mono text-xs uppercase tracking-[0.25em] bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 transition-all font-bold rounded-none flex items-center justify-center gap-2.5 group cursor-pointer"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-neutral-500 border-t-black rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Proposal</span>
                        <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Details & FAQs Stacked Section (Studio content first, FAQ below) */}
          <div className="space-y-24 border-t border-neutral-900/60 pt-20">
            
            {/* Studio Content Section: Elegant Minimalist Statement */}
            <div className="space-y-12">
              <div className="max-w-4xl space-y-6">
                <p className="font-sans text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] leading-[1.12] tracking-[-0.03em] font-medium text-white">
                  Tailored design, high-end layouts, and premium digital systems.
                </p>
                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-sans max-w-2xl">
                  Whether establishing a brand identity or engineering a custom web platform, I focus on premium, lightweight aesthetics that convert.
                </p>
              </div>

              {/* Direct Contacts Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-neutral-900/40">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.2em] block">Email directly</span>
                  <a href="mailto:jspaul2000@proton.me" className="text-neutral-300 hover:text-white transition-colors text-xs md:text-sm font-mono block">
                    jspaul2000@proton.me
                  </a>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.2em] block">Location</span>
                  <span className="text-neutral-300 text-xs md:text-sm block">United Kingdom (Remote)</span>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.2em] block">Active hours</span>
                  <span className="text-neutral-300 text-xs md:text-sm block">Mon &ndash; Fri, 09:00 &ndash; 18:00 GMT</span>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Section below Studio content */}
            <div className="space-y-10 pt-16 border-t border-neutral-900/40">
              <div>
                <span className="font-mono text-xs text-neutral-500 tracking-[0.2em] uppercase block mb-2">FAQ</span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight">Got Questions?</h3>
              </div>
              
              <div className="border-t border-neutral-900 divide-y divide-neutral-900">
                {faqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div 
                      key={index}
                      className="overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full py-7 text-left flex justify-between items-center gap-6 hover:opacity-85 transition-opacity group"
                      >
                        <span className="font-sans text-lg sm:text-xl md:text-2xl font-medium text-neutral-300 group-hover:text-white transition-colors leading-snug tracking-tight">
                          {faq.question}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          >
                            <div className="pb-8 text-base md:text-lg text-neutral-400 leading-relaxed font-sans pt-2">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
