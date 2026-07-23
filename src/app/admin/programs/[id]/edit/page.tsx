import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import UpcomingProgramForm from "@/components/UpcomingProgramForm";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateUpcomingProgramAction } from "../../actions";

function toDateTimeLocal(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default async function EditUpcomingProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") notFound();

  const program = await prisma.upcomingProgram.findUnique({ where: { id } });
  if (!program) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-paper">Edit upcoming program</h1>
      <div className="mt-8">
        <UpcomingProgramForm
          action={updateUpcomingProgramAction.bind(null, id)}
          submitLabel="Save changes"
          initial={{
            title: program.title,
            description: program.description,
            startsAt: toDateTimeLocal(program.startsAt),
            endsAt: program.endsAt ? toDateTimeLocal(program.endsAt) : null,
            location: program.location,
            image: program.image,
            registrationUrl: program.registrationUrl,
            published: program.published,
          }}
        />
      </div>
    </div>
  );
}
