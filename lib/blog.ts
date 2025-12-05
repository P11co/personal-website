import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  id: string
  title: string
  date: string
  category: string
  readTime: string
  excerpt: string
  content: string
}

const blogDir = path.join(process.cwd(), "public/blog")

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) {
    return []
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"))

  const posts = files.map((filename) => {
    const filePath = path.join(blogDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)
    const id = filename.replace(/\.md$/, "")

    return {
      id,
      title: data.title || id,
      date: data.date || "",
      category: data.category || "UNCATEGORIZED",
      readTime: data.readTime || "? cycles",
      excerpt: data.excerpt || "",
      content,
    }
  })

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostById(id: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find((post) => post.id === id) || null
}
