"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ChevronRight, Copy, ArrowRight } from "lucide-react";
import { Audit } from "../../types/audit";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

export default function FinalReportStep({ audit }: { audit: Audit }) {
    const params = useParams();

    const fileRef = useRef<HTMLDivElement>(null);

    const shareId = params.shareId || "1234";
    const [copied, setCopied] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [email, setEmail] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("email") || "";
        }

        return "";
    });
    const [company, setCompany] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("company") || "";
        }

        return "";
    });
    const [role, setRole] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("role") || "";
        }

        return "";
    });
    const [teamSize, setTeamSize] = useState(() => {
        if (typeof window !== "undefined") {
            return Number(localStorage.getItem("teamSize")) || 0;
        }

        return 0;
    });

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

    async function downloadPDF() {
        const pdf = new jsPDF("p", "mm", "a4")
        const w = 210 // A4 width in mm
        let y = 20 // current y position

        // Header
        pdf.setFillColor(8, 104, 65)
        pdf.rect(0, 0, w, 16, "F")
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "bold")
        pdf.text("AI SPEND AUDIT REPORT", 14, 10)
        pdf.setFontSize(8)
        pdf.setFont("helvetica", "normal")
        pdf.text(`credex.rocks/audit/${audit.shareId}`, w - 14, 10, { align: "right" })

        y = 28

        // Savings hero
        pdf.setTextColor(8, 104, 65)
        pdf.setFontSize(28)
        pdf.setFont("helvetica", "bold")
        pdf.text(`$${audit.totalMonthlySavings.toLocaleString()}/mo`, w / 2, y, { align: "center" })
        y += 8
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(120, 120, 120)
        pdf.text(`$${audit.totalAnnualSavings.toLocaleString()} saved annually`, w / 2, y, { align: "center" })
        y += 14

        // Divider
        pdf.setDrawColor(230, 230, 230)
        pdf.line(14, y, w - 14, y)
        y += 10

        // Column headers
        pdf.setFontSize(8)
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(150, 150, 150)
        pdf.text("TOOL", 14, y)
        pdf.text("CURRENT PLAN", 70, y)
        pdf.text("RECOMMENDED", 120, y)
        pdf.text("SAVINGS/MO", w - 14, y, { align: "right" })
        y += 6

        pdf.setDrawColor(230, 230, 230)
        pdf.line(14, y, w - 14, y)
        y += 6

        // Rows
        recommendations.forEach((rec) => {
            pdf.setFontSize(10)
            pdf.setFont("helvetica", "bold")
            pdf.setTextColor(30, 30, 30)
            pdf.text(rec.tool.charAt(0).toUpperCase() + rec.tool.slice(1), 14, y)

            pdf.setFont("helvetica", "normal")
            pdf.setTextColor(150, 150, 150)
            pdf.text(rec.currentPlan, 70, y)

            pdf.setTextColor(8, 104, 65)
            pdf.text(rec.recommendedPlan, 120, y)

            if (rec.monthlySavings > 0) {
                pdf.setFont("helvetica", "bold")
                pdf.setTextColor(8, 104, 65)
                pdf.text(`$${rec.monthlySavings}`, w - 14, y, { align: "right" })
            } else {
                pdf.setFont("helvetica", "normal")
                pdf.setTextColor(150, 150, 150)
                pdf.text("Optimal", w - 14, y, { align: "right" })
            }

            y += 4
            // reason text
            pdf.setFontSize(7)
            pdf.setFont("helvetica", "italic")
            pdf.setTextColor(170, 170, 170)
            const lines = pdf.splitTextToSize(rec.reason, w - 28)
            pdf.text(lines, 14, y)
            y += lines.length * 4 + 4

            pdf.setDrawColor(240, 240, 240)
            pdf.line(14, y, w - 14, y)
            y += 6
        })

        // Totals
        y += 4
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(150, 150, 150)
        pdf.text(`Current total: $${currentTotal}/mo`, 14, y)
        pdf.setTextColor(8, 104, 65)
        pdf.text(`Optimized total: $${recommendedTotal}/mo`, w - 14, y, { align: "right" })

        // Footer
        y = 280
        pdf.setFontSize(7)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(180, 180, 180)
        pdf.text("Generated by Credex AI Spend Auditor · credex.rocks", w / 2, y, { align: "center" })

        pdf.save(`audit-${audit.shareId}.pdf`)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/lead', {
                email,
                company,
                role,
                teamSize,
                shareId,
            });

            if (res.data.success) {
                await downloadPDF();
                
                toast.success("PDF downloaded and report sent to your email");
                setEmailSubmitted(true);
                localStorage.removeItem("email");
                localStorage.removeItem("company");
                localStorage.removeItem("role");
                localStorage.removeItem("teamSize");
            }
        } catch (e) {
            toast.error("Something went wrong. Please try again.");
        }
    }

    useEffect(() => {
        localStorage.setItem("email", email);
    }, [email]);

    useEffect(() => {
        localStorage.setItem("company", company);
    }, [company]);

    useEffect(() => {
        localStorage.setItem("role", role);
    }, [role]);

    useEffect(() => {
        localStorage.setItem("teamSize", String(teamSize));
    }, [teamSize]);

    return (
        <div className="w-full max-w-5xl mx-auto py-12 pb-32 flex flex-col items-center">
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">You&apos;re spending well </h3>
                        <p className="text-gray-500">Your AI tool allocation is well-optimized.</p>
                    </div>
                )}
            </motion.div>

            <div ref={fileRef}>
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
            </div>

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
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="work@company.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                            <div className="grid grid-cols-3 gap-4">
                                <input
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    type="text"
                                    placeholder="Company (optional)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                                />
                                <input
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    type="text"
                                    placeholder="Role (optional)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                                />

                                <input
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(Number(e.target.value))}
                                    type="number"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 px-6 py-3 bg-[#171717] text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors w-full flex items-center justify-center gap-2"
                            >
                                Download PDF + Email Report <ArrowRight />
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
