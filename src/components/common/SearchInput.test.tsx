import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SearchInput } from './SearchInput'

describe('SearchInput', () => {
  it('renders correctly', () => {
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)

    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('displays the value', () => {
    const onChange = vi.fn()
    render(<SearchInput value="test" onChange={onChange} />)

    expect(screen.getByRole('searchbox')).toHaveValue('test')
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'hello' },
    })

    expect(onChange).toHaveBeenCalledWith('hello')
  })

  it('shows clear button when there is text', () => {
    const onChange = vi.fn()
    render(<SearchInput value="test" onChange={onChange} />)

    expect(screen.getByLabelText('Limpiar búsqueda')).toBeInTheDocument()
  })

  it('hides clear button when empty', () => {
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)

    expect(screen.queryByLabelText('Limpiar búsqueda')).not.toBeInTheDocument()
  })

  it('calls onClear and clears value when clear button is clicked', () => {
    const onChange = vi.fn()
    const onClear = vi.fn()
    render(<SearchInput value="test" onChange={onChange} onClear={onClear} />)

    fireEvent.click(screen.getByLabelText('Limpiar búsqueda'))

    expect(onChange).toHaveBeenCalledWith('')
    expect(onClear).toHaveBeenCalled()
  })

  it('shows loading spinner when isLoading is true', () => {
    const onChange = vi.fn()
    render(<SearchInput value="test" onChange={onChange} isLoading={true} />)

    expect(screen.getByLabelText('Buscando...')).toBeInTheDocument()
    expect(screen.queryByLabelText('Limpiar búsqueda')).not.toBeInTheDocument()
  })

  it('uses custom placeholder', () => {
    const onChange = vi.fn()
    render(
      <SearchInput
        value=""
        onChange={onChange}
        placeholder="Custom placeholder"
      />
    )

    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('supports different sizes', () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <SearchInput value="" onChange={onChange} size="sm" />
    )

    expect(screen.getByRole('searchbox')).toHaveClass('h-8')

    rerender(<SearchInput value="" onChange={onChange} size="lg" />)

    expect(screen.getByRole('searchbox')).toHaveClass('h-12')
  })

  it('calls onFocus when focused', () => {
    const onChange = vi.fn()
    const onFocus = vi.fn()
    render(<SearchInput value="" onChange={onChange} onFocus={onFocus} />)

    fireEvent.focus(screen.getByRole('searchbox'))

    expect(onFocus).toHaveBeenCalled()
  })

  it('calls onBlur when blurred', () => {
    const onChange = vi.fn()
    const onBlur = vi.fn()
    render(<SearchInput value="" onChange={onChange} onBlur={onBlur} />)

    fireEvent.blur(screen.getByRole('searchbox'))

    expect(onBlur).toHaveBeenCalled()
  })

  it('calls onKeyDown when key is pressed', () => {
    const onChange = vi.fn()
    const onKeyDown = vi.fn()
    render(<SearchInput value="" onChange={onChange} onKeyDown={onKeyDown} />)

    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter' })

    expect(onKeyDown).toHaveBeenCalled()
  })

  it('has correct aria-label', () => {
    const onChange = vi.fn()
    render(
      <SearchInput value="" onChange={onChange} placeholder="Search items" />
    )

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'aria-label',
      'Search items'
    )
  })
})
