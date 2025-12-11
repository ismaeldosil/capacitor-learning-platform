import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
}

const languageLabels: Record<string, string> = {
  typescript: 'TypeScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  js: 'JavaScript',
  bash: 'Terminal',
  shell: 'Terminal',
  json: 'JSON',
  xml: 'XML',
  html: 'HTML',
  css: 'CSS',
  swift: 'Swift',
  kotlin: 'Kotlin',
  java: 'Java',
  gradle: 'Gradle',
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
  highlightLines = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const lines = code.split('\n')
  const isTerminal = language === 'bash' || language === 'shell'
  const displayLabel = filename || languageLabels[language] || language

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800/50 px-4 py-2">
        <div className="flex items-center gap-2">
          {isTerminal && <Terminal className="h-4 w-4 text-gray-400" />}
          <span className="text-sm text-gray-400">{displayLabel}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
          aria-label={copied ? 'Copiado' : 'Copiar código'}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-500" />
              <span className="text-green-500">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1
              const isHighlighted = highlightLines.includes(lineNumber)

              return (
                <div
                  key={index}
                  className={`flex ${isHighlighted ? 'bg-primary-500/10 -mx-4 px-4' : ''}`}
                >
                  {showLineNumbers && (
                    <span
                      className={`mr-4 inline-block w-8 select-none text-right ${
                        isHighlighted ? 'text-primary-400' : 'text-gray-600'
                      }`}
                    >
                      {lineNumber}
                    </span>
                  )}
                  <span
                    className={`flex-1 ${
                      isHighlighted ? 'text-white' : 'text-gray-300'
                    }`}
                  >
                    {line || ' '}
                  </span>
                </div>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}
