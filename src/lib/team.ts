export type TeamMember = {
  name: string;
  role: string;
  email?: string;
  photo?: string;
  city?: string;
  bio: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Shyam Kumar",
    role: "Founder & President",
    email: "shyam.kumar@example.org",
    photo: "/images/narendra_modi.jpg",
    city: "New Delhi",
    bio: "Guiding Karma's mission and building partnerships that help communities thrive.",
  },
  {
    name: "Anjali Verma",
    role: "Secretary",
    email: "anjali.verma@example.org",
    photo: "/images/logo.png",
    city: "New Delhi",
    bio: "Supporting transparent operations and keeping every initiative community-led.",
  },
  {
    name: "Ravi Singh",
    role: "Program Coordinator",
    photo: "/images/logo.png",
    city: "Gurugram",
    bio: "Coordinating on-ground programs across education, wellbeing, and the environment.",
  },
];
