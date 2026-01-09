'use client'

import { useState } from 'react'
import { updateGoldenRules } from '@/app/actions/audit'
import { GOLDEN_RULES_LIST } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Award, Check } from 'lucide-react'

interface StepGoldenRulesProps {
  audit: {
    id: string
    goldenRules: Record<string, unknown> | null
  }
}

export function StepGoldenRules({ audit }: StepGoldenRulesProps) {
  const [rules, setRules] = useState<Record<string, boolean>>(
    (audit.goldenRules as Record<string, boolean>) || {}
  )

  const handleToggle = (key: string) => {
    const newValue = !rules[key]
    setRules((prev) => ({ ...prev, [key]: newValue }))
    updateGoldenRules(audit.id, key, newValue)
  }

  const checkedCount = Object.values(rules).filter(Boolean).length

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-3">
          <Award className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Golden Rules</h2>
        <p className="text-gray-500 text-sm">Cochez les règles respectées</p>
      </div>

      {/* Score */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Score</span>
          <span className="text-2xl font-bold text-blue-600">
            {checkedCount} / {GOLDEN_RULES_LIST.length}
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(checkedCount / GOLDEN_RULES_LIST.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Liste des règles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {GOLDEN_RULES_LIST.map((rule, index) => (
          <button
            key={rule.key}
            type="button"
            onClick={() => handleToggle(rule.key)}
            className={cn(
              'w-full flex items-center gap-4 p-4 text-left transition-colors',
              index !== GOLDEN_RULES_LIST.length - 1 && 'border-b border-gray-100',
              rules[rule.key] ? 'bg-green-50' : 'hover:bg-gray-50'
            )}
          >
            <div
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                rules[rule.key]
                  ? 'bg-green-500 text-white'
                  : 'border-2 border-gray-300'
              )}
            >
              {rules[rule.key] && <Check className="w-4 h-4" />}
            </div>
            <span
              className={cn(
                'font-medium',
                rules[rule.key] ? 'text-green-700' : 'text-gray-700'
              )}
            >
              {rule.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
