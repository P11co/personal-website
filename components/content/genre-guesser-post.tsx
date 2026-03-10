import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface GenreGuesserPostProps {
  onNavigate?: (path: string) => void
}

const markdownContent = `
Organizing a massive electronic music library is a challenge for any DJ or music enthusiast. I built Genre Guesser, a deep learning project and personal DJ tool designed to automatically analyze and classify Electronic Dance Music (EDM) into 50 distinct subgenres across 9 major categories (like House, Techno, Trance, Drum and Bass, and Dubstep).

Here is a breakdown of what the project covers, the technologies used, and some interesting findings from my experiments.

### 🎵 What It Does
At its core, the project is a multi-modal, multi-task neural network that listens to audio tracks and predicts both the major genre (e.g., Techno) and the specific subgenre (e.g., Acid Techno or Minimal Techno). To make it interactive and usable, I wrapped the machine learning models in a Streamlit web application that provides real-time audio analysis, visualizations, and predictions.

**Key Features:**
- **Audio Drop Detection:** EDM is defined by its energy. I built a custom audio processing pipeline that uses RMS (Root Mean Square) energy analysis with smoothing to automatically detect the high-energy sections—the "drops"—in any given track.
- **Interactive Spectrograms:** The web app generates and visualizes Mel-spectrograms in real time, highlighting exactly where the detected drops occur.
- **Audio Similarity & Deduplication:** To compare different audio segments, the project uses multiple extraction methods:
  - \`MFCC\`: Captures the timbre (what instrument or synthesizer is playing).
  - \`Chroma\`: Captures the pitch and harmony (what notes are playing).
  - \`DTW (Dynamic Time Warping)\`: Captures the temporal structure (how the sequence evolves over time).

### 🧠 The AI / Machine Learning Architecture
I approached the classification problem using a few different AI architectures:

- **Custom CNN + MLP with SE Blocks:** A from-scratch convolutional neural network feature extractor that uses Squeeze-and-Excitation (SE) blocks. It branches into two separate multi-task heads: one to predict the 9 major genres, and one for the 50 subgenres.
- **Pretrained Audio Models & Zero-Shot Classification:** I integrated CLAP (Contrastive Language-Audio Pretraining) to allow for zero-shot audio classification, seeing how well massive foundational models understand niche EDM subgenres without explicit training.

### 🔬 Pilot Study Findings & Learnings
Building this wasn't just about throwing data at a model; it required extensive audio engineering experiments. Through a pilot study on a 50-album subset, I tested a few hypotheses:

- **Hypothesis 1:** Drops hold the most genre information.
  - **Result: False!** Extracting and predicting on the "drops" only actually dropped major accuracy from 18% to 10%. It turns out drops can be remarkably genre-agnostic across different styles of EDM.
- **Hypothesis 2:** Vocals confuse the model.
  - **Result: False!** Running the audio through vocal-removal tools before classification lowered accuracy to 15%. Vocals actually carry significant structural and stylistic clues for genres (e.g., House vs. Trance).

### 🚀 Next Steps
The current target is hitting 75% accuracy on major genres and 90% top-3 accuracy. To achieve this, the project is moving toward:

- **Multi-segment voting:** Classifying multiple 3-second segments throughout the song and averaging the probabilities, rather than relying on one slice.
- **Advanced Model Fine-Tuning:** Leveraging state-of-the-art pretrained models like PANNs, AST, or CLAP to build on top of their massive acoustic understanding.
- **Data Augmentation:** Using techniques like pitch shifting, time stretching, and SpecAugment to make the model more robust.
`

export function GenreGuesserPost({ onNavigate }: GenreGuesserPostProps) {
  return (
    <div className="space-y-6">
      <div className="text-amber-600 text-sm">&gt; cat ~/portfolio/genre-guesser.md</div>
      <Card className="bg-black border-2 border-amber-500">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-amber-600 text-black font-mono text-xs font-bold border border-amber-500">
              DEEP LEARNING
            </Badge>
            <span className="text-amber-600 text-xs">March 2026</span>
            <span className="text-amber-700 text-xs">4 min read</span>
          </div>
          <CardTitle className="font-mono text-2xl font-bold text-amber-500">
            Project Deep Dive: Building an AI-Powered EDM Genre Classifier
          </CardTitle>
          <CardDescription className="font-mono text-amber-600">
            Detailed breakdown of my research and findings building an automated music organization tool.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-invert prose-amber max-w-none">
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h3: ({ children }) => <h3 className="text-lg font-bold text-amber-400 mt-6 mb-3">{children}</h3>,
                p: ({ children }) => <p className="text-amber-400 mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside text-amber-400 mb-4 space-y-2">{children}</ul>,
                li: ({ children }) => <li className="text-amber-400 ml-4">{children}</li>,
                code: ({ children }) => <code className="bg-amber-900/30 text-amber-300 px-1 py-0.5 rounded text-sm">{children}</code>,
                strong: ({ children }) => <strong className="text-amber-300 font-bold">{children}</strong>,
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
          <button
            onClick={() => onNavigate?.("~/portfolio")}
            className="text-amber-600 text-sm mt-8 hover:text-amber-400 transition-colors cursor-pointer block"
          >
            &gt; cd .. (go back to portfolio)
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
