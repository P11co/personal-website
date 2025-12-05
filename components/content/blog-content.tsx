"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch blog data from static JSON file
  useEffect(() => {
    fetch(`${BASE_PATH}/blog-data.json`)
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        if (Array.isArray(data)) {
          setPosts(data)
          if (postId) {
            const post = data.find(p => p.id === postId)
            if (post) {
              setCurrentPost(post)
            } else {
              setError("Post not found")
            }
          }
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load posts")
        setLoading(false)
      })
  }, [postId])

  if (loading) {
    return (
      <div className="text-amber-500 text-sm animate-pulse">
        &gt; Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        &gt; Error: {error}
      </div>
    )
  }

  // Single post view
  if (postId && currentPost) {
    return (
      <div className="space-y-6">
        <div className="text-amber-600 text-sm">&gt; cat {currentPost.title}</div>
        <Card className="bg-black border-2 border-amber-500">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-amber-600 text-black font-mono text-xs font-bold border border-amber-500">
                {currentPost.category}
              </Badge>
              <span className="text-amber-600 text-xs">{currentPost.date}</span>
              <span className="text-amber-700 text-xs">{currentPost.readTime}</span>
            </div>
            <CardTitle className="font-mono text-2xl font-bold text-amber-500">
              {currentPost.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert prose-amber max-w-none">
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-amber-500 mt-6 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold text-amber-500 mt-6 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold text-amber-400 mt-4 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="text-amber-400 mb-4 leading-relaxed">{children}</p>,
                  a: ({ href, children }) => <a href={href} className="text-amber-300 underline hover:text-amber-200">{children}</a>,
                  ul: ({ children }) => <ul className="list-disc list-inside text-amber-400 mb-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside text-amber-400 mb-4 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-amber-400">{children}</li>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-amber-500 pl-4 italic text-amber-500 my-4">{children}</blockquote>,
                  code: ({ className, children }) => {
                    const isInline = !className
                    if (isInline) {
                      return <code className="bg-amber-900/30 text-amber-300 px-1 py-0.5 rounded text-sm">{children}</code>
                    }
                    return (
                      <code className="block bg-amber-900/20 border border-amber-700 p-4 rounded text-amber-300 text-sm overflow-x-auto my-4">
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => <pre className="bg-amber-900/20 border border-amber-700 p-4 rounded overflow-x-auto my-4">{children}</pre>,
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt || ""} className="max-w-full h-auto rounded border border-amber-700 my-4" />
                  ),
                  hr: () => <hr className="border-amber-700 my-6" />,
                  strong: ({ children }) => <strong className="text-amber-300 font-bold">{children}</strong>,
                  em: ({ children }) => <em className="text-amber-400 italic">{children}</em>,
                }}
              >
                {currentPost.content || ""}
              </ReactMarkdown>
            </div>
            <button
              onClick={() => onNavigate?.("~/blog")}
              className="text-amber-600 text-sm mt-8 hover:text-amber-400 transition-colors cursor-pointer block"
            >
              &gt; cd .. (go back)
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // List view
  return (
    <div className="space-y-6">
      <div className="text-amber-500 text-sm mb-4">
        <p>&gt; ls -la ~/blog/</p>
        <p className="text-amber-600 mt-2">Found {posts.length} memory files:</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-amber-600 text-sm">
          &gt; No posts found. Add .md files to /public/blog/
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Card
              key={post.id}
              onClick={() => onNavigate?.(`~/blog/${post.id}`)}
              className="group bg-black border-2 border-amber-700 hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-amber-600 text-black font-mono text-xs font-bold border border-amber-500">
                    {post.category}
                  </Badge>
                  <span className="font-mono text-xs text-amber-600">{post.readTime}</span>
                </div>
                <CardTitle className="font-mono text-lg font-bold text-amber-500 group-hover:text-amber-400 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="font-mono text-amber-600 text-xs">{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-amber-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <p className="font-mono text-amber-600 text-xs">
                  &gt; click or `cat {post.id}` to read
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Jollie image */}
      <div className="mt-8 flex justify-center">
        <img
          src="/Jollie2-ascii-art.png"
          alt="Jollie"
          className="w-3/4 h-auto"
        />
      </div>
    </div>
  )
}
