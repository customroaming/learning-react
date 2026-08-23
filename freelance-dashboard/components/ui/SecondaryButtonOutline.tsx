type SecondaryButtonOutlineProps = {
  ctaText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  active?: boolean;
  styles?: string;
};
export default function SecondaryButtonOutline({
  ctaText,
  onClick,
  isDisabled,
  active,
  styles,
}: SecondaryButtonOutlineProps) {
  return (
    <button
      onClick={onClick}
      className={`text-realSecondary ${active ? "border-realPrimary" : "border-outline"} ${active ? "bg-realPrimary" : ""} ${active ? "text-onPrimary" : ""} text-xl transition-all leading-normal ${styles} border hover:border-realPrimary/20 hover:bg-realPrimary/80  py-3 px-8 rounded-full font-manrope capitalize ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} `}
      disabled={isDisabled}
    >
      {ctaText}
    </button>
  );
}
