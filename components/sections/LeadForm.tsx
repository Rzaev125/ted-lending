'use client';

import { ChevronDown, Send } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { type FormEvent, useState } from 'react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { LandingCourse } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'invalid';

const TIME_SLOT_KEYS = ['asap', 'morning', 'afternoon', 'evening', 'weekend'] as const;

/**
 * Source attribution for the CRM funnel (ТЗ §10): read the campaign source from
 * the URL (``?utm_source=…`` / ``?source=…`` / ``?ref=…``) so leads from
 * Instagram / TikTok / Facebook ads are tagged; fall back to a plain ``landing``.
 * Read at submit time (client-only) so there is no SSR ``window`` access.
 */
function readLeadSource(): string {
  if (typeof window === 'undefined') return 'landing';
  const params = new URLSearchParams(window.location.search);
  const utm = params.get('utm_source') ?? params.get('source') ?? params.get('ref');
  return utm ? utm.trim().slice(0, 64) : 'landing';
}

export function LeadForm({ courses }: { courses: LandingCourse[] }) {
  const locale = useLocale();
  const t = useTranslations('form');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // The form is noValidate, so enforce required fields ourselves. Phone min
    // length mirrors the backend (LeadCreate.phone min_length=3).
    const nameInvalid = !name.trim();
    const phoneInvalid = phone.trim().length < 3;
    if (nameInvalid || phoneInvalid) {
      setErrors({ name: nameInvalid, phone: phoneInvalid });
      setStatus('invalid');
      return;
    }
    setErrors({});
    setStatus('submitting');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          full_name: name.trim(),
          phone: phone.trim(),
          course: course.trim() || undefined,
          preferred_time_slot: timeSlot.trim() || undefined,
          source: readLeadSource(),
          website,
        }),
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }
      setStatus('success');
      setName('');
      setPhone('');
      setCourse('');
      setTimeSlot('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="form" className="px-5 py-16 text-center sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal>
          <div className="glass mx-auto max-w-[720px] p-6 text-left sm:p-14">
            <div className="text-center">
              <SectionHeading
                eyebrow={t('title')}
                heading={t('heading')}
                subheading={t('subheading')}
                headingClassName="mb-3"
                subheadingClassName="mb-7 sm:mb-10"
              />
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5 grid grid-cols-1 gap-3.5 sm:mb-7 sm:grid-cols-2 sm:gap-4.5">
                <Field label={t('fields.name')} invalid={errors.name}>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (errors.name) setErrors((e) => ({ ...e, name: false }));
                      if (status === 'invalid') setStatus('idle');
                    }}
                    placeholder={t('fields.namePlaceholder')}
                    id="lead-name"
                    required
                    aria-required
                    aria-invalid={errors.name || undefined}
                    aria-describedby={errors.name ? 'lead-error' : undefined}
                    className={`rounded-[18px] border bg-white/55 px-4.5 py-3.5 text-[15px] outline-none backdrop-blur-sm transition-all focus:bg-white/85 sm:py-4 ${
                      errors.name
                        ? 'border-accent-pink/70 focus:border-accent-pink focus:shadow-[0_0_0_4px_rgba(166,1,169,0.15)]'
                        : 'border-white/50 focus:border-primary focus:shadow-[0_0_0_4px_rgba(36,21,194,0.12)]'
                    }`}
                  />
                </Field>
                <Field label={t('fields.phone')} invalid={errors.phone}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      if (errors.phone) setErrors((e) => ({ ...e, phone: false }));
                      if (status === 'invalid') setStatus('idle');
                    }}
                    placeholder={t('fields.phonePlaceholder')}
                    id="lead-phone"
                    required
                    aria-required
                    aria-invalid={errors.phone || undefined}
                    aria-describedby={errors.phone ? 'lead-error' : undefined}
                    className={`rounded-[18px] border bg-white/55 px-4.5 py-3.5 text-[15px] outline-none backdrop-blur-sm transition-all focus:bg-white/85 sm:py-4 ${
                      errors.phone
                        ? 'border-accent-pink/70 focus:border-accent-pink focus:shadow-[0_0_0_4px_rgba(166,1,169,0.15)]'
                        : 'border-white/50 focus:border-primary focus:shadow-[0_0_0_4px_rgba(36,21,194,0.12)]'
                    }`}
                  />
                </Field>
                <Field label={t('fields.course')}>
                  <div className="relative">
                    <select
                      value={course}
                      onChange={(event) => setCourse(event.target.value)}
                      className="w-full appearance-none rounded-[18px] border border-white/50 bg-white/55 px-4.5 py-3.5 pr-11 text-[15px] outline-none backdrop-blur-sm transition-all focus:border-primary focus:bg-white/85 focus:shadow-[0_0_0_4px_rgba(36,21,194,0.12)] sm:py-4"
                    >
                      <option value="">{t('fields.coursePlaceholder')}</option>
                      {courses.map((c) => (
                        // Submit the canonical RU title so the stored value is
                        // language-stable yet still human-readable in the funnel.
                        <option key={c.id} value={resolveLocalized(c.title, 'ru')}>
                          {resolveLocalized(c.title, locale)}
                        </option>
                      ))}
                      <option value="not-sure">{t('fields.courseNotSure')}</option>
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-3"
                    />
                  </div>
                </Field>
                <Field label={t('fields.time')}>
                  <div className="relative">
                    <select
                      value={timeSlot}
                      onChange={(event) => setTimeSlot(event.target.value)}
                      className="w-full appearance-none rounded-[18px] border border-white/50 bg-white/55 px-4.5 py-3.5 pr-11 text-[15px] outline-none backdrop-blur-sm transition-all focus:border-primary focus:bg-white/85 focus:shadow-[0_0_0_4px_rgba(36,21,194,0.12)] sm:py-4"
                    >
                      <option value="">{t('fields.timePlaceholder')}</option>
                      {TIME_SLOT_KEYS.map((key) => (
                        <option key={key} value={t(`timeSlots.${key}`)}>
                          {t(`timeSlots.${key}`)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-3"
                    />
                  </div>
                </Field>
              </div>

              {/* Honeypot — visible only to bots. Real users tab past it
                  thanks to ``tabIndex={-1}`` and the off-screen positioning. */}
              <label
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              >
                {t('honeypotLabel')}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  name="website"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="focus-ring inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[16px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(12,20,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-primary disabled:opacity-60 sm:py-5"
              >
                {status === 'submitting' ? t('submitting') : t('submit')}
                <Send className="size-4.5" />
              </button>

              <p className="mt-4 text-center text-[13px] text-ink-3">{t('consent')}</p>

              {status === 'success' && (
                <p
                  role="status"
                  className="mt-4 rounded-[16px] bg-success/20 px-4 py-3 text-center text-[14px] font-semibold text-success-strong"
                >
                  {t('success')}
                </p>
              )}
              {(status === 'error' || status === 'invalid') && (
                <p
                  id="lead-error"
                  role="alert"
                  className="mt-4 rounded-[16px] bg-accent-pink/20 px-4 py-3 text-center text-[14px] font-semibold text-danger-strong"
                >
                  {status === 'invalid' ? t('errorValidation') : t('error')}
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  invalid,
  children,
}: {
  label: string;
  invalid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left sm:gap-2">
      <span
        className={`text-[13px] font-semibold tracking-[-0.005em] ${invalid ? 'text-accent-pink' : 'text-ink-2'}`}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
