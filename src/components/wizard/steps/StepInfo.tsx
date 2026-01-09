'use client'

import { useState, useCallback } from 'react'
import { updateAuditInfo } from '@/app/actions/audit'
import { cn, debounce } from '@/lib/utils'
import { MapPin, Cloud, Sun, CloudRain } from 'lucide-react'

interface StepInfoProps {
  audit: {
    id: string
    auditorName: string | null
    storeName: string | null
    storeType: 'PHARMACIE' | 'GMS' | null
    categoryAnalyzed: string | null
    weather: 'CALME' | 'AFFLUENTE' | 'SATUREE' | null
  }
}

export function StepInfo({ audit }: StepInfoProps) {
  const [category, setCategory] = useState(audit.categoryAnalyzed || '')
  const [weather, setWeather] = useState(audit.weather)

  const debouncedUpdate = useCallback(
    debounce((value: string) => {
      updateAuditInfo(audit.id, { categoryAnalyzed: value })
    }, 500),
    [audit.id]
  )

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    debouncedUpdate(value)
  }

  const handleWeatherChange = (value: 'CALME' | 'AFFLUENTE' | 'SATUREE') => {
    setWeather(value)
    updateAuditInfo(audit.id, { weather: value })
  }

  const weatherOptions = [
    { key: 'CALME' as const, label: 'Calme', icon: Sun, color: 'text-green-600 bg-green-100' },
    { key: 'AFFLUENTE' as const, label: 'Affluente', icon: Cloud, color: 'text-orange-600 bg-orange-100' },
    { key: 'SATUREE' as const, label: 'Saturée', icon: CloudRain, color: 'text-red-600 bg-red-100' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations</h2>
        <p className="text-gray-500">Détails du point de vente audité</p>
      </div>

      {/* Résumé */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            audit.storeType === 'PHARMACIE' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
          )}>
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{audit.storeName}</h3>
            <p className="text-sm text-gray-500">
              {audit.storeType === 'PHARMACIE' ? 'Pharmacie' : 'GMS'} • Auditeur: {audit.auditorName}
            </p>
          </div>
        </div>
      </div>

      {/* Catégorie analysée */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Catégorie analysée
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          placeholder="Ex: Compléments alimentaires, OTC..."
          className={cn(
            'w-full px-4 py-3 rounded-xl',
            'bg-gray-50 border border-gray-200',
            'text-gray-900 placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          )}
        />
      </div>

      {/* Météo du rayon */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Météo du rayon
        </label>
        <div className="grid grid-cols-3 gap-3">
          {weatherOptions.map((option) => {
            const Icon = option.icon
            const isActive = weather === option.key
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => handleWeatherChange(option.key)}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
                  isActive
                    ? `border-current ${option.color}`
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
