'use client'

import { cn } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'

interface CommentInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function CommentInput({ value, onChange, placeholder = 'Ajouter un commentaire...', disabled }: CommentInputProps) {
  return (
    <div className="relative">
      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={2}
        className={cn(
          'w-full pl-10 pr-4 py-3 rounded-xl',
          'bg-white border border-gray-200',
          'text-gray-900 placeholder:text-gray-400',
          'text-sm resize-none',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-all duration-200',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50'
        )}
      />
    </div>
  )
}
