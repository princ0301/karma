export type Volunteer = {
  name: string;
  role: string;
  email?: string;
  photo?: string;
  city?: string;
  quote?: string;
};

export const volunteers: Volunteer[] = [
  {
    name: "Shyam Kumar",
    role: "Education Volunteer",
    email: "shyam.kumar@example.org",
    photo: "/images/narendra_modi.jpg",
    city: "New Delhi",
    quote: "Helping children learn with confidence, one session at a time.",
  },
  {
    name: "Anjali Verma",
    role: "Community Outreach Volunteer",
    email: "anjali.verma@example.org",
    photo: "/images/dhramendra.jpg",
    city: "New Delhi",
    quote: "Listening to communities is where meaningful work begins.",
  },
  {
    name: "Ravi Singh",
    role: "Environment Volunteer",
    photo: "/images/narendra_modi.jpg",
    city: "Gurugram",
    quote: "Small actions today create healthier neighbourhoods tomorrow.",
  },
];
