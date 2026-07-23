import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberForm from "@/components/MemberForm";
import { updateMemberAction } from "../../actions";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-paper">Edit profile</h1>
      <div className="mt-8">
        <MemberForm
          action={updateMemberAction.bind(null, member.id)}
          submitLabel="Save changes"
          initial={{
            ...member,
            joinDate: member.joinDate.toISOString().slice(0, 10),
            exitDate: member.exitDate?.toISOString().slice(0, 10),
          }}
        />
      </div>
    </div>
  );
}
