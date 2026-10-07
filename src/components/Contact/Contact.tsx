import { useState, type FormEvent } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message';
    }
    return newErrors;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'darshana-jain',
      href: contactInfo.linkedin,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Darshujain',
      href: contactInfo.github,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div
        ref={ref}
        className={`section-container reveal ${visible ? 'reveal-visible' : ''}`}
      >
        <div className="mb-14 text-center">
          <p className="section-eyebrow">
            <MessageSquare className="h-3.5 w-3.5" />
            Get in touch
          </p>
          <h2 className="section-heading">
            {contactInfo.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-500 dark:text-ink-400">
            {contactInfo.subtext}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {contactCards.map((card) => (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.label !== 'Email' ? '_blank' : undefined}
                  rel={card.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="card-base card-hover flex items-center gap-4 p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/30">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-ink-400 dark:text-ink-500">{card.label}</p>
                    <p className="truncate text-sm font-semibold text-ink-700 dark:text-ink-200">
                      {card.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="card-base gradient-ring p-6 sm:p-8">
              {submitted && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Form validated successfully. Connect a backend to enable sending.</span>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink-700 dark:text-ink-200">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`input-field ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-700 dark:focus:ring-red-900' : ''}`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink-700 dark:text-ink-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`input-field ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-700 dark:focus:ring-red-900' : ''}`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink-700 dark:text-ink-200">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Your message..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`input-field resize-none ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-700 dark:focus:ring-red-900' : ''}`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full">
                <Send className="h-4 w-4" />
                Send Message
              </button>

              <p className="mt-3 text-center text-xs text-ink-400 dark:text-ink-500">
                This form is ready for backend integration. Messages are validated but not yet sent.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
