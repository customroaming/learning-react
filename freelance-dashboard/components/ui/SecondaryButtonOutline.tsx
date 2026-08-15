type SecondaryButtonOutlineProps = {
  ctaText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  active?: boolean;
};
export default function SecondaryButtonOutline({
  ctaText,
  onClick,
  isDisabled,
  active,
}: SecondaryButtonOutlineProps) {
  return (
    <button
      onClick={onClick}
      className={`text-realSecondary ${active ? "border-realPrimary" : "border-outline"} ${active ? "bg-realPrimary" : ""} ${active ? "text-onPrimary" : ""} text-xl transition-all cursor-pointer leading-normal w-fit border hover:border-realPrimary/20 hover:bg-realPrimary/80 py-2 px-8 rounded-full font-manrope capitalize`}
      disabled={isDisabled}
    >
      {ctaText}
    </button>
  );
}
