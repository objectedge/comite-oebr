import CandidateFormControl from "@/components/CandidateFormControl";
import { roundCandidates } from "@/actions/get-candidates";
import { CURRENT_ROUND } from "@/round";

export default async function Home() {
  const candidates = await roundCandidates(CURRENT_ROUND);
  return <CandidateFormControl candidates={candidates} />;
}
