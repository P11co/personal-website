import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function GET() {
  const blogDir = path.join(process.cwd(), "public/blog")

  try {
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith(".md"))

    const posts = files.map(filename => {
      const filePath = path.join(blogDir, filename)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(fileContent)

      return {
        id: filename.replace(".md", ""),
        title: data.title || filename,
        date: data.date || "",
        category: data.category || "UNCATEGORIZED",
        readTime: data.readTime || "? cycles",
        excerpt: data.excerpt || "",
      }
    })

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 })
  }
}
