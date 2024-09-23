"use server";

import { candidatesCollection } from "@/firestore";
import { unstable_cache as cache } from "next/cache";

export async function getCandidates(): Promise<Candidate[]> {
  const snapshot = await candidatesCollection.get();
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

const cachedCandidates = cache(getCandidates, ["candidates"]);

export default cachedCandidates;
