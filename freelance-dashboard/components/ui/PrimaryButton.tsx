type PrimaryButtonProps = {
  ctaText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
};
export default function PrimaryButton({
  ctaText,
  onClick,
  isDisabled,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-realPrimary text-onRealPrimary text-xl transition-all cursor-pointer leading-normal w-fit tracking-tight hover:bg-primary hover:text-onPrimary py-2 px-8 rounded-full font-manrope font-semibold"
      disabled={isDisabled}
    >
      {ctaText}
    </button>
  );
}
