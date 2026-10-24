import { EDUCATION, EXPERIENCE, LANGUAGES, PROFILE, SKILLS } from "@/lib/resume-data";

export function PersonJsonLd() {
  const currentJob = EXPERIENCE[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    alternateName: PROFILE.brand,
    jobTitle: PROFILE.role,
    url: PROFILE.siteUrl,
    email: `mailto:${PROFILE.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.location,
    },
    sameAs: [PROFILE.github, PROFILE.linkedin],
    knowsAbout: SKILLS,
    knowsLanguage: LANGUAGES.map((l) => l.name),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: EDUCATION.school,
    },
    worksFor: {
      "@type": "Organization",
      name: currentJob.company,
    },
    description: PROFILE.headline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
