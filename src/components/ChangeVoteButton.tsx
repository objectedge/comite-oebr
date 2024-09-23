import { useFormStatus } from "react-dom";

type ChangeVoteButtonProps = {
  onClick: () => void;
};

export default function ChangeVoteButton({ onClick }: ChangeVoteButtonProps) {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Alterar Voto
    </button>
  );
}
