import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, AlertCircle } from 'lucide-react'

export function NotFound() {
  const { t } = useTranslation('common')

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-800">
        <AlertCircle className="h-12 w-12 text-gray-400" />
      </div>
      <h1 className="mb-2 text-3xl font-bold">{t('notFound.title')}</h1>
      <p className="mb-8 text-gray-400">{t('notFound.message')}</p>
      <Link to="/" className="btn-primary">
        <Home className="h-4 w-4" />
        {t('notFound.backToDashboard')}
      </Link>
    </div>
  )
}
