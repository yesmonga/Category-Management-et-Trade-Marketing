'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Check, X, Minus } from 'lucide-react'

type EvaluationValue = 'OUI' | 'NON' | 'PARTIEL' | null

interface EvaluationButtonsProps {
  value: EvaluationValue
  onChange: (value: EvaluationValue) => void
  disabled?: boolean
}

export function EvaluationButtons({ value, onChange, disabled }: EvaluationButtonsProps) {
  const [localValue, setLocalValue] = useState<EvaluationValue>(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleClick = (newValue: EvaluationValue) => {
    const finalValue = localValue === newValue ? null : newValue
    setLocalValue(finalValue)
    onChange(finalValue)
  }
  const buttons = [
    {
      key: 'OUI' as const,
      label: 'Oui',
      icon: Check,
      activeClass: 'bg-green-100 border-green-400 text-green-700',
      hoverClass: 'hover:bg-green-50',
    },
    {
      key: 'PARTIEL' as const,
      label: 'Partiel',
      icon: Minus,
      activeClass: 'bg-orange-100 border-orange-400 text-orange-700',
      hoverClass: 'hover:bg-orange-50',
    },
    {
      key: 'NON' as const,
      label: 'Non',
      icon: X,
      activeClass: 'bg-red-100 border-red-400 text-red-700',
      hoverClass: 'hover:bg-red-50',
    },
  ]

  return (
    <div className="flex gap-3">
      {buttons.map((btn) => {
        const Icon = btn.icon
        const isActive = localValue === btn.key
        return (
          <button
            key={btn.key}
            type="button"
            disabled={disabled}
            onClick={() => handleClick(btn.key)}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1',
              'py-4 px-3 rounded-xl border-2 transition-all duration-200',
              'font-medium text-sm',
              'active:scale-95',
              disabled && 'opacity-50 cursor-not-allowed',
              isActive
                ? btn.activeClass
                : 'bg-white border-gray-200 text-gray-600 ' + btn.hoverClass
            )}
          >
            <Icon className="w-6 h-6" strokeWidth={2.5} />
            <span>{btn.label}</span>
          </button>
        )
      })}
    </div>
  )
}
