import { cn } from "../../utils/cn";

const styles = {
  Easy: "bg-moss-400 text-white",
  Moderate: "bg-tan-500 text-white",
  Hard: "bg-clay text-white",
};

export default function DifficultyBadge({ difficulty }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[difficulty],
      )}
    >
      {difficulty}
    </span>
  );
}
