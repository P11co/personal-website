"use client"

import { useState, useEffect } from "react"
import { BASE_PATH } from "@/lib/constants"

interface Quote {
  text: string
  author: string
}

interface QuoteOfTheDayProps {
  startAnimation?: boolean
  onComplete?: () => void
}

export function QuoteOfTheDay({ startAnimation = false, onComplete }: QuoteOfTheDayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isFlickering, setIsFlickering] = useState(false)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [error, setError] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  // Fetch quotes on mount
  useEffect(() => {
    fetch(`${BASE_PATH}/quotes.json`)
      .then((res) => res.json())
      .then((quotes: Quote[]) => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        setQuote(randomQuote)
        setHasFetched(true)
      })
      .catch(() => {
        setError(true)
      })
  }, [])

  // Start animation only when startAnimation becomes true and quote is loaded
  useEffect(() => {
    if (startAnimation && hasFetched && quote && !isFlickering && !isVisible) {
      setTimeout(() => {
        setIsFlickering(true)

        setTimeout(() => {
          setIsFlickering(false)
          setIsVisible(true)
          if (onComplete) {
            onComplete()
          }
        }, 500)
      }, 200)
    }
  }, [startAnimation, hasFetched, quote, isFlickering, isVisible, onComplete])

  if (error) {
    return (
      <div className="h-16 flex items-center justify-center">
        <span className="text-amber-600 text-sm">&gt; Error loading quotes</span>
      </div>
    )
  }

  return (
    <div className="h-16 flex items-center justify-center">
      {!startAnimation && (
        <span className="text-amber-700 text-sm opacity-0">.</span>
      )}

      {startAnimation && !isVisible && !isFlickering && (
        <span className="text-amber-700 text-sm animate-pulse">&gt; Loading quote...</span>
      )}

      {isFlickering && (
        <div className="text-amber-500 text-sm text-flicker">
          <span className="inline-block">&gt; ████████████████████</span>
        </div>
      )}

      {isVisible && quote && (
        <div className="text-center text-flicker">
          <p className="text-amber-400 text-sm md:text-base italic">
            &quot;{quote.text}&quot;
          </p>
          <p className="text-amber-600 text-xs mt-1">— {quote.author}</p>
        </div>
      )}
    </div>
  )
}
