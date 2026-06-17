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
      className="bg-realPrimary text-onRealPrimary text-xl transition-all cursor-pointer leading-4 w-fit pb-3 hover:bg-primary hover:text-onPrimary pt-2 px-6 rounded-full mx-auto"
      disabled={isDisabled}
    >
      {ctaText}
    </button>
  );
}
