import MemberForm from "@/components/MemberForm";
import { createMemberAction } from "../actions";

export default function NewMemberPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-paper">Add profile</h1>
      <div className="mt-8">
        <MemberForm action={createMemberAction} submitLabel="Create profile" />
      </div>
    </div>
  );
}
