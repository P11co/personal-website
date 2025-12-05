"use client"

import { useState, useEffect } from "react"
import { Terminal } from "@/components/terminal"
import { QuoteOfTheDay } from "@/components/quote-of-the-day"
import { HeroIntro } from "@/components/hero-intro"
import {
  HomeContent,
  BlogContent,
  PortfolioContent,
  TimelineContent,
  ContactContent,
} from "@/components/content"

export default function HomePage() {
  const [currentPath, setCurrentPath] = useState("~")
  const [heroComplete, setHeroComplete] = useState(false)
  const [quoteComplete, setQuoteComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isShuttingDown, setIsShuttingDown] = useState(false)
  const [isShutdown, setIsShutdown] = useState(false)

  // Handle shutdown sequence
  const handleShutdown = () => {
    setIsShuttingDown(true)
    setTimeout(() => {
      setIsShutdown(true)
    }, 1000)
  }

  // Show content after terminal appears
  useEffect(() => {
    if (quoteComplete) {
      const timeout = setTimeout(() => {
        setShowContent(true)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [quoteComplete])

  // Render content based on current path
  const renderContent = () => {
    if (currentPath === "~") {
      return <HomeContent />
    }
    if (currentPath === "~/blog") {
      return <BlogContent onNavigate={setCurrentPath} />
    }
    if (currentPath.startsWith("~/blog/")) {
      const postId = currentPath.replace("~/blog/", "")
      return <BlogContent postId={postId} onNavigate={setCurrentPath} />
    }
    if (currentPath === "~/portfolio") {
      return <PortfolioContent />
    }
    if (currentPath === "~/timeline") {
      return <TimelineContent />
    }
    if (currentPath === "~/contact") {
      return <ContactContent />
    }
    return <HomeContent />
  }

  // Shutdown screen
  if (isShutdown) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center font-mono">
          <p className="text-amber-500 text-2xl mb-4">Connection terminated.</p>
          <p className="text-amber-700 text-sm">Thank you for visiting.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-black text-amber-500 crt crt-flicker ${isShuttingDown ? 'crt-off' : ''}`}>
      <header className="border-b-2 border-amber-500 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="font-mono">
            <div className="mb-6">
              <HeroIntro onComplete={() => setHeroComplete(true)} />
            </div>
            <div className="text-center">
              <QuoteOfTheDay startAnimation={heroComplete} onComplete={() => setQuoteComplete(true)} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 font-mono">
        {/* Terminal */}
        <section className={`mb-8 transition-opacity duration-500 ${quoteComplete ? 'opacity-100' : 'opacity-0'}`}>
          {quoteComplete && <Terminal currentPath={currentPath} onPathChange={setCurrentPath} onShutdown={handleShutdown} />}
        </section>

        {/* Content Area */}
        <section className={`min-h-[400px] transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {showContent && renderContent()}
        </section>
      </main>

      <footer className="border-t-2 border-amber-500 bg-black mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <p className="font-mono text-amber-600 text-sm">
            &gt; Adapted from the Terminal Blog v1.0 Template @ {" "}
            <a
              href="https://nctnetwork.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 underline transition-colors"
            >
              NCTNetwork
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
