import Image from "next/image";

type CandidateVoteProps = {
  candidate: Candidate;
  idx: number;
};

export default function CandidateVote({ candidate, idx }: CandidateVoteProps) {
  const { name, photo } = candidate;
  return (
    <div className="flex items-center gap-4">
      <Image
        src={photo}
        alt={name}
        width={50}
        height={50}
        className="rounded-full shadow-black shadow"
      />
      <span>
        {idx} - {name}
      </span>
    </div>
  );
}
