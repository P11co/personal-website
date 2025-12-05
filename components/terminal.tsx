"use client"

import * as React from "react"
import { useState, useRef, useEffect, useCallback } from "react"

interface TerminalLine {
  type: "input" | "output" | "error"
  content: string
}

interface TerminalProps {
  currentPath: string
  onPathChange: (path: string) => void
  onCommand?: (command: string, args: string[]) => string | null
  onShutdown?: () => void
}

export function Terminal({ currentPath, onPathChange, onCommand, onShutdown }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Terminal booted" },
    { type: "output", content: 'Type "help" for available commands.' },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Valid paths for navigation
  const validPaths = ["~", "~/blog", "~/portfolio", "~/timeline", "~/contact"]

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  // Focus input when terminal is clicked
  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const addLine = useCallback((type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { type, content }])
  }, [])

  // Built-in commands
  const executeCommand = useCallback((input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return

    const parts = trimmed.split(" ")
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Add input to display
    addLine("input", `${currentPath} > ${trimmed}`)

    // Add to history
    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    let output: string | null = null

    // Check for custom command handler first
    if (onCommand) {
      output = onCommand(command, args)
    }

    // If no custom handler or it returned null, use built-in commands
    if (output === null) {
      switch (command) {
        case "help":
          output = `Available commands:
  help      - Show this help message
  ls        - List available pages
  cd <dir>  - Navigate to a page
  pwd       - Show current path
  whoami    - About me
  clear     - Clear terminal
  history   - Show command history
  cat       - View content (in blog)`
          break

        case "clear":
          setLines([])
          return

        case "pwd":
          output = currentPath
          break

        case "history":
          output = commandHistory.length > 0
            ? commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join("\n")
            : "No commands in history"
          break

        case "ls":
          if (currentPath === "~") {
            output = `blog/
portfolio/
timeline/
contact/`
          } else if (currentPath === "~/blog") {
            output = `init-memories.exe
camera-analog.bat
vinyl-player.c
handwrite.py`
          } else {
            output = "."
          }
          break

        case "cd":
          if (args.length === 0 || args[0] === "~") {
            onPathChange("~")
            output = ""
          } else if (args[0] === "..") {
            if (currentPath !== "~") {
              const parts = currentPath.split("/")
              parts.pop()
              const newPath = parts.join("/") || "~"
              onPathChange(newPath)
            }
            output = ""
          } else {
            let targetPath: string
            const arg = args[0].replace(/\/$/, "") // Remove trailing slash

            if (arg.startsWith("~/")) {
              targetPath = arg
            } else if (arg.startsWith("/")) {
              targetPath = "~" + arg
            } else {
              targetPath = currentPath === "~" ? `~/${arg}` : `${currentPath}/${arg}`
            }

            // Validate path
            if (validPaths.includes(targetPath)) {
              onPathChange(targetPath)
              output = ""
            } else {
              output = `cd: no such directory: ${args[0]}`
              addLine("error", output)
              return
            }
          }
          break

        case "cat":
          if (currentPath === "~/blog" && args.length > 0) {
            // Handle cat for blog posts - parent will handle showing content
            const postId = args[0].replace(/\.(exe|bat|c|py)$/, "").replace(/_/g, "-")
            onPathChange(`~/blog/${postId}`)
            output = ""
          } else if (args.length === 0) {
            output = "Usage: cat <filename>"
          } else {
            output = `cat: ${args[0]}: No such file`
            addLine("error", output)
            return
          }
          break

        case "whoami":
          output = `> Name: Peter Park
> Role: Developer, Data Scientist, Lifelong Learner
> Status: Working and researching
> Mission: Change the world to benefit humanity; fiat lux!`
          break

        // Easter eggs
        case "sudo":
          output = "Nice try, but can't allow that."
          break

        case "hello":
          output = "As a large language model, I'm not able to help with that. Just kidding!"
          break

        case "claude":
          output = `╭─── Claude Code v2.0.58 ───────────────────────────────────────────────╮
│                                         │                             │
│           Welcome back Peter!           │                             │
│                                         │                             │
│                 ▐▛███▜▌                 │ ─────────────-──────────────│
│                ▝▜█████▛▘                │ Recent activity             │
│                  ▘▘ ▝▝                  │ No recent activity          │
│                                         │                             │
│ Opus 4.5 · Claude Pro Plus Max Ultimate │                             │
╰───────────────────────────────────────────────────────────────────────╯`
          break

        case "bye":
          output = "Initiating shutdown sequence..."
          addLine("output", output)
          setTimeout(() => {
            onShutdown?.()
          }, 500)
          return

        default:
          output = `Command not found: ${command}. Type "help" for available commands.`
          addLine("error", output)
          return
      }
    }

    if (output) {
      addLine("output", output)
    }
  }, [currentPath, commandHistory, onCommand, onPathChange, addLine, validPaths])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput)
      setCurrentInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput("")
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Tab completion for cd
      if (currentInput.startsWith("cd ")) {
        const partial = currentInput.slice(3).toLowerCase()
        const options = ["blog", "portfolio", "timeline", "contact"]
        const match = options.find(o => o.startsWith(partial))
        if (match) {
          setCurrentInput(`cd ${match}`)
        }
      }
      // Tab completion for cat (in blog directory)
      else if (currentInput.startsWith("cat ") && currentPath === "~/blog") {
        const partial = currentInput.slice(4).toLowerCase()
        const blogFiles = ["init-memories.exe", "camera-analog.bat", "vinyl-player.c", "handwrite.py"]
        const match = blogFiles.find(f => f.toLowerCase().startsWith(partial))
        if (match) {
          setCurrentInput(`cat ${match}`)
        }
      }
    }
  }, [currentInput, commandHistory, historyIndex, executeCommand])

  return (
    <div
      ref={terminalRef}
      onClick={focusInput}
      className="bg-black border-2 border-amber-500 p-4 font-mono text-sm h-64 overflow-y-auto cursor-text"
    >
      {/* Output lines */}
      {lines.map((line, index) => (
        <div
          key={index}
          className={`whitespace-pre-wrap ${
            line.type === "input"
              ? "text-amber-500"
              : line.type === "error"
              ? "text-red-500"
              : "text-amber-400"
          }`}
        >
          {line.content}
        </div>
      ))}

      {/* Input line */}
      <div className="flex items-center text-amber-500">
        <span className="mr-2 shrink-0">{currentPath} &gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none text-amber-500 caret-amber-500"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="w-2 h-4 bg-amber-500 animate-pulse ml-0.5" />
      </div>
    </div>
  )
}
