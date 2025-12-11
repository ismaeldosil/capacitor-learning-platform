import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LessonContent } from './LessonContent'
import type { ContentBlock } from './LessonContent'

describe('LessonContent', () => {
  describe('text block', () => {
    it('should render text content', () => {
      const blocks: ContentBlock[] = [{ type: 'text', content: 'Hello World' }]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('should render bold text', () => {
      const blocks: ContentBlock[] = [{ type: 'text', content: '**bold text**' }]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('bold text')).toBeInTheDocument()
    })
  })

  describe('code block', () => {
    it('should render code content', () => {
      const blocks: ContentBlock[] = [
        { type: 'code', code: 'const x = 1', language: 'typescript' },
      ]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('const x = 1')).toBeInTheDocument()
    })
  })

  describe('tip block', () => {
    it('should render tip with icon', () => {
      const blocks: ContentBlock[] = [{ type: 'tip', content: 'This is a tip' }]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('This is a tip')).toBeInTheDocument()
      expect(screen.getByText('Tip')).toBeInTheDocument()
    })
  })

  describe('warning block', () => {
    it('should render warning with icon', () => {
      const blocks: ContentBlock[] = [
        { type: 'warning', content: 'This is a warning' },
      ]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('This is a warning')).toBeInTheDocument()
      expect(screen.getByText('Advertencia')).toBeInTheDocument()
    })
  })

  describe('info block', () => {
    it('should render info with icon', () => {
      const blocks: ContentBlock[] = [{ type: 'info', content: 'This is info' }]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('This is info')).toBeInTheDocument()
      expect(screen.getByText('Nota')).toBeInTheDocument()
    })
  })

  describe('success block', () => {
    it('should render success with icon', () => {
      const blocks: ContentBlock[] = [
        { type: 'success', content: 'This is important' },
      ]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('This is important')).toBeInTheDocument()
      expect(screen.getByText('Importante')).toBeInTheDocument()
    })
  })

  describe('list block', () => {
    it('should render list items', () => {
      const blocks: ContentBlock[] = [
        { type: 'list', items: ['Item 1', 'Item 2', 'Item 3'] },
      ]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })
  })

  describe('multiple blocks', () => {
    it('should render multiple blocks in order', () => {
      const blocks: ContentBlock[] = [
        { type: 'text', content: 'First block' },
        { type: 'tip', content: 'Second block' },
        { type: 'code', code: 'third block' },
      ]
      render(<LessonContent blocks={blocks} />)
      expect(screen.getByText('First block')).toBeInTheDocument()
      expect(screen.getByText('Second block')).toBeInTheDocument()
      expect(screen.getByText('third block')).toBeInTheDocument()
    })
  })
})
