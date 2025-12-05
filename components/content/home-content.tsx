"use client"

import { useState, useEffect } from "react"

export function HomeContent() {
  const [asciiArt, setAsciiArt] = useState<string>("")

  useEffect(() => {
    fetch("/pfp.txt")
      .then((res) => res.text())
      .then((text) => setAsciiArt(text))
      .catch(() => setAsciiArt(""))
  }, [])

  return (
    <div className="space-y-8">
      <div className="bg-black border-2 border-amber-500 p-6">
        <h2 className="font-mono text-xl font-bold text-amber-500 mb-4">&gt; whoami</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* ASCII Art Profile */}
          {asciiArt && (
            <div className="overflow-x-auto">
              <pre className="text-amber-500 text-[4px] md:text-[5px] leading-[1.1] font-mono">
                {asciiArt}
              </pre>
            </div>
          )}

          {/* Info */}
          <div className="text-amber-400 text-sm leading-relaxed space-y-2">
            <p>&gt; Hi, you've made it! I am Peter Park.</p>
            <p>&gt; Welcome to my portal. The idea is to give a general introduction about myself.</p>
            <p>&gt; Feel free to use the terminal to explore parts of this site.</p>
            <p>&gt; Start by typing "ls" and then the 'Enter' key.</p>
          </div>
        </div>
      </div>

      <div className="text-amber-500 text-sm">
        <p className="mb-2">&gt; Available directories:</p>
        <ul className="space-y-1 ml-4">
          <li><span className="text-amber-600">blog/</span> - Memory dumps and stack traces</li>
          <li><span className="text-amber-600">portfolio/</span> - Compiled projects</li>
          <li><span className="text-amber-600">timeline/</span> - Git log of life events</li>
          <li><span className="text-amber-600">contact/</span> - Open a socket connection</li>
        </ul>
        <p className="mt-4 text-amber-600">Type `cd [directory]` to navigate</p>
      </div>
    </div>
  )
}
