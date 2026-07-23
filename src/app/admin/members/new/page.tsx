import MemberForm from "@/components/MemberForm";
import { prisma } from "@/lib/prisma";
import { createMemberAction } from "../actions";

export default async function NewMemberPage() {
  const result = await prisma.member.aggregate({
    _max: { sortOrder: true },
  });
  const nextSortOrder = (result._max.sortOrder ?? 0) + 1;

  return (
    <div>
      <h1 className="font-display text-2xl text-paper">Add profile</h1>
      <div className="mt-8">
        <MemberForm
          action={createMemberAction}
          initial={{ sortOrder: nextSortOrder }}
          submitLabel="Create profile"
        />
      </div>
    </div>
  );
}
