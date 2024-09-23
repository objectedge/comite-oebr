export {};

declare global {
  type Candidate = {
    name: string;
    id: string;
    photo: string;
  };

  type VoteSummary = { candidate: Candidate; votes: number; pos: number };

  type Vote = { pos: number; candidateId: string; round: string };
}
