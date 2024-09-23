"use server";

import { auth } from "@/auth";
import END_OF_ELECTION from "@/end-of-election";
import { default as fs, voteesCollection, votesCollection } from "@/firestore";
import { CURRENT_ROUND } from "@/round";
import { unstable_cache as cache } from "next/cache";
import { getCandidates } from "./get-candidates";

/**
 * Check if user already voted
 * @param id The user's e-mail address. Get from session if none is informed
 * @returns True if the user already voted, false otherwise
 */
export async function alreadyVoted(id?: string): Promise<boolean> {
  const user = (await auth())?.user;
  const userId = id || user?.email;
  if (!userId) return true; // not logged in

  return (await voteesCollection.doc(`${userId}:${CURRENT_ROUND}`).get())
    .exists;
}

type VoteFormState =
  | {
      success?: boolean;
      error?: string;
      ids?: string[];
    }
  | undefined;

/**
 * Handles vote form
 * @param _ previous form state
 * @param formData the current submitted form data
 * @returns The new form state, that can contain success and a list of vote ids or an error
 */
export async function vote(_: VoteFormState, formData: FormData) {
  const userId = (await auth())?.user?.email;
  if (!userId) return { error: "User is not authorized" };

  // Check if the election period already finished
  if (END_OF_ELECTION < new Date()) return { error: "Election ended" };

  // check if user already voted, if the record exists in the votee collection
  // with the id being the user's email
  if (await alreadyVoted()) return { error: "User already voted" };

  // only accept three votes
  const userVotes = formData.getAll("vote[]");
  if (userVotes.length !== 3) return { error: "Invalid amount of votes" };

  // register that the user voted in the votees collection
  const batch = fs.batch();
  batch.set(voteesCollection.doc(`${userId}:${CURRENT_ROUND}`), {
    data: Date.now(),
  });

  // and the votes in the votes collection
  const ids: string[] = [];
  userVotes.forEach((id, index) => {
    const ref = votesCollection.doc();
    ids.push(ref.id); // unique id is generated and stored in the database
    batch.set(ref, {
      pos: index + 1,
      candidateId: id as string,
      round: CURRENT_ROUND,
    });
  });

  try {
    // save vote
    await batch.commit();
    // return success and the list of ids to present to the user
    return { success: true, ids };
  } catch (e) {
    console.error("Error saving vote...", e);
    return { error: "Error saving vote..." };
  }
}

/**
 * Get the list of votes for the current round
 */
async function getAllVotes(round: string) {
  return (await votesCollection.get()).docs
    .map((d) => ({
      id: d.id,
      ...d.data(),
    }))
    .filter((v) => v.round === round);
}

// Cached version of getAllVotes
export const getVotes = cache(getAllVotes, ["votes"]);

/**
 * Get the final results for the current round
 */
export async function getResults(round: string) {
  const candidates = await getCandidates();
  return Object.entries(
    (await getVotes(round))
      .filter((v) => v.round === round)
      .reduce(
        (
          prev: { [key: string]: Omit<VoteSummary, "candidate"> },
          { candidateId: id, pos }
        ) => ({
          ...prev,
          [id]: {
            votes: (prev[id]?.votes || 0) + 1,
            pos: (prev[id]?.pos || 0) + pos,
          },
        }),
        {}
      )
  ).map(([id, c]) => ({
    candidate: candidates.find((c) => c.id === id) as Candidate,
    ...c,
  }));
}
