/**
 * Shared section header: the uppercase eyebrow + display ``h2`` (+ optional
 * sub-paragraph) repeated across Courses, WhyUs, Founder, Testimonials,
 * ContactChannels and LeadForm. Callers pass already-resolved strings.
 *
 * The default bottom margins match the most common section (Courses). Sections
 * with different spacing override via ``headingClassName`` / ``subheadingClassName``
 * so the refactor keeps pixel-for-pixel parity with the previous markup.
 */
export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  headingClassName = 'mb-4',
  subheadingClassName = 'mb-10 sm:mb-14',
}: {
  eyebrow: string;
  heading: string;
  subheading?: string;
  headingClassName?: string;
  subheadingClassName?: string;
}) {
  return (
    <>
      <div className="mb-3.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        {eyebrow}
      </div>
      <h2
        className={`font-extrabold leading-[1.05] tracking-[-0.03em] text-balance text-[clamp(30px,4vw,56px)] text-ink ${headingClassName}`}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={`mx-auto max-w-[620px] text-[18px] leading-[1.55] text-ink-2 ${subheadingClassName}`}
        >
          {subheading}
        </p>
      )}
    </>
  );
}
