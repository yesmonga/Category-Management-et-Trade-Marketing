'use client'

import { useState, useCallback } from 'react'
import { EvaluationButtons } from '@/components/ui/EvaluationButtons'
import { CommentInput } from '@/components/ui/CommentInput'
import { PhotoUploader } from '@/components/ui/PhotoUploader'
import { debounce } from '@/lib/utils'

type EvaluationValue = 'OUI' | 'NON' | 'PARTIEL' | null

interface CriterionCardProps {
  label: string
  question: string
  evalValue: EvaluationValue
  comment: string | null
  photo: string | null
  onEvalChange: (value: EvaluationValue) => void
  onCommentChange: (value: string) => void
  onPhotoChange: (url: string | null) => void
}

export function CriterionCard({
  label,
  question,
  evalValue,
  comment,
  photo,
  onEvalChange,
  onCommentChange,
  onPhotoChange,
}: CriterionCardProps) {
  const [localComment, setLocalComment] = useState(comment || '')

  const debouncedCommentChange = useCallback(
    debounce((value: string) => {
      onCommentChange(value)
    }, 500),
    [onCommentChange]
  )

  const handleCommentChange = (value: string) => {
    setLocalComment(value)
    debouncedCommentChange(value)
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-base mb-1">{label}</h3>
        <p className="text-sm text-gray-500">{question}</p>
      </div>

      <div className="space-y-4">
        <EvaluationButtons value={evalValue} onChange={onEvalChange} />
        <CommentInput value={localComment} onChange={handleCommentChange} />
        <PhotoUploader value={photo} onChange={onPhotoChange} />
      </div>
    </div>
  )
}
