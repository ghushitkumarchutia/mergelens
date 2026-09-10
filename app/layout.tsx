import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://mergelens-zeta.vercel.app",
  ),
  title: {
    default: "MergeLens — RAG-Native AI Pull Request Reviewer",
    template: "%s · MergeLens",
  },
  description:
    "MergeLens embeds your entire codebase into Pinecone and retrieves the exact functions and files a diff touches. AI code reviews with full architectural context, not just eleven changed lines.",
  keywords: [
    "AI code review",
    "pull request reviewer",
    "automated PR review",
    "GitHub code review bot",
    "AI pull request feedback",
    "codebase-aware code review",
    "RAG code review",
    "developer tools",
    "code review automation",
    "GitHub App code reviewer",
  ],
  authors: [{ name: "MergeLens" }],
  creator: "MergeLens",
  publisher: "MergeLens",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/icons/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/logo.svg", type: "image/svg+xml" }],
    shortcut: "/icons/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MergeLens",
    title: "MergeLens — RAG-Native AI Pull Request Reviewer",
    description:
      "Every pull request, reviewed with full context. MergeLens embeds your codebase to review against your architecture, not just isolated changed lines.",
    images: [
      {
        url: "/icons/logo.svg",
        alt: "MergeLens",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MergeLens — RAG-Native AI Pull Request Reviewer",
    description:
      "Every pull request, reviewed with full architectural context. Installs as a GitHub App.",
    images: ["/icons/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MergeLens",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://mergelens-zeta.vercel.app",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "RAG-Native AI pull request reviewer that embeds your codebase to provide architecture-aware code reviews on GitHub pull requests.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free tier — 5 AI reviews per month",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full antialiased' suppressHydrationWarning>
      <body className='min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-ml-accent selection:text-white'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <QueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
