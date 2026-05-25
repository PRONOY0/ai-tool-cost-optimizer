import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ChevronRight, Copy, ArrowRight } from "lucide-react";
import { Audit } from "../../types/audit";
import Link from "next/link";

export default function FinalReportStep({ audit }: { audit: Audit }) {
    const [copied, setCopied] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const { totalAnnualSavings, results } = audit;
    const recommendations = results.auditResult.recommendation;

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const currentTotal = recommendations.reduce((sum, r) => {
        const tool = audit.tools.find(t => t.tool === r.tool);
        return sum + (tool?.monthlySpend || 0);
    }, 0);

    const recommendedTotal = currentTotal - audit.totalMonthlySavings;

    return (
        <div className="w-full max-w-5xl mx-auto py-12 pb-32 flex flex-col items-center">

            {/* Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-16"
            >
                {totalAnnualSavings > 500 ? (
                    <Link
                        href="https://credex.rocks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#086841] hover:bg-[#064c30] text-white p-6 rounded-2xl shadow-sm transition-colors group cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Want to automate these savings?</h3>
                                <p className="text-green-50">Credex automatically provisions and de-provisions AI seats based on usage.</p>
                            </div>
                            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ) : (
                    <div className="w-full bg-gray-50 border border-gray-200 p-6 rounded-2xl text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">You&apos;re spending well 👍</h3>
                        <p className="text-gray-500">Your AI tool allocation is well-optimized.</p>
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
                <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
                    <div className="p-4 font-bold text-gray-400 tracking-widest uppercase text-[10px]">Current Stack</div>
                    <div className="p-4 font-bold text-[#086841]  tracking-widest uppercase text-[10px] border-l border-gray-200">Recommended Stack</div>
                </div>

                {recommendations.map((rec, idx) => (
                    <div key={idx} className="grid grid-cols-2 border-b border-gray-100 last:border-b-0">
                        <div className="p-4 flex flex-col gap-1">
                            <span className="font-bold text-sm text-gray-800 capitalize">{rec.tool}</span>
                            <span className="text-gray-400 text-xs font-mono line-through decoration-gray-300">{rec.currentPlan}</span>
                        </div>

                        <div className="p-4 flex flex-col gap-1 border-l border-gray-100 bg-white">
                            <span className="font-bold text-sm text-gray-800 capitalize">{rec.tool}</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[#086841] font-mono text-xs font-bold">{rec.recommendedPlan}</span>
                                {rec.monthlySavings > 0 && (
                                    <span className="text-[10px] bg-green-50 text-[#0f9a62] px-2 py-1 rounded font-bold border border-green-100 uppercase">
                                        -${rec.monthlySavings}
                                    </span>
                                )}
                                {rec.monthlySavings === 0 && rec.currentPlan !== rec.recommendedPlan && (
                                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold border border-gray-200 uppercase">Changes</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="grid grid-cols-2 bg-gray-50 border-t border-gray-200">
                    <div className="p-6">
                        <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Current Monthly</div>
                        <div className="text-3xl font-mono font-bold text-gray-400 line-through">${currentTotal}</div>
                    </div>
                    <div className="p-6 border-l border-gray-200 bg-white">
                        <div className="text-[10px] uppercase font-bold text-[#086841] tracking-widest mb-1">Optimized Monthly</div>
                        <div className="text-3xl font-mono font-bold text-[#086841]">${recommendedTotal}</div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-16 w-full max-w-2xl text-center space-y-12"
            >
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Get the detailed PDF report</h3>
                    <p className="text-gray-500 mb-6">We&apos;ll email you a full breakdown with action items for your IT team.</p>

                    {!emailSubmitted ? (
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setEmailSubmitted(true);
                            }}
                        >
                            <input
                                type="email"
                                required
                                placeholder="work@company.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Company (optional)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Role (optional)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 px-6 py-3 bg-[#171717] text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors w-full flex items-center justify-center gap-2"
                            >
                                Export PDF <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    ) : (
                        <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-xl border border-green-100">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <p className="font-medium">Report sent! Check your inbox shortly.</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Share this audit</p>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <Copy className={`w-4 h-4 ${copied ? "text-green-500" : "text-gray-400"}`} />
                        <span className={`font-mono text-sm ${copied ? "text-green-600" : "text-gray-600"}`}>
                            {copied ? "Copied to clipboard!" : `credex.rocks/audit/${audit.shareId}`}
                        </span>
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
