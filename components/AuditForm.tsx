"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PRICING } from "@/lib/pricing"
import { useCase } from "@prisma/client"
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field"
import { Input } from "./ui/input"
import axios from "axios";

const TOOL_PLANS: Record<string, string[]> = {
    chatgpt: Object.keys(PRICING.chatgpt).filter(k => k !== "enterprise"),
    claude: Object.keys(PRICING.claude).filter(k => k !== "enterprise"),
    cursor: Object.keys(PRICING.cursor).filter(k => k !== "enterprise"),
    copilot: Object.keys(PRICING.copilot).filter(k => k !== "enterprise"),
    windsurf: Object.keys(PRICING.windsurf).filter(k => k !== "enterprise"),
    gemini: Object.keys(PRICING.gemini).filter(k => k !== "enterprise"),
}

const TOOLS = Object.keys(TOOL_PLANS)
const USE_CASES = Object.values(useCase)

interface ToolRow {
    tool: string
    plan: string
    seats: number
    monthlySpend: number
}

const defaultTool = (): ToolRow => ({
    tool: "chatgpt",
    plan: "plus",
    seats: 1,
    monthlySpend: 0,
})

export default function AuditForm({ onClose }: { onClose?: () => void }) {
    const router = useRouter()
    const [teamSize, setTeamSize] = useState(1)
    const [selectedUseCase, setSelectedUseCase] = useState<useCase>(useCase.coding)
    const [tools, setTools] = useState<ToolRow[]>([defaultTool()])
    const [loading, setLoading] = useState(false)

    function updateTool(index: number, field: keyof ToolRow, value: string | number) {
        setTools(prev => {
            const updated = [...prev]
            if (field === "tool") {
                updated[index] = {
                    ...updated[index],
                    tool: value as string,
                    plan: TOOL_PLANS[value as string][0],
                }
            } else {
                updated[index] = { ...updated[index], [field]: value }
            }
            return updated
        })
    }

    function addTool() {
        setTools(prev => [...prev, defaultTool()])
    }

    function removeTool(index: number) {
        setTools(prev => prev.filter((_, i) => i !== index))
    }

    async function handleSubmit() {
        setLoading(true)
        try {
            const res = await axios.post("/api/audit", {
                tools,
                teamSize,
                useCase: selectedUseCase
            })
            if (res.data.share_id) {
                router.push(`/api/audit/${res.data.share_id}`)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-4xl max-w-full mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <FieldSet>
                <FieldGroup>
                    <div className="flex gap-4">
                        <Field className="flex-1">
                            <FieldLabel htmlFor="teamSize">Team Size</FieldLabel>
                            <Input
                                id="teamSize"
                                type="number"
                                min={1}
                                value={teamSize}
                                onChange={e => setTeamSize(Number(e.target.value))}
                                placeholder="e.g. 5"
                            />
                        </Field>

                        <Field className="flex-1">
                            <FieldLabel htmlFor="useCase">Primary Use Case</FieldLabel>
                            <select
                                id="useCase"
                                className="w-full border rounded-md px-3 py-2 text-sm mt-1"
                                value={selectedUseCase}
                                onChange={e => setSelectedUseCase(e.target.value as useCase)}
                            >
                                {USE_CASES.map(uc => (
                                    <option key={uc} value={uc}>{uc.replace("_", " ")}</option>
                                ))}
                            </select>
                        </Field>
                    </div>
                </FieldGroup>

                <FieldGroup>
                    <FieldLabel>Your AI Tools</FieldLabel>
                    {tools.map((tool, i) => (
                        <div key={i} className="flex gap-2 items-end">
                            <Field className="flex-1">
                                <FieldLabel>Tool</FieldLabel>
                                <select
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    value={tool.tool}
                                    onChange={e => updateTool(i, "tool", e.target.value)}
                                >
                                    {TOOLS.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </Field>

                            <Field className="flex-1">
                                <FieldLabel>Plan</FieldLabel>
                                <select
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    value={tool.plan}
                                    onChange={e => updateTool(i, "plan", e.target.value)}
                                >
                                    {TOOL_PLANS[tool.tool].map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </Field>

                            <Field className="w-28">
                                <FieldLabel>$/month</FieldLabel>
                                <Input
                                    type="number"
                                    min={0}
                                    value={tool.monthlySpend}
                                    onChange={e => updateTool(i, "monthlySpend", Number(e.target.value))}
                                    placeholder="0"
                                />
                            </Field>

                            {tools.length > 1 && (
                                <button
                                    onClick={() => removeTool(i)}
                                    className="text-red-400 pb-2 text-lg font-bold"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={addTool}
                        className="text-sm text-green-600 font-medium text-left mt-1"
                    >
                        + Add another tool
                    </button>
                </FieldGroup>
            </FieldSet>

            <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition disabled:opacity-50"
                >
                    {loading ? "Analyzing..." : "Analyze My Spend →"}
                </button>
            </div>
        </div>
    )
}