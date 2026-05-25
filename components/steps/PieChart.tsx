import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ToolInput } from "../../types/audit";
import { getToolColor } from "../../utils/colors";

interface Props {
  tools: ToolInput[];
}

export default function PieChartStep({ tools }: Props) {
  const activeTools = tools.filter(t => t.monthlySpend > 0).sort((a, b) => b.monthlySpend - a.monthlySpend);
  const totalSpend = activeTools.reduce((sum, t) => sum + t.monthlySpend, 0);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-5xl font-black leading-none tracking-tighter text-black">Budget Split</h2>
        <p className="text-gray-400 mt-4 text-sm font-bold uppercase tracking-widest">Total Monthly: <span className="font-mono text-gray-900">${totalSpend}</span></p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="w-75 h-75 relative"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activeTools}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={140}
                paddingAngle={2}
                dataKey="monthlySpend"
                stroke="none"
                isAnimationActive={true}
                animationDuration={1500}
                animationBegin={300}
              >
                {activeTools.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getToolColor(entry.tool)} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value ?? 0}`, "Monthly Spend"]}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#000' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col gap-4"
        >
          {activeTools.map((tool, idx) => {
            const pct = Math.round((tool.monthlySpend / totalSpend) * 100);
            return (
              <motion.div
                key={tool.tool}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + idx * 0.1 }}
                className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-xl min-w-62.5"
              >
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: getToolColor(tool.tool) }}
                />
                <div className="flex-1 font-bold capitalize text-sm text-gray-800">
                  {tool.tool}
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono font-bold text-sm text-black">${tool.monthlySpend}</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">{pct}%</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
