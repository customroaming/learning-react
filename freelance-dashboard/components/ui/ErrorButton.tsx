type ErrorButtonProps = {
  ctaText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
};
export default function ErrorButton({
  ctaText,
  onClick,
  isDisabled,
}: ErrorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-error text-onError text-xl transition-all cursor-pointer leading-4 w-fit pb-3 hover:bg-error/75 hover:text-onError pt-2 px-6 rounded-full"
      disabled={isDisabled}
    >
      {ctaText}
    </button>
  );
}
