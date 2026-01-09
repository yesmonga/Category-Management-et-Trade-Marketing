'use client'

import { CriterionCard } from '@/components/wizard/CriterionCard'
import { updateSeeItSection } from '@/app/actions/audit'
import { CRITERIA_SEEIT } from '@/lib/types'
import { Eye } from 'lucide-react'

interface StepSeeItProps {
  audit: {
    id: string
    seeIt: Record<string, unknown> | null
  }
}

type EvaluationValue = 'OUI' | 'NON' | 'PARTIEL' | null

export function StepSeeIt({ audit }: StepSeeItProps) {
  const seeIt = audit.seeIt || {}

  const handleEvalChange = (key: string, value: EvaluationValue) => {
    updateSeeItSection(audit.id, `${key}Eval`, value)
  }

  const handleCommentChange = (key: string, value: string) => {
    updateSeeItSection(audit.id, `${key}Comment`, value)
  }

  const handlePhotoChange = (key: string, url: string | null) => {
    updateSeeItSection(audit.id, `${key}Photo`, url)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-3">
          <Eye className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">SEE IT</h2>
        <p className="text-gray-500 text-sm">Visibilité à distance</p>
      </div>

      {CRITERIA_SEEIT.map((criterion) => (
        <CriterionCard
          key={criterion.key}
          label={criterion.label}
          question={criterion.question}
          evalValue={(seeIt[`${criterion.key}Eval`] as EvaluationValue) || null}
          comment={(seeIt[`${criterion.key}Comment`] as string) || null}
          photo={(seeIt[`${criterion.key}Photo`] as string) || null}
          onEvalChange={(value) => handleEvalChange(criterion.key, value)}
          onCommentChange={(value) => handleCommentChange(criterion.key, value)}
          onPhotoChange={(url) => handlePhotoChange(criterion.key, url)}
        />
      ))}
    </div>
  )
}
