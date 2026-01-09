'use client'

import { CriterionCard } from '@/components/wizard/CriterionCard'
import { updateBuyItSection } from '@/app/actions/audit'
import { CRITERIA_BUYIT } from '@/lib/types'
import { ShoppingCart } from 'lucide-react'

interface StepBuyItProps {
  audit: {
    id: string
    buyIt: Record<string, unknown> | null
  }
}

type EvaluationValue = 'OUI' | 'NON' | 'PARTIEL' | null

export function StepBuyIt({ audit }: StepBuyItProps) {
  const buyIt = audit.buyIt || {}

  const handleEvalChange = (key: string, value: EvaluationValue) => {
    updateBuyItSection(audit.id, `${key}Eval`, value)
  }

  const handleCommentChange = (key: string, value: string) => {
    updateBuyItSection(audit.id, `${key}Comment`, value)
  }

  const handlePhotoChange = (key: string, url: string | null) => {
    updateBuyItSection(audit.id, `${key}Photo`, url)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
          <ShoppingCart className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">BUY IT</h2>
        <p className="text-gray-500 text-sm">Conversion à l'achat</p>
      </div>

      {CRITERIA_BUYIT.map((criterion) => (
        <CriterionCard
          key={criterion.key}
          label={criterion.label}
          question={criterion.question}
          hint={criterion.hint}
          evalValue={(buyIt[`${criterion.key}Eval`] as EvaluationValue) || null}
          comment={(buyIt[`${criterion.key}Comment`] as string) || null}
          photo={(buyIt[`${criterion.key}Photo`] as string) || null}
          onEvalChange={(value) => handleEvalChange(criterion.key, value)}
          onCommentChange={(value) => handleCommentChange(criterion.key, value)}
          onPhotoChange={(url) => handlePhotoChange(criterion.key, url)}
        />
      ))}
    </div>
  )
}
