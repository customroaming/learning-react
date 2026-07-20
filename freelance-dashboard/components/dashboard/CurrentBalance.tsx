import { MonzoBalance } from "@/types";

interface CurrentBalanceProps {
  balance: MonzoBalance;
}

export default function CurrentBalance({ balance }: CurrentBalanceProps) {
  const currentBalance = balance.balance / 100;
  return (
    <div className="flex flex-col gap-2 mb-8">
      <h2 className="text-2xl md:text-3xl">Current Balance:</h2>
      <span className="font-manrope text-2xl">£{currentBalance}</span>
    </div>
  );
}
