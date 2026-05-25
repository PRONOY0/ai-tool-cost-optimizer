import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ToolInput } from "../../types/audit";
import { getToolColor } from "../../utils/colors";

interface Props {
    tools: ToolInput[];
}

export default function BarChartStep({ tools }: Props) {
    // Sort tools by spend desc
    const sortedTools = [...tools].sort((a, b) => b.monthlySpend - a.monthlySpend);

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Spend Breakdown</div>
                <h2 className="text-5xl font-black leading-none tracking-tighter text-black">Monthly Spend</h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full h-100"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sortedTools} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                        <XAxis
                            dataKey="tool"
                            axisLine={true}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }}
                            tickFormatter={(value) => value.substring(0, 3).toUpperCase()}
                            dy={10}
                        />
                        <YAxis
                            hide={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            trigger="hover"
                            shared={false}
                            contentStyle={{
                                borderRadius: '1px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',

                            }}
                            formatter={(value) => [`$${value}`, "Spend"]}
                            labelFormatter={(label) =>
                                typeof label === "string"
                                    ? label.charAt(0).toUpperCase() + label.slice(1)
                                    : String(label)
                            }
                        />
                        <Bar
                            dataKey="monthlySpend"
                            radius={[8, 8, 8, 8]}
                            barSize={80}
                            isAnimationActive={true}
                            animationDuration={1500}
                            animationBegin={200}
                        >
                            {sortedTools.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getToolColor(entry.tool)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}
