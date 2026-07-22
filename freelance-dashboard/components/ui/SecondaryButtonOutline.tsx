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
      className={`text-realSecondary ${active ? "bg-primary" : ""} ${active ? "text-onPrimary" : ""} text-xl transition-all cursor-pointer leading-4 w-fit pb-3 border border-realSecondary hover:bg-primary hover:text-onPrimary pt-2 px-6 rounded-full`}
      disabled={isDisabled}
    >
      {ctaText}
    </button>
  );
}
