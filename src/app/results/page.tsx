import RoundResults from "@/components/RoundResults";
import { ROUND_RESULTS as round } from "@/round";

export default async function Results() {
  return <RoundResults round={round} />;
}
