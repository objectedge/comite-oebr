import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const status = useFormStatus();
  return (
    <button
      form="vote-form"
      type="submit"
      disabled={status.pending}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      Votar
    </button>
  );
}
