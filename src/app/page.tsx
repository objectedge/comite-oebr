import CandidateFormControl from "@/components/CandidateFormControl";
import getCandidates from "@/actions/get-candidates";

export default async function Home() {
  const candidates = await getCandidates();
  return <CandidateFormControl candidates={candidates} />;
}
