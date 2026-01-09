'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WIZARD_STEPS } from '@/lib/types'

interface WizardLayoutProps {
  currentStep: number
  onPrevious: () => void
  onNext: () => void
  canGoNext?: boolean
  isLastStep?: boolean
  children: React.ReactNode
}

export function WizardLayout({
  currentStep,
  onPrevious,
  onNext,
  canGoNext = true,
  isLastStep = false,
  children,
}: WizardLayoutProps) {
  const progress = ((currentStep + 1) / WIZARD_STEPS.length) * 100

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      {/* Header avec progression */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Étape {currentStep + 1} / {WIZARD_STEPS.length}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {WIZARD_STEPS[currentStep]?.name}
            </span>
          </div>
          
          {/* Barre de progression segmentée */}
          <div className="flex gap-1">
            {WIZARD_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  'h-1 flex-1 rounded-full transition-all duration-300',
                  index < currentStep
                    ? 'bg-blue-500'
                    : index === currentStep
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                )}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto pb-40">
        <div className="p-4">
          {children}
        </div>
      </main>

      {/* Navigation sticky en bas */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8">
        <div className="flex gap-3">
          <button
            onClick={onPrevious}
            disabled={currentStep === 0}
            className={cn(
              'flex-1 flex items-center justify-center gap-2',
              'py-4 px-6 rounded-xl font-semibold text-base',
              'transition-all duration-200 active:scale-95',
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </button>

          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={cn(
              'flex-1 flex items-center justify-center gap-2',
              'py-4 px-6 rounded-xl font-semibold text-base',
              'transition-all duration-200 active:scale-95',
              !canGoNext
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30'
            )}
          >
            {isLastStep ? 'Terminer' : 'Suivant'}
            {!isLastStep && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </nav>
    </div>
  )
}
