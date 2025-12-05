import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const blogDir = path.join(process.cwd(), "public/blog")
  const filePath = path.join(blogDir, `${slug}.md`)

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return NextResponse.json({
      id: slug,
      title: data.title || slug,
      date: data.date || "",
      category: data.category || "UNCATEGORIZED",
      readTime: data.readTime || "? cycles",
      excerpt: data.excerpt || "",
      content: content,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 })
  }
}
