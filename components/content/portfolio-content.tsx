import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: "genre-guesser",
    title: "Genre_Guesser",
    description: "Multi-modal neural network that classifies Electronic Dance Music (EDM) into 50 distinct subgenres across 9 major categories. Predicts real-time analysis drops and structures using custom CNN + SE blocks.",
    tech: ["Deep Learning", "classification", "Audio DSP", "music"],
    status: "IN_PROGRESS",
    internalLink: "~/portfolio/genre-guesser"
  },
  {
    id: "mindmates",
    title: "MindMates",
    description: "Bidirectional, multi-agent AI framework for personalized mental health support. Engineered a network of specialized LLM agents for therapeutic support, memory management, and proactive calendar tracking. Integrates a persistent memory pool achieving <5s latency.",
    tech: ["Multi-Agent System", "LLMs", "System Optimization"],
    status: "COMPLETED",
    link: "https://github.com/P11co/cs194-280"
  },
  {
    id: "casepilot",
    title: "CasePilot",
    description: "Case Study Interview Practice Platform. Architected a specialized agentic workflow to generate industry-specific business cases and provide multi-dimensional feedback. Features realistic audio-based simulations via STT/TTS integration.",
    tech: ["Speech-to-Text", "Text-to-Speech", "Agentic Workflow"],
    status: "COMPLETED",
    link: "https://drive.google.com/file/d/1Ix9MsBQQIw_PRpVYtthHxPRyUvQAsff7/view"
  },
  {
    id: "granular-convolution-synthesis",
    title: "Granular_Convolution_Synthesis",
    description: "Developed a novel way to sound design, combining the popular effects of granulation synthesis and cross-synthesis convolution.",
    tech: ["Sound Design", "Audio DSP", "Synthesis"],
    status: "COMPLETED",
    link: "https://github.com/P11co/granular_convolution_synthesis/blob/main/introduction_to_gcs.pdf"
  },
]

export function PortfolioContent({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-amber-500 text-sm mb-4">
        <p>&gt; ls -la ~/portfolio/</p>
        <p className="text-amber-600 mt-2">Compiled projects found: {projects.length}</p>
      </div>

      <div className="space-y-4">
        {projects.map((project) => {
          const isClickable = project.link || project.internalLink
          
          const CardContentWrapper = (
            <Card
              className={`bg-black border-2 border-amber-700 transition-all duration-300 h-full ${
                isClickable ? "group-hover:border-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/30" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className={`font-mono text-lg font-bold text-amber-500 ${isClickable ? "group-hover:text-amber-400" : ""}`}>
                    {project.title}
                  </CardTitle>
                  <Badge
                    className={`font-mono text-xs font-bold border ${
                      project.status === "DEPLOYED"
                        ? "bg-green-900 text-green-400 border-green-500"
                        : project.status === "COMPLETED"
                        ? "bg-blue-900/50 text-blue-400 border-blue-500"
                        : project.status === "IN_PROGRESS"
                        ? "bg-amber-900 text-amber-400 border-amber-500"
                        : "bg-gray-900 text-gray-400 border-gray-500"
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-amber-400 text-sm mb-3 whitespace-pre-wrap">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-xs text-amber-600 bg-amber-900/30 px-2 py-1 border border-amber-700">
                      {t}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <p className="font-mono text-amber-600 text-xs mt-4">
                    &gt; click to view paper / source code
                  </p>
                )}
                {project.internalLink && (
                  <p className="font-mono text-amber-600 text-xs mt-4">
                    &gt; click to read project deep dive
                  </p>
                )}
              </CardContent>
            </Card>
          )

          if (project.link) {
            return (
              <a 
                key={project.id}
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block cursor-pointer group h-full"
              >
                {CardContentWrapper}
              </a>
            )
          }

          if (project.internalLink) {
            return (
              <div 
                key={project.id}
                onClick={() => onNavigate?.(project.internalLink!)}
                className="block cursor-pointer group h-full"
              >
                {CardContentWrapper}
              </div>
            )
          }

          return (
            <div key={project.id} className="block h-full">
              {CardContentWrapper}
            </div>
          )
        })}
      </div>
    </div>
  )
}
