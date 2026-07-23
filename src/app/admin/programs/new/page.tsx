import UpcomingProgramForm from "@/components/UpcomingProgramForm";
import { createUpcomingProgramAction } from "../actions";

export default function NewUpcomingProgramPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-paper">Add upcoming program</h1>
      <div className="mt-8">
        <UpcomingProgramForm
          action={createUpcomingProgramAction}
          submitLabel="Create program"
        />
      </div>
    </div>
  );
}
