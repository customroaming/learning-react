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
      className={`text-realSecondary ${active ? "border-realPrimary" : "border-outline"} ${active ? "bg-realPrimary" : ""} ${active ? "text-onPrimary" : ""} text-xl transition-all cursor-pointer leading-normal ${styles} border hover:border-realPrimary/20 hover:bg-realPrimary/80 bg-surfaceContainer py-2 px-8 rounded-full font-manrope capitalize`}
      disabled={isDisabled}
    >
      {ctaText}
    </button>
  );
}
