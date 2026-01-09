'use client'

import { useState, useCallback } from 'react'
import { updateExpertise } from '@/app/actions/audit'
import { BARRIERS_LIST } from '@/lib/types'
import { cn, debounce } from '@/lib/utils'
import { Brain, Check, UserCheck } from 'lucide-react'

interface StepExpertiseProps {
  audit: {
    id: string
    storeType: 'PHARMACIE' | 'GMS' | null
    barriers: string[]
    mainObservation: string | null
    pharmacistHelped: boolean | null
  }
}

export function StepExpertise({ audit }: StepExpertiseProps) {
  const [barriers, setBarriers] = useState<string[]>(audit.barriers || [])
  const [observation, setObservation] = useState(audit.mainObservation || '')
  const [pharmacistHelped, setPharmacistHelped] = useState(audit.pharmacistHelped)

  const debouncedUpdate = useCallback(
    debounce((value: string) => {
      updateExpertise(audit.id, { mainObservation: value })
    }, 500),
    [audit.id]
  )

  const handleBarrierToggle = (key: string) => {
    const newBarriers = barriers.includes(key)
      ? barriers.filter((b) => b !== key)
      : [...barriers, key]
    setBarriers(newBarriers)
    updateExpertise(audit.id, { barriers: newBarriers as any })
  }

  const handleObservationChange = (value: string) => {
    setObservation(value)
    debouncedUpdate(value)
  }

  const handlePharmacistChange = (value: boolean) => {
    setPharmacistHelped(value)
    updateExpertise(audit.id, { pharmacistHelped: value })
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-3">
          <Brain className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Expertise</h2>
        <p className="text-gray-500 text-sm">Analyse approfondie</p>
      </div>

      {/* Barrières à l'achat */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3">Barrières à l'achat identifiées</h3>
        <div className="space-y-2">
          {BARRIERS_LIST.map((barrier) => (
            <button
              key={barrier.key}
              type="button"
              onClick={() => handleBarrierToggle(barrier.key)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all',
                barriers.includes(barrier.key)
                  ? 'bg-red-50 border-2 border-red-200'
                  : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded flex items-center justify-center flex-shrink-0',
                  barriers.includes(barrier.key)
                    ? 'bg-red-500 text-white'
                    : 'border-2 border-gray-300'
                )}
              >
                {barriers.includes(barrier.key) && <Check className="w-3 h-3" />}
              </div>
              <div>
                <span className={cn(
                  'font-medium block',
                  barriers.includes(barrier.key) ? 'text-red-700' : 'text-gray-700'
                )}>
                  {barrier.label}
                </span>
                <span className="text-sm text-gray-500">{barrier.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Question pharmacien (si applicable) */}
      {audit.storeType === 'PHARMACIE' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <UserCheck className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">
              Le pharmacien a-t-il aidé ?
            </h3>
          </div>
          <p className="text-sm text-gray-400 italic mb-3">
            As-tu entendu le pharmacien conseiller ce produit ? (35% d'influence)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handlePharmacistChange(true)}
              className={cn(
                'py-3 px-4 rounded-xl font-medium transition-all',
                pharmacistHelped === true
                  ? 'bg-green-100 text-green-700 border-2 border-green-400'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              )}
            >
              Oui
            </button>
            <button
              type="button"
              onClick={() => handlePharmacistChange(false)}
              className={cn(
                'py-3 px-4 rounded-xl font-medium transition-all',
                pharmacistHelped === false
                  ? 'bg-red-100 text-red-700 border-2 border-red-400'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              )}
            >
              Non
            </button>
          </div>
        </div>
      )}

      {/* Observation principale */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3">Observation principale</h3>
        <textarea
          value={observation}
          onChange={(e) => handleObservationChange(e.target.value)}
          placeholder="Décrivez votre observation principale sur ce rayon..."
          rows={5}
          className={cn(
            'w-full px-4 py-3 rounded-xl',
            'bg-gray-50 border border-gray-200',
            'text-gray-900 placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'resize-none'
          )}
        />
      </div>
    </div>
  )
}
