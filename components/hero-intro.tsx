"use client"

import { useState, useEffect } from "react"

const command = "ps aux | grep peter"

const processes = [
  { pid: "001", process: "developer.exe", status: "RUNNING" },
  { pid: "002", process: "data_scientist.py", status: "RUNNING" },
  { pid: "003", process: "learner.sh", status: "ALWAYS" },
]

interface HeroIntroProps {
  onComplete?: () => void
}

export function HeroIntro({ onComplete }: HeroIntroProps) {
  const [typedCommand, setTypedCommand] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [visibleRows, setVisibleRows] = useState(0)

  // Typing effect for command
  useEffect(() => {
    if (typedCommand.length < command.length) {
      const timeout = setTimeout(() => {
        setTypedCommand(command.slice(0, typedCommand.length + 1))
      }, 50 + Math.random() * 50) // Random delay for realistic typing

      return () => clearTimeout(timeout)
    } else {
      // Command finished typing, show results after a brief pause
      const timeout = setTimeout(() => {
        setShowCursor(false)
        setShowResults(true)
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [typedCommand])

  // Animate rows appearing one by one
  useEffect(() => {
    if (showResults && visibleRows <= processes.length) {
      const timeout = setTimeout(() => {
        setVisibleRows((prev) => prev + 1)
      }, 150)

      return () => clearTimeout(timeout)
    } else if (showResults && visibleRows > processes.length && onComplete) {
      // All rows visible, trigger callback
      onComplete()
    }
  }, [showResults, visibleRows, onComplete])

  return (
    <div className="font-mono text-sm md:text-base">
      {/* Command line */}
      <div className="text-amber-500 mb-4">
        <span className="text-amber-600">$ </span>
        {typedCommand}
        {showCursor && (
          <span className="inline-block w-2 h-4 bg-amber-500 animate-pulse ml-0.5 align-middle" />
        )}
      </div>

      {/* Results table */}
      {showResults && (
        <div className="text-flicker">
          {/* Header */}
          {visibleRows >= 1 && (
            <div className="flex text-amber-600 mb-1">
              <span className="w-12">PID</span>
              <span className="w-48">PROCESS</span>
              <span>STATUS</span>
            </div>
          )}

          {/* Process rows */}
          {processes.map((proc, index) => (
            visibleRows >= index + 2 && (
              <div key={proc.pid} className="flex text-amber-400">
                <span className="w-12 text-amber-600">{proc.pid}</span>
                <span className="w-48">{proc.process}</span>
                <span className={proc.status === "ALWAYS" ? "text-green-500" : "text-amber-500"}>
                  {proc.status}
                </span>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
}
