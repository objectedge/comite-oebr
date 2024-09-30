"use server";

import { candidatesCollection } from "@/firestore";
import { unstable_cache as cache } from "next/cache";

export async function getCandidates(): Promise<Candidate[]> {
  const snapshot = await candidatesCollection.get();
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

const cachedCandidates = cache(getCandidates, ["candidates"]);

export const roundCandidates = async (round?: string) => {
  // Gambi pra filtrar apenas os candidatos do segundo turno
  const allCandidates = await cachedCandidates();
  if (round !== "2") return allCandidates;

  const secondRound = [
    "caroline.rosa@objectedge.com",
    "leonardo.lothamer@objectedge.com",
    "luciano.burger@objectedge.com",
    "yann.buffet@objectedge.com",
    "adriano.zanette@objectedge.com",
  ];
  return allCandidates.filter((c) => secondRound.includes(c.id));
};

export default cachedCandidates;
