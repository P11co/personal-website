const timelineEvents = [
  { year: "2026", event: "Expected graduation", type: "next steps" },
  { year: "2025", event: "Studied at UC Berkeley, conducted research at the Berkeley Speech Group", type: "research" },
  { year: "2024", event: "Participated in research for the Qualcomm Institute at UCSD, Graphics Lab", type: "research" },
  { year: "2023", event: "First theory CS classes taken, became a competitive programmer", type: "skills" },
  { year: "2021", event: "Military service", type: "service" },
  { year: "2020", event: "Started engineering program in Computer Science (also COVID-19)", type: "higher-education" },
  { year: "2018", event: "Took AP Computer Science A, began building websites for classes", type: "education" },
  { year: "2017", event: "...", type: "eof" },
]

export function TimelineContent() {
  return (
    <div className="space-y-6">
      <div className="text-amber-500 text-sm mb-4">
        <p>&gt; git log --oneline ~/life</p>
      </div>

      <div className="space-y-4 border-l-2 border-amber-700 pl-6 ml-4">
        {timelineEvents.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-8 w-4 h-4 bg-amber-500 border-2 border-black rounded-full" />
            <div className="text-amber-600 text-xs font-mono">{item.year}</div>
            <div className="text-amber-400 font-mono">{item.event}</div>
            <div className="text-amber-700 text-xs font-mono">type: {item.type}</div>
          </div>
        ))}
      </div>

      <div className="text-amber-600 text-xs font-mono mt-8">
        &gt; END OF LOG - {timelineEvents.length} commits found
      </div>

      {/* Calhacks photo */}
      <div className="mt-8 flex flex-col items-center">
        <img
          src="/calhacks_photo-ascii-art.png"
          alt="My team and friends at Calhacks 12"
          className="w-3/4 h-auto"
        />
        <p className="text-amber-600 text-sm font-mono mt-2">My team and friends at Calhacks 12</p>
      </div>
    </div>
  )
}
