import { getVotes } from "@/actions/votes";

type VoteListProps = {
  round: string;
};

export default async function VoteList({ round }: VoteListProps) {
  const votes = await getVotes(round);

  return (
    <div className="text-center flex flex-col items-center gap-4">
      <p className="border-2 border-orange-200 bg-orange-100 p-5 text-orange-700">
        Ao votar você recebeu três identificadores, um para cada candidato
        <br />
        indicado. Abaixo você pode ver a lista de todos os votos, com o seu
        <br />
        identificador, candidato indicado e posição indicada para o candidato
      </p>
      <div>
        {votes.map((vote) => (
          <p key={vote.id}>
            {vote.id} - {vote.candidateId} - {vote.pos}
          </p>
        ))}
      </div>
    </div>
  );
}
