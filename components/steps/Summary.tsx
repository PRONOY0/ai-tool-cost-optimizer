import { motion } from "motion/react";
import { AlertCircle, Quote } from "lucide-react";

interface Props {
    summary: string;
    warnings: string[];
}

export default function SummaryStep({ summary, warnings }: Props) {
    return (
        <div className="flex flex-col items-center text-center w-full max-w-3xl mx-auto space-y-16">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                <Quote className="absolute -top-12 -left-8 w-16 h-16 text-gray-100 rotate-180" />
                <blockquote className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-balance text-black">
                    &quot;{summary}&quot;
                </blockquote>
            </motion.div>

            {warnings.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="w-full"
                >
                    <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-6">
                        Optimization Warnings
                    </h3>

                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar justify-start md:justify-center">
                        {warnings.map((warning, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + idx * 0.2 }}
                                className="snap-center shrink-0 w-72 md:w-auto md:max-w-sm bg-amber-50 text-amber-900 px-6 py-5 rounded-2xl flex flex-col gap-3 text-left border border-amber-100 shadow-sm"
                            >
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <p className="font-medium text-amber-800/90 leading-snug">
                                    {warning}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}
