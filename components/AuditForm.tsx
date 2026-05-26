"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PRICING } from "@/lib/pricing"
import { useCase } from "@prisma/client"
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field"
import { Input } from "./ui/input"
import axios from "axios"

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
    const [selectedUseCase, setSelectedUseCase] = useState<useCase>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("auditUseCase") as useCase || useCase.coding
        }
        return useCase.coding
    })

    const [tools, setTools] = useState<ToolRow[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("auditTools")
            return saved ? JSON.parse(saved) : [defaultTool()]
        }
        return [defaultTool()]
    })
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
            const teamSize = Math.max(...tools.map(t => t.seats ?? 1))
            const res = await axios.post("/api/audit", {
                tools,
                teamSize,
                useCase: selectedUseCase,
            })
            if (res.data.share_id) {
                router.push(`/audit/${res.data.share_id}`)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        localStorage.setItem("auditTools", JSON.stringify(tools))
    }, [tools])

    useEffect(() => {
        localStorage.setItem("auditUseCase", selectedUseCase)
    }, [selectedUseCase])

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <FieldSet>
                <FieldGroup>
                    <Field>
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
                </FieldGroup>

                <FieldGroup>
                    <FieldLabel>Your AI Tools</FieldLabel>
                    {tools.map((tool, i) => (
                        <div key={i} className="flex gap-2 items-end flex-wrap">
                            <Field className="flex-1 min-w-30">
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

                            <Field className="flex-1 min-w-25">
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

                            <Field className="w-24">
                                <FieldLabel>$/month</FieldLabel>
                                <Input
                                    type="number"
                                    min={0}
                                    value={tool.monthlySpend}
                                    onChange={e => updateTool(i, "monthlySpend", Number(e.target.value))}
                                    placeholder="0"
                                />
                            </Field>

                            <Field className="w-20">
                                <FieldLabel>Seats</FieldLabel>
                                <Input
                                    type="number"
                                    min={1}
                                    value={tool.seats}
                                    onChange={e => updateTool(i, "seats", Number(e.target.value))}
                                    placeholder="1"
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

            <div className="flex justify-between items-center mt-6">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-400 hover:text-gray-600 transition"
                    >
                        Cancel
                    </button>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="ml-auto bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition disabled:opacity-50"
                >
                    {loading ? "Analyzing..." : "Analyze My Spend →"}
                </button>
            </div>
        </div>
    )
}