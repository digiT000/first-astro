import React, { useState, useEffect } from "react";

interface CalculationResult {
  total: string;
  interestEarned: string;
}

export default function SavingCalculator() {
  const [initial, setInitial] = useState<number>(1000);
  const [monthly, setMonthly] = useState<number>(100);
  const [rate, setRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [results, setResults] = useState<CalculationResult>({
    total: "0",
    interestEarned: "0",
  });

  const calculateSavings = (): void => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const totalContributions = initial + monthly * n;

    let finalBalance: number;
    if (r === 0) {
      finalBalance = totalContributions;
    } else {
      const principalFV = initial * Math.pow(1 + r, n);
      const contributionsFV = (monthly * (Math.pow(1 + r, n) - 1)) / r;
      finalBalance = principalFV + contributionsFV;
    }

    setResults({
      total: finalBalance.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      interestEarned: (finalBalance - totalContributions).toLocaleString(
        undefined,
        { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      ),
    });
  };

  useEffect(() => {
    calculateSavings();
  }, [initial, monthly, rate, years]);

  const handleNumberChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) => (e: any) => {
      setter(Number(e.target.value));
    };

  return (
    <div className="w-full max-w-5xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-neutral-100 shadow-2xl font-sans flex">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-neutral-400 tracking-tight">
          Savings Growth
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-white">
            ${results.total}
          </span>
          <span className="text-emerald-400 text-sm font-medium">
            +{results.interestEarned} interest
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Input Row 1 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Initial
            </label>
            <input
              type="number"
              value={initial}
              onChange={handleNumberChange(setInitial)}
              className="bg-neutral-800 border-none rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Monthly
            </label>
            <input
              type="number"
              value={monthly}
              onChange={handleNumberChange(setMonthly)}
              className="bg-neutral-800 border-none rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
            />
          </div>
        </div>

        {/* Input Row 2 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              APY (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={handleNumberChange(setRate)}
              className="bg-neutral-800 border-none rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Years
            </label>
            <input
              type="number"
              value={years}
              onChange={handleNumberChange(setYears)}
              className="bg-neutral-800 border-none rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
            />
          </div>
        </div>

        <button className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-900 font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
          Analyze Growth
        </button>
      </div>
    </div>
  );
}
