'use client'

import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Clock, CheckCircle, Store, Building2, ChevronRight, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WIZARD_STEPS } from '@/lib/types'

interface AuditCardProps {
  audit: {
    id: string
    status: 'DRAFT' | 'COMPLETED'
    auditorName: string | null
    storeName: string | null
    storeType: 'PHARMACIE' | 'GMS' | null
    currentStep: number
    createdAt: Date
    updatedAt: Date
  }
  onDelete?: (id: string) => void
}

export function AuditCard({ audit, onDelete }: AuditCardProps) {
  const isDraft = audit.status === 'DRAFT'
  const StoreIcon = audit.storeType === 'PHARMACIE' ? Building2 : Store
  const progress = Math.round((audit.currentStep / (WIZARD_STEPS.length - 1)) * 100)

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete && confirm('Supprimer cet audit ?')) {
      onDelete(audit.id)
    }
  }

  return (
    <Link href={`/audit/${audit.id}`}>
      <div
        className={cn(
          'bg-white rounded-2xl p-4 shadow-sm',
          'border border-gray-100',
          'active:scale-[0.98] transition-transform duration-150',
          'hover:shadow-md'
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                audit.storeType === 'PHARMACIE'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-blue-100 text-blue-600'
              )}
            >
              <StoreIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-base">
                {audit.storeName || 'Sans nom'}
              </h3>
              <p className="text-sm text-gray-500">
                {audit.auditorName || 'Anonyme'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isDraft && onDelete && (
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {isDraft ? (
              <Clock className="w-4 h-4 text-orange-500" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
            <span>
              {isDraft ? 'En cours' : 'Terminé'} • {formatDate(audit.updatedAt)}
            </span>
          </div>
        </div>

        {isDraft && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Progression</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
