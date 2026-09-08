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
    process.env.NEXT_PUBLIC_APP_URL || "https://mergelens.com",
  ),
  title: {
    default: "MergeLens — RAG-Native AI Pull Request Reviewer",
    template: "%s · MergeLens",
  },
  description:
    "MergeLens embeds your entire codebase into Pinecone and retrieves the exact functions and files a diff touches. AI code reviews with full architectural context, not just eleven changed lines.",
  keywords: [
    "AI code review",
    "pull request review",
    "RAG code review",
    "GitHub PR review bot",
    "retrieval augmented generation",
    "automated code reviews",
    "developer tools",
    "Pinecone code search",
    "Inngest workflows",
    "Next.js developer tools",
  ],
  authors: [{ name: "MergeLens Team", url: "https://mergelens.com" }],
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
    url: "https://mergelens.com",
    siteName: "MergeLens",
    title: "MergeLens — RAG-Native AI Pull Request Reviewer",
    description:
      "Every pull request, reviewed with full context. MergeLens embeds your codebase to review against your architecture, not just isolated changed lines.",
    images: [
      {
        url: "/icons/logo.svg",
        width: 1200,
        height: 630,
        alt: "MergeLens — AI Code Review Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MergeLens — RAG-Native AI Pull Request Reviewer",
    description:
      "Every pull request, reviewed with full architectural context. Installs as a GitHub App.",
    images: ["/icons/logo.svg"],
    creator: "@mergelens",
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
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cloud",
  description:
    "RAG-Native AI pull request reviewer that embeds your codebase to provide architecture-aware code reviews on GitHub pull requests.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='h-full antialiased'
      suppressHydrationWarning
    >
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
