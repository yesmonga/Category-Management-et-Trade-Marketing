'use client'

import { CriterionCard } from '@/components/wizard/CriterionCard'
import { updateFindItSection } from '@/app/actions/audit'
import { CRITERIA_FINDIT } from '@/lib/types'
import { Search } from 'lucide-react'

interface StepFindItProps {
  audit: {
    id: string
    findIt: Record<string, unknown> | null
  }
}

type EvaluationValue = 'OUI' | 'NON' | 'PARTIEL' | null

export function StepFindIt({ audit }: StepFindItProps) {
  const findIt = audit.findIt || {}

  const handleEvalChange = (key: string, value: EvaluationValue) => {
    updateFindItSection(audit.id, `${key}Eval`, value)
  }

  const handleCommentChange = (key: string, value: string) => {
    updateFindItSection(audit.id, `${key}Comment`, value)
  }

  const handlePhotoChange = (key: string, url: string | null) => {
    updateFindItSection(audit.id, `${key}Photo`, url)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
          <Search className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">FIND IT</h2>
        <p className="text-gray-500 text-sm">Navigation & Repérage</p>
      </div>

      {CRITERIA_FINDIT.map((criterion) => (
        <CriterionCard
          key={criterion.key}
          label={criterion.label}
          question={criterion.question}
          evalValue={(findIt[`${criterion.key}Eval`] as EvaluationValue) || null}
          comment={(findIt[`${criterion.key}Comment`] as string) || null}
          photo={(findIt[`${criterion.key}Photo`] as string) || null}
          onEvalChange={(value) => handleEvalChange(criterion.key, value)}
          onCommentChange={(value) => handleCommentChange(criterion.key, value)}
          onPhotoChange={(url) => handlePhotoChange(criterion.key, url)}
        />
      ))}
    </div>
  )
}
