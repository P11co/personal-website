"use client"

import { useState, useEffect } from "react"

// To change email: run `btoa('your@email.com')` in browser console, paste result below
const ENCODED_EMAIL = "ZXhhbXBsZUBlbWFpbC5jb20=" // example@email.com

export function ContactContent() {
  const [emailState, setEmailState] = useState<"hidden" | "decrypting" | "revealed">("hidden")
  const [decryptText, setDecryptText] = useState("████████████████")

  const decryptEmail = () => {
    if (emailState !== "hidden") return

    setEmailState("decrypting")

    // Fake decryption animation
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._"
    const actualEmail = atob(ENCODED_EMAIL)
    let iterations = 0
    const maxIterations = 10

    const interval = setInterval(() => {
      iterations++

      if (iterations >= maxIterations) {
        clearInterval(interval)
        setDecryptText(actualEmail)
        setEmailState("revealed")
        return
      }

      // Progressively reveal the actual email
      const revealedCount = Math.floor((iterations / maxIterations) * actualEmail.length)
      let result = ""
      for (let i = 0; i < actualEmail.length; i++) {
        if (i < revealedCount) {
          result += actualEmail[i]
        } else {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      setDecryptText(result)
    }, 80)
  }

  return (
    <div className="space-y-6">
      <div className="text-amber-500 text-sm mb-4">
        <p>&gt; cat ~/contact/README.md</p>
      </div>

      <div className="bg-black border-2 border-amber-500 p-6 space-y-4">
        <p className="text-amber-400 font-mono">## Connect with me</p>

        <div className="space-y-3 text-sm font-mono">
          {/* Email with decryption */}
          <div className="text-amber-500">
            <span className="text-amber-600">EM@1L: </span>
            {emailState === "hidden" ? (
              <button
                onClick={decryptEmail}
                className="text-amber-700 hover:text-amber-500 transition-colors cursor-pointer animate-pulse"
              >
                [click to decrypt]
              </button>
            ) : emailState === "decrypting" ? (
              <span className="text-green-500">{decryptText}</span>
            ) : (
              <a
                href={`mailto:${atob(ENCODED_EMAIL)}`}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                {decryptText}
              </a>
            )}
          </div>

          {/* GitHub */}
          <p className="text-amber-500">
            <span className="text-amber-600">G1THUB: </span>
            <a
              href="https://github.com/P11co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              github.com/P11co
            </a>
          </p>
        </div>

        <div className="pt-4 border-t border-amber-700">
          <p className="text-amber-600 text-xs">
            &gt; Response time: within 24 hours
          </p>
        </div>
      </div>

      {/* ASCII Art */}
      <div className="mt-8 flex flex-col items-center">
        <img
          src="/pkthunder-ascii-art.png"
          alt="PK Thunder ASCII Art"
          className="w-3/4 h-auto"
        />
        <p className="text-amber-600 text-sm font-mono mt-2">Ness' PK Thunder is my favorite move in Smash Bros</p>
      </div>
    </div>
  )
}
