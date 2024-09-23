import cn from "@/cn";
import Image from "next/image";

type CandidateOptionProps = Candidate & {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function CandidateOption({
  id,
  photo,
  name,
  onChange,
  disabled = false,
}: CandidateOptionProps) {
  return (
    <label className="flex flex-col items-center gap-4" htmlFor={id}>
      <input
        disabled={disabled}
        onChange={onChange}
        id={id}
        name="vote[]"
        value={id}
        type="checkbox"
        className="peer hidden"
      />
      <Image
        src={photo}
        alt={name}
        width={150}
        height={150}
        className={cn(
          "flex items-center justify-center border-8 border-transparent rounded-full overflow-hidden cursor-pointer peer-checked:border-yellow-500 peer-checked:opacity-100 peer-checked:cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
      <span className="text-lg">{name}</span>
    </label>
  );
}
