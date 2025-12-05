import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: "project-alpha",
    title: "project_alpha.exe",
    description: "A full-stack web application with retro aesthetics",
    tech: ["React", "Node.js", "PostgreSQL"],
    status: "DEPLOYED",
  },
  {
    id: "terminal-ui",
    title: "terminal_ui.sh",
    description: "CLI-inspired component library for nostalgic developers",
    tech: ["TypeScript", "Tailwind", "Storybook"],
    status: "IN_PROGRESS",
  },
  {
    id: "pixel-art-gen",
    title: "pixel_art_gen.py",
    description: "AI-powered pixel art generator from text prompts",
    tech: ["Python", "PyTorch", "FastAPI"],
    status: "ARCHIVED",
  },
]

export function PortfolioContent() {
  return (
    <div className="space-y-6">
      <div className="text-amber-500 text-sm mb-4">
        <p>&gt; ls -la ~/portfolio/</p>
        <p className="text-amber-600 mt-2">Compiled projects found: {projects.length}</p>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-black border-2 border-amber-700 hover:border-amber-500 transition-all duration-300"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-lg font-bold text-amber-500">
                  {project.title}
                </CardTitle>
                <Badge
                  className={`font-mono text-xs font-bold border ${
                    project.status === "DEPLOYED"
                      ? "bg-green-900 text-green-400 border-green-500"
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
              <p className="font-mono text-amber-400 text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs text-amber-600 bg-amber-900/30 px-2 py-1 border border-amber-700">
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
