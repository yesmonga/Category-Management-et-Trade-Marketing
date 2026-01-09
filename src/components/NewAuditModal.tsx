'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Building2, Store } from 'lucide-react'
import { createAudit } from '@/app/actions/audit'
import { cn } from '@/lib/utils'

interface NewAuditModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewAuditModal({ isOpen, onClose }: NewAuditModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [auditorName, setAuditorName] = useState('')
  const [storeName, setStoreName] = useState('')
  const [storeType, setStoreType] = useState<'PHARMACIE' | 'GMS' | null>(null)

  const canSubmit = auditorName.trim() && storeName.trim() && storeType

  const handleSubmit = async () => {
    if (!canSubmit) return

    setIsLoading(true)
    try {
      const auditId = await createAudit({
        auditorName: auditorName.trim(),
        storeName: storeName.trim(),
        storeType: storeType!,
      })
      router.push(`/audit/${auditId}`)
    } catch (error) {
      console.error('Error creating audit:', error)
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Nouvel Audit</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Nom de l'auditeur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Votre nom
            </label>
            <input
              type="text"
              value={auditorName}
              onChange={(e) => setAuditorName(e.target.value)}
              placeholder="Ex: Jean Dupont"
              className={cn(
                'w-full px-4 py-3 rounded-xl',
                'bg-gray-50 border border-gray-200',
                'text-gray-900 placeholder:text-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                'transition-all duration-200'
              )}
            />
          </div>

          {/* Nom du magasin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du point de vente
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Ex: Pharmacie du Centre"
              className={cn(
                'w-full px-4 py-3 rounded-xl',
                'bg-gray-50 border border-gray-200',
                'text-gray-900 placeholder:text-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                'transition-all duration-200'
              )}
            />
          </div>

          {/* Type de magasin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de point de vente
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStoreType('PHARMACIE')}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
                  storeType === 'PHARMACIE'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                )}
              >
                <Building2 className="w-8 h-8" />
                <span className="font-medium">Pharmacie</span>
              </button>
              <button
                type="button"
                onClick={() => setStoreType('GMS')}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
                  storeType === 'GMS'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                )}
              >
                <Store className="w-8 h-8" />
                <span className="font-medium">GMS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          className={cn(
            'w-full mt-6 py-4 rounded-xl font-semibold text-base',
            'transition-all duration-200 active:scale-95',
            canSubmit && !isLoading
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
        >
          {isLoading ? 'Création...' : 'Commencer l\'audit'}
        </button>
      </div>
    </div>
  )
}
