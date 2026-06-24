type SecondaryButtonOutlineProps = {
  ctaText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
};
export default function SecondaryButtonOutline({
  ctaText,
  onClick,
  isDisabled,
}: SecondaryButtonOutlineProps) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent text-realSecondary text-xl transition-all cursor-pointer leading-4 w-fit pb-3 border border-realSecondary hover:bg-primary hover:text-onPrimary pt-2 px-6 rounded-full"
      disabled={isDisabled}
    >
      {ctaText}
    </button>
  );
}
