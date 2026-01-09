'use client'

import { CriterionCard } from '@/components/wizard/CriterionCard'
import { updateChooseItSection } from '@/app/actions/audit'
import { CRITERIA_CHOOSEIT } from '@/lib/types'
import { MousePointerClick } from 'lucide-react'

interface StepChooseItProps {
  audit: {
    id: string
    chooseIt: Record<string, unknown> | null
  }
}

type EvaluationValue = 'OUI' | 'NON' | 'PARTIEL' | null

export function StepChooseIt({ audit }: StepChooseItProps) {
  const chooseIt = audit.chooseIt || {}

  const handleEvalChange = (key: string, value: EvaluationValue) => {
    updateChooseItSection(audit.id, `${key}Eval`, value)
  }

  const handleCommentChange = (key: string, value: string) => {
    updateChooseItSection(audit.id, `${key}Comment`, value)
  }

  const handlePhotoChange = (key: string, url: string | null) => {
    updateChooseItSection(audit.id, `${key}Photo`, url)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-3">
          <MousePointerClick className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">CHOOSE IT</h2>
        <p className="text-gray-500 text-sm">Aide à la décision</p>
      </div>

      {CRITERIA_CHOOSEIT.map((criterion) => (
        <CriterionCard
          key={criterion.key}
          label={criterion.label}
          question={criterion.question}
          evalValue={(chooseIt[`${criterion.key}Eval`] as EvaluationValue) || null}
          comment={(chooseIt[`${criterion.key}Comment`] as string) || null}
          photo={(chooseIt[`${criterion.key}Photo`] as string) || null}
          onEvalChange={(value) => handleEvalChange(criterion.key, value)}
          onCommentChange={(value) => handleCommentChange(criterion.key, value)}
          onPhotoChange={(url) => handlePhotoChange(criterion.key, url)}
        />
      ))}
    </div>
  )
}
