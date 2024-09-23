"use client";

import { vote } from "@/actions/votes";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import CandidateOption from "./CandidateOption";
import CandidateVote from "./CandidateVote";
import ChangeVoteButton from "./ChangeVoteButton";
import Drawer from "./Drawer";
import SubmitButton from "./SubmitButton";
import VoteSuccess from "./VoteSuccess";

type CandidateFormControlProps = {
  candidates: Candidate[];
};

export default function CandidateVoteForm({
  candidates,
}: CandidateFormControlProps) {
  const [state, dispatch] = useFormState(vote, undefined);
  const [selected, setSelected] = useState<Candidate[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const select =
    (c: Candidate) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(
        event.target.checked
          ? [...selected, c]
          : selected.filter((sc) => sc !== c)
      );
    };

  useEffect(() => {
    // If three options are selected, show the drawer
    setDrawerOpen(selected.length === 3);
  }, [selected]);

  // Disable for selections after three options are selected
  const isDone = selected.length === 3;

  return state?.success ? (
    <VoteSuccess ids={state.ids} />
  ) : (
    <form
      id="vote-form"
      action={dispatch}
      className="flex flex-col items-center justify-center gap-16"
    >
      <h1 className="mb-5 self-center text-2xl">
        Escolha os seus três indicados
      </h1>
      <input type="submit" id="submit-vote" className="hidden" />
      <div className="flex flex-wrap gap-8 w-4/5 justify-around">
        {candidates.map((c) => (
          <CandidateOption
            key={c.id}
            {...c}
            onChange={select(c)}
            disabled={isDone && !selected.includes(c)}
          />
        ))}
      </div>

      {/* Candidate vote drawer. Appears after three options are selected */}
      <Drawer open={drawerOpen} side="bottom">
        <div className="flex flex-col gap-4 w-[400px] self-center">
          <div className="flex gap-4 flex-col px-5">
            {selected.map((c, i) => (
              <CandidateVote key={c.id} idx={i + 1} candidate={c} />
            ))}
          </div>
          <ChangeVoteButton onClick={() => setDrawerOpen(false)} />
          <SubmitButton />
        </div>
      </Drawer>
    </form>
  );
}
