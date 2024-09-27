import { alreadyVoted } from "@/actions/votes";
import END_OF_ELECTION from "@/end-of-election";
import CandidateVoteForm from "./CandidateVoteForm";
import RoundResults from "./RoundResults";
import canVote from "@/can-vote";

type CandidateFormControlProps = {
  candidates: Candidate[];
};

export default async function CandidateFormControl({
  candidates,
}: CandidateFormControlProps) {
  return !(await canVote()) ? (
    <div className="text-center">
      <p className="text-xl my-5">Você não pode votar nesta eleição.</p>
      <p>
        Caso não entenda o motivo, entre em contato via e-mail
        <br />
        gustavo.farias@objectedge.com
      </p>
    </div>
  ) : END_OF_ELECTION < new Date() ? (
    <RoundResults round={process.env.ROUND || "1"} />
  ) : (await alreadyVoted()) ? (
    <div className="text-center">
      <p className="text-xl my-5">Você já votou.</p>
      <p>
        Aguarde o final do período de votação, que encerra em{" "}
        <b>{Intl.DateTimeFormat("pt-BR").format(END_OF_ELECTION)}</b>
      </p>
    </div>
  ) : (
    <CandidateVoteForm candidates={candidates} />
  );
}
