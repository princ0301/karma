export type Cause = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  detail: string;
  icon: "book" | "heart-pulse" | "hand-coins" | "leaf";
};

export const causes: Cause[] = [
  {
    slug: "education",
    title: "Education",
    eyebrow: "Learning",
    summary:
      "After-school learning centers and scholarships that keep children in school.",
    detail:
      "We run community learning centers for children who are falling behind in school, provide school supplies and uniforms, and offer scholarships for students who want to continue past the 10th grade. [Add specific program details, locations, and reach numbers here.]",
    icon: "book",
  },
  {
    slug: "health",
    title: "Health & Wellness",
    eyebrow: "Care",
    summary:
      "Free health camps, maternal care support, and health awareness drives.",
    detail:
      "Our health camps bring basic checkups, medicines, and specialist referrals to communities with limited access to healthcare, alongside maternal health support and awareness sessions on hygiene and nutrition. [Add specific program details, locations, and reach numbers here.]",
    icon: "heart-pulse",
  },
  {
    slug: "livelihood",
    title: "Livelihood",
    eyebrow: "Dignity",
    summary:
      "Skill-building and micro-enterprise support so families can earn sustainably.",
    detail:
      "We train adults in vocational skills — tailoring, digital literacy, and small trades — and help them access micro-loans and market linkages to start or grow small businesses. [Add specific program details, locations, and reach numbers here.]",
    icon: "hand-coins",
  },
  {
    slug: "environment",
    title: "Environment",
    eyebrow: "Renewal",
    summary:
      "Tree plantation drives, waste management, and climate awareness programs.",
    detail:
      "From neighborhood plantation drives to school programs on waste segregation, we work with local communities to build everyday habits that protect the environment they live in. [Add specific program details, locations, and reach numbers here.]",
    icon: "leaf",
  },
];
