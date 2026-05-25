import { motion } from "motion/react";
import { Recommendation } from "../../types/audit";
import { getToolColor } from "../../utils/colors";
import { BsOpenai, BsClaude } from "react-icons/bs";
import { SiWindsurf } from "react-icons/si";
import { GoCopilot } from "react-icons/go";
import { RiGeminiFill } from "react-icons/ri";
import Image from "next/image";

interface Props {
  recommendation: Recommendation;
}

export default function RecommendationStep({ recommendation }: Props) {
  const { tool, currentPlan, recommendedPlan, monthlySavings, reason } = recommendation;
  const noChange = monthlySavings === 0 && currentPlan === recommendedPlan;
  const color = getToolColor(tool);

  const iconsArray: Record<string, React.ReactNode> = {
    chatgpt: <BsOpenai />,
    claude: <BsClaude />,
    windsurf: <SiWindsurf />,
    copilot: <GoCopilot />,
    gemini: <RiGeminiFill />,
    cursor: null,
  }

  const toolName = tool.charAt(0).toUpperCase() + tool.slice(1);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-sm"
          style={{ backgroundColor: color }}
        >
          {
            tool === "cursor" ?
              (
                <Image src="/cursor.svg" alt="cursor" width={40} height={40} />
              )
              :
              (
                iconsArray[tool] ?? <span>{tool[0].toUpperCase()}</span>
              )
          }
        </div>
        <h2 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{toolName}</h2>
      </motion.div>

      <div className="relative h-32 flex flex-col items-center justify-center">
        {noChange ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-gray-400 flex items-center gap-3 uppercase"
          >
            Already optimal <span className="text-3xl text-[#086841]">✓</span>
          </motion.div>
        ) : (
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="text-3xl md:text-4xl font-mono font-bold text-gray-400 relative inline-block"
            >
              {currentPlan}
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-black w-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: "circOut" }}
                style={{ marginTop: "-2px" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.8, type: "spring", stiffness: 200, damping: 20 }}
              className="text-4xl md:text-6xl font-black tracking-tighter mt-4"
              style={{ color }}
            >
              {recommendedPlan}
            </motion.div>
          </div>
        )}
      </div>

      {!noChange && monthlySavings > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 }}
          className="text-sm font-mono font-bold text-[#086841] bg-green-50 px-4 py-2 rounded border border-green-100 uppercase mt-4 inline-block"
        >
          Save ${monthlySavings}/month
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: noChange ? 1 : 2.5 }}
        className="text-lg md:text-xl text-gray-500 font-medium italic max-w-2xl text-balance leading-relaxed"
      >
        &quot;{reason}&quot;
      </motion.p>
    </div>
  );
}
