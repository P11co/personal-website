import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogDir = path.join(process.cwd(), "public/blog")
const outputFile = path.join(process.cwd(), "public/blog-data.json")

function generateBlogData() {
  if (!fs.existsSync(blogDir)) {
    console.log("No blog directory found, creating empty blog-data.json")
    fs.writeFileSync(outputFile, JSON.stringify([]))
    return
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
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2))
  console.log(`Generated blog-data.json with ${posts.length} posts`)
}

generateBlogData()
