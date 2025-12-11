import { AlertTriangle, Info, Lightbulb, CheckCircle } from 'lucide-react'
import { CodeBlock } from './CodeBlock'
import { Fragment, useMemo } from 'react'

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
    <div className="space-y-6" role="article" aria-label="Contenido de la lección">
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
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
          <FormattedText text={block.content || ''} />
        </div>
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
        <aside
          className="flex gap-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4"
          role="note"
          aria-label="Tip"
        >
          <Lightbulb className="h-5 w-5 flex-shrink-0 text-yellow-500" aria-hidden="true" />
          <div className="text-gray-300">
            <p className="font-semibold text-yellow-500">Tip</p>
            <p className="mt-1">{block.content}</p>
          </div>
        </aside>
      )

    case 'warning':
      return (
        <aside
          className="flex gap-4 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4"
          role="alert"
          aria-label="Advertencia"
        >
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-500" aria-hidden="true" />
          <div className="text-gray-300">
            <p className="font-semibold text-orange-500">Advertencia</p>
            <p className="mt-1">{block.content}</p>
          </div>
        </aside>
      )

    case 'info':
      return (
        <aside
          className="flex gap-4 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4"
          role="note"
          aria-label="Nota informativa"
        >
          <Info className="h-5 w-5 flex-shrink-0 text-blue-500" aria-hidden="true" />
          <div className="text-gray-300">
            <p className="font-semibold text-blue-500">Nota</p>
            <p className="mt-1">{block.content}</p>
          </div>
        </aside>
      )

    case 'success':
      return (
        <aside
          className="flex gap-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4"
          role="note"
          aria-label="Información importante"
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
          <div className="text-gray-300">
            <p className="font-semibold text-green-500">Importante</p>
            <p className="mt-1">{block.content}</p>
          </div>
        </aside>
      )

    case 'list':
      return (
        <ul className="space-y-2 text-gray-300" role="list">
          {block.items?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}

/**
 * Safely renders formatted text using React components instead of dangerouslySetInnerHTML.
 * Supports: **bold**, `code`, and newlines
 */
function FormattedText({ text }: { text: string }) {
  const elements = useMemo(() => {
    const result: React.ReactNode[] = []
    // Split by newlines first to handle line breaks
    const lines = text.split('\n')

    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        result.push(<br key={`br-${lineIndex}`} />)
      }

      // Pattern to match **bold** and `code`
      const pattern = /(\*\*.*?\*\*|`.*?`)/g
      const parts = line.split(pattern)

      parts.forEach((part, partIndex) => {
        const key = `${lineIndex}-${partIndex}`

        if (part.startsWith('**') && part.endsWith('**')) {
          // Bold text
          const content = part.slice(2, -2)
          result.push(
            <strong key={key} className="text-white">
              {content}
            </strong>
          )
        } else if (part.startsWith('`') && part.endsWith('`')) {
          // Inline code
          const content = part.slice(1, -1)
          result.push(
            <code key={key} className="rounded bg-gray-700 px-1.5 py-0.5 text-primary-400">
              {content}
            </code>
          )
        } else if (part) {
          // Regular text
          result.push(<Fragment key={key}>{part}</Fragment>)
        }
      })
    })

    return result
  }, [text])

  return <>{elements}</>
}
