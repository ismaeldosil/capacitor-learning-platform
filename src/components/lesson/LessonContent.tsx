import { AlertTriangle, Info, Lightbulb, CheckCircle } from 'lucide-react'
import { CodeBlock } from './CodeBlock'

export interface ContentBlock {
  type: 'text' | 'code' | 'tip' | 'warning' | 'info' | 'success' | 'list'
  content?: string
  items?: string[]
  code?: string
  language?: string
  filename?: string
  highlightLines?: number[]
}

interface LessonContentProps {
  blocks: ContentBlock[]
}

export function LessonContent({ blocks }: LessonContentProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <ContentBlockRenderer key={index} block={block} />
      ))}
    </div>
  )
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <div
          className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatText(block.content || '') }}
        />
      )

    case 'code':
      return (
        <CodeBlock
          code={block.code || ''}
          language={block.language}
          filename={block.filename}
          highlightLines={block.highlightLines}
        />
      )

    case 'tip':
      return (
        <div className="flex gap-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
          <Lightbulb className="h-5 w-5 flex-shrink-0 text-yellow-500" />
          <div className="text-gray-300">
            <p className="font-semibold text-yellow-500">Tip</p>
            <p className="mt-1">{block.content}</p>
          </div>
        </div>
      )

    case 'warning':
      return (
        <div className="flex gap-4 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-500" />
          <div className="text-gray-300">
            <p className="font-semibold text-orange-500">Advertencia</p>
            <p className="mt-1">{block.content}</p>
          </div>
        </div>
      )

    case 'info':
      return (
        <div className="flex gap-4 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
          <Info className="h-5 w-5 flex-shrink-0 text-blue-500" />
          <div className="text-gray-300">
            <p className="font-semibold text-blue-500">Nota</p>
            <p className="mt-1">{block.content}</p>
          </div>
        </div>
      )

    case 'success':
      return (
        <div className="flex gap-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
          <div className="text-gray-300">
            <p className="font-semibold text-green-500">Importante</p>
            <p className="mt-1">{block.content}</p>
          </div>
        </div>
      )

    case 'list':
      return (
        <ul className="space-y-2 text-gray-300">
          {block.items?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}

function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/`(.*?)`/g, '<code class="rounded bg-gray-700 px-1.5 py-0.5 text-primary-400">$1</code>')
    .replace(/\n/g, '<br />')
}
