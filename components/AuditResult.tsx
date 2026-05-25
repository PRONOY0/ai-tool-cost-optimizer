import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AuditResponse } from "../types/audit";
import RecommendationStep from "@/components/steps/RecommendationStep";
import BarChartStep from "@/components/steps/BarChart";
import PieChartStep from "@/components/steps/PieChart";
import SavingsStep from "@/components/steps/SavingStep";
import SummaryStep from "@/components/steps/Summary";
import FinalReportStep from "./steps/FinalReportStep";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function AuditResults() {
    const { shareId } = useParams();
    const [data, setData] = useState<AuditResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/audit/${shareId}`);
                if (!response.ok) throw new Error("Failed to fetch audit data");
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [shareId]);

    useEffect(() => {
        if (!data) return;
        const numRecommendations = data.audit.results.auditResult.recommendation.length;
        const totalSteps = numRecommendations + 5;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "Enter") {
                setCurrentStep((p) => Math.min(p + 1, totalSteps - 1));
            } else if (e.key === "ArrowLeft") {
                setCurrentStep((p) => Math.max(p - 1, 0));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [data]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black text-xl">
                {error || "Audit not found"}
            </div>
        );
    }

    const { audit } = data;
    const numRecommendations = audit.results.auditResult.recommendation.length;
    const totalSteps = numRecommendations + 5;

    const nextStep = () => setCurrentStep((p) => Math.min(p + 1, totalSteps - 1));
    const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

    const recommendations = audit.results.auditResult.recommendation;

    const renderStep = () => {
        if (currentStep < numRecommendations) {
            return <RecommendationStep recommendation={recommendations[currentStep]} />;
        }
        const stepOffset = currentStep - numRecommendations;
        switch (stepOffset) {
            case 0:
                return <BarChartStep tools={audit.tools} />;
            case 1:
                return <PieChartStep tools={audit.tools} />;
            case 2:
                return <SavingsStep totalMonthlySavings={audit.totalMonthlySavings} totalAnnualSavings={audit.totalAnnualSavings} />;
            case 3:
                return <SummaryStep summary={audit.results.summary} warnings={audit.results.auditResult.warnings} />;
            case 4:
                return <FinalReportStep audit={audit} />;
            default:
                return null;
        }
    };

    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-white text-black overflow-hidden flex flex-col font-sans relative">
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
                <motion.div
                    className="h-full bg-[#086841]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <main className="flex-1 flex flex-col items-center justify-center relative px-4 w-full max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="w-full"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </main>

            <div className="fixed bottom-0 left-0 right-0 h-20 border-t border-gray-100 bg-white px-12 flex justify-between items-center z-50 pointer-events-none">

                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`pointer-events-auto text-[10px] uppercase font-bold tracking-widest transition-colors ${currentStep === 0 ? "opacity-0" : "text-gray-400 hover:text-black"
                        }`}
                >
                    Back
                </button>

                {currentStep < totalSteps - 1 && (
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden md:flex items-center space-x-3 bg-white">
                        <div className="flex space-x-1">
                            <kbd className="px-1.5 py-1 bg-gray-100 border-b-2 border-gray-300 rounded text-[9px] font-bold text-gray-600">←</kbd>
                            <kbd className="px-1.5 py-1 bg-gray-100 border-b-2 border-gray-300 rounded text-[9px] font-bold text-gray-600">→</kbd>
                        </div>
                        <span>Navigate Slides</span>
                    </div>
                )}

                <button
                    onClick={nextStep}
                    disabled={currentStep === totalSteps - 1}
                    className={`pointer-events-auto px-6 py-2 bg-[#171717] text-white font-bold rounded-lg text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors ${currentStep === totalSteps - 1 ? "opacity-0" : ""
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
