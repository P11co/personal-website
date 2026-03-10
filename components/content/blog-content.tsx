"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BASE_PATH } from "@/lib/constants"

interface BlogPost {
  id: string
  title: string
  date: string
  category: string
  readTime: string
  excerpt: string
  content?: string
}

interface BlogContentProps {
  postId?: string
  onNavigate?: (path: string) => void
}

export function BlogContent({ postId, onNavigate }: BlogContentProps) {
  // Static list of external blog sites
  const blogs = [
    {
      id: "piico-tistory",
      title: "Piico's Tech Blog",
      url: "https://piico.tistory.com/",
      category: "External Blog",
      description: "My personal blog where I share thoughts, tutorials, and technical notes.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-amber-500 text-sm mb-4">
        <p>&gt; ls -la ~/blogs/</p>
        <p className="text-amber-600 mt-2">Found {blogs.length} external blog link(s):</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <a 
            key={blog.id}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card
              className="group bg-black border-2 border-amber-700 hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 cursor-pointer h-full"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-amber-600 text-black font-mono text-xs font-bold border border-amber-500">
                    {blog.category}
                  </Badge>
                </div>
                <CardTitle className="font-mono text-lg font-bold text-amber-500 group-hover:text-amber-400 transition-colors">
                  {blog.title}
                </CardTitle>
                <div className="font-mono text-amber-600 text-xs mt-2 break-all line-clamp-1">{blog.url}</div>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-amber-400 text-sm leading-relaxed mb-4">
                  {blog.description}
                </p>
                <p className="font-mono text-amber-600 text-xs">
                  &gt; click to open in new tab
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Jollie image */}
      <div className="mt-8 flex justify-center">
        <img
          src={`${BASE_PATH}/Jollie2-ascii-art.png`}
          alt="Jollie"
          className="w-3/4 h-auto"
        />
      </div>
    </div>
  )
}
