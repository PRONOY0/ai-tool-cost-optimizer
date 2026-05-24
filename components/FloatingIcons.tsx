import Image from "next/image"
import { TbBrandGithubCopilot } from "react-icons/tb"
import { BsOpenai, BsAnthropic, BsClaude } from "react-icons/bs"
import { RiGeminiFill } from "react-icons/ri"
import { SiWindsurf } from "react-icons/si"

interface FloatingTool {
    Icon: React.ComponentType<{ size?: number; color?: string }> | null
    label?: string
    color: string
    top: string
    src?: string;
    left?: string
    right?: string
    rotate: string
    delay: string
}
const floatingTools: FloatingTool[] = [
    { Icon: BsClaude, color: "#D97706", top: "15%", left: "5%", rotate: "-12deg", delay: "0s" },
    { Icon: BsOpenai, color: "#000000", top: "55%", left: "3%", rotate: "8deg", delay: "0.5s" },
    { Icon: SiWindsurf, color: "#0EA5E9", top: "30%", left: "10%", rotate: "-6deg", delay: "1s" },
    { Icon: null, label: "C", src: "/cursor.svg", color: "#000000", top: "70%", left: "8%", rotate: "5deg", delay: "1.5s" },
    { Icon: BsAnthropic, color: "#D97706", top: "15%", right: "5%", rotate: "10deg", delay: "0.3s" },
    { Icon: TbBrandGithubCopilot, color: "#6D28D9", top: "55%", right: "3%", rotate: "-8deg", delay: "0.8s" },
    { Icon: RiGeminiFill, color: "#2563EB", top: "30%", right: "10%", rotate: "6deg", delay: "1.2s" },
]

export default function FloatingIcons() {
    return (
        <div className="absolute inset-0 top-0 pointer-events-none">
            {floatingTools.map((tool, i) => {
                const IconComponent = tool.Icon
                return (
                    <div
                        key={i}
                        className="absolute w-24 h-24 rounded-2xl bg-white shadow-md items-center justify-center floating-icon hidden lg:flex pointer-events-none"
                        style={{
                            top: tool.top,
                            left: tool.left,
                            right: tool.right,
                            rotate: tool.rotate,
                            animationDelay: tool.delay,
                        }}
                    >
                        {IconComponent
                            ? <IconComponent size={44} color={tool.color} />
                            : tool.src
                                ? <Image src={tool.src} alt="cursor" width={44} height={28} />
                                : <span style={{ color: tool.color, fontWeight: 800, fontSize: 20 }}>{tool.label}</span>
                        }
                    </div>
                )
            })}
        </div>
    )
}