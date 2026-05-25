import { motion } from "motion/react";
import CountUp from "react-countup";

interface Props {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
}

export default function SavingsStep({ totalMonthlySavings, totalAnnualSavings }: Props) {
  if (totalMonthlySavings === 0) {
    return (
      <div className="flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="text-8xl"
        >
          👍
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase"
        >
          You&apos;re spending well
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-gray-500 font-medium italic"
        >
          Your AI tool allocation is highly optimized.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-8xl md:text-[160px] font-mono font-black tracking-tighter text-[#10B981] leading-none">
          $<CountUp end={totalMonthlySavings} duration={2.5} separator="," />
          <span className="text-4xl md:text-6xl text-green-400 font-black align-top ml-2">/MO</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-8 space-y-4 px-12 py-6 bg-green-50/50 rounded-2xl border border-green-100/50"
      >
        <h2 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
          Total Annual Savings
        </h2>
        <p className="text-4xl font-mono font-bold tracking-tighter text-[#10B981]">
          ${totalAnnualSavings.toLocaleString()}
        </p>
      </motion.div>
    </div>
  );
}
