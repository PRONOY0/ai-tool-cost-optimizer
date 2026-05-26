export async function generateMetadata({ params }: { params: { shareId: string } }) {
  return {
    title: "AI Spend Audit Results | Credex",
    description: "See how much your team could save on AI tools",
    openGraph: {
      title: "AI Spend Audit Results",
      description: "See how much your team could save on AI tools",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/audit/${params.shareId}`,
      siteName: "Credex",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Spend Audit Results",
      description: "See how much your team could save on AI tools",
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}