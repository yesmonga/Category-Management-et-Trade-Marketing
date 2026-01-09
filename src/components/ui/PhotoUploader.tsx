'use client'

import { useState, useRef } from 'react'
import { Camera, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface PhotoUploaderProps {
  value: string | null
  onChange: (url: string | null) => void
  disabled?: boolean
}

export function PhotoUploader({ value, onChange, disabled }: PhotoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        onChange(data.url)
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange(null)
  }

  if (value) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={value}
          alt="Photo uploadée"
          fill
          className="object-cover"
        />
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          className={cn(
            'absolute top-2 right-2 p-2 rounded-full',
            'bg-black/50 text-white backdrop-blur-sm',
            'hover:bg-black/70 transition-colors',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
        id="photo-input"
      />
      <label
        htmlFor="photo-input"
        className={cn(
          'flex items-center justify-center gap-2',
          'w-full py-3 px-4 rounded-xl',
          'border-2 border-dashed border-gray-300',
          'text-gray-500 font-medium text-sm',
          'cursor-pointer transition-all duration-200',
          'hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50',
          (disabled || isUploading) && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Upload en cours...</span>
          </>
        ) : (
          <>
            <Camera className="w-5 h-5" />
            <span>Ajouter une photo</span>
          </>
        )}
      </label>
    </div>
  )
}
