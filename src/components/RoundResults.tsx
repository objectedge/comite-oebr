import { getResults } from "@/actions/votes";
import VoteList from "@/components/VoteList";
import Image from "next/image";

type RoundResultsProps = {
  round: string;
};

export default async function RoundResults({ round }: RoundResultsProps) {
  const results = (await getResults(round)).sort((a, b) => b.votes - a.votes);

  return (
    <div className="text-center flex flex-col items-center gap-4">
      <p className="text-3xl">Eleições Encerradas</p>
      <p>Resultados</p>
      <table className="border-collapse border border-slate-500 table-auto w-[500px] mb-5">
        <thead>
          <tr>
            <th>Votos</th>
            <th>Pos</th>
            <th>Candidato</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({ candidate, votes }, idx) => (
            <tr key={candidate.id}>
              <td>{votes}</td>
              <td>#{idx + 1}</td>
              <td className="flex flex-row items-center gap-4 px-4">
                <Image
                  width={50}
                  height={50}
                  src={candidate.photo}
                  alt="candidate"
                  className="rounded-full"
                />
                {candidate.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <VoteList round={round} />
    </div>
  );
}
