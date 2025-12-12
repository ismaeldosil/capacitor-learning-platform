import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X, Loader2 } from 'lucide-react'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  isLoading?: boolean
  onClear?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      isLoading = false,
      onClear,
      onFocus,
      onBlur,
      onKeyDown,
      autoFocus = false,
      className = '',
      size = 'md',
    },
    ref
  ) => {
    const { t } = useTranslation('search')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    }

    const resolvedPlaceholder = placeholder ?? t('placeholderShort')

    const handleClear = () => {
      onChange('')
      onClear?.()
    }

    const sizeClasses = {
      sm: 'h-8 text-sm pl-8 pr-8',
      md: 'h-10 text-base pl-10 pr-10',
      lg: 'h-12 text-lg pl-12 pr-12',
    }

    const iconSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    }

    const iconLeftPosition = {
      sm: 'left-2',
      md: 'left-3',
      lg: 'left-3',
    }

    const iconRightPosition = {
      sm: 'right-2',
      md: 'right-3',
      lg: 'right-3',
    }

    return (
      <div className={`relative ${className}`}>
        {/* Search icon */}
        <Search
          className={`absolute ${iconLeftPosition[size]} top-1/2 -translate-y-1/2 text-gray-400 ${iconSizeClasses[size]}`}
          aria-hidden="true"
        />

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={resolvedPlaceholder}
          autoFocus={autoFocus}
          className={`
            w-full rounded-lg border border-gray-600 bg-gray-800
            text-white placeholder-gray-400
            focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20
            transition-colors duration-200
            ${sizeClasses[size]}
          `}
          aria-label={resolvedPlaceholder}
          role="searchbox"
        />

        {/* Right side: Loading spinner or Clear button */}
        <div
          className={`absolute ${iconRightPosition[size]} top-1/2 -translate-y-1/2`}
        >
          {isLoading ? (
            <Loader2
              className={`${iconSizeClasses[size]} animate-spin text-gray-400`}
              aria-label={t('searching')}
            />
          ) : value.length > 0 ? (
            <button
              type="button"
              onClick={handleClear}
              className="rounded p-0.5 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-colors"
              aria-label={t('clearSearch')}
            >
              <X className={iconSizeClasses[size]} />
            </button>
          ) : null}
        </div>
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'
