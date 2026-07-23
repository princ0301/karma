import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.SEED_ADMIN_NAME || "Admin";
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local before running the seed script."
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      password: hashed,
      role: "admin",
    },
  });

  console.log(`Admin user ready: ${admin.email}`);

  const existingPosts = await prisma.post.count();
  if (existingPosts === 0) {
    await prisma.post.createMany({
      data: [
        {
          title:
            "What a learning center taught us about showing up",
          slug: "showing-up-learning-center",
          excerpt:
            "Three years into our education program, the biggest lesson wasn't about curriculum — it was about consistency.",
          content: `[This is placeholder content — replace with your own story, photos, and details before publishing.]

When we started our first learning center, we assumed the hardest part would be the teaching itself. It turned out the hardest part was simpler: showing up, every single day, at the same time, in the same place.

## Why consistency mattered more than curriculum

Many of the children who came to the center had already been let down by inconsistency. What they needed first wasn't a better lesson plan — it was proof that this room, at this hour, would reliably be there for them.

*[Add specifics: which center, how many children, quotes from volunteers or families.]*`,
          cover: "/images/blog-cover-1.svg",
          tags: ["Education", "Field notes"],
          published: true,
          authorId: admin.id,
        },
        {
          title: "Small loans, bigger decisions",
          slug: "livelihood-program-notes",
          excerpt:
            "Micro-loans get most of the attention, but the training that comes before them is where the real change happens.",
          content: `[This is placeholder content — replace with your own story, data, and details before publishing.]

When people hear about our livelihood program, they usually ask about the loans first. After two years running this program, we believe the loan is the least interesting part of the story.

## The month before the money

Every participant goes through a few weeks of training before any loan is discussed: bookkeeping, understanding margins, thinking through what happens if a first attempt doesn't work.

*[Add specifics: number of participants, repayment rates, a story from someone in the program.]*`,
          cover: "/images/blog-cover-2.svg",
          tags: ["Livelihood", "Field notes"],
          published: true,
          authorId: admin.id,
        },
      ],
    });
    console.log("Sample posts created.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
