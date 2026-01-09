'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { WizardLayout } from '@/components/ui/WizardLayout'
import { StepInfo } from '@/components/wizard/steps/StepInfo'
import { StepSeeIt } from '@/components/wizard/steps/StepSeeIt'
import { StepFindIt } from '@/components/wizard/steps/StepFindIt'
import { StepChooseIt } from '@/components/wizard/steps/StepChooseIt'
import { StepBuyIt } from '@/components/wizard/steps/StepBuyIt'
import { StepGoldenRules } from '@/components/wizard/steps/StepGoldenRules'
import { StepExpertise } from '@/components/wizard/steps/StepExpertise'
import { StepRecap } from '@/components/wizard/steps/StepRecap'
import { updateAuditStep, completeAudit } from '@/app/actions/audit'
import { WIZARD_STEPS } from '@/lib/types'

interface AuditWizardProps {
  audit: {
    id: string
    currentStep: number
    auditorName: string | null
    storeName: string | null
    storeType: 'PHARMACIE' | 'GMS' | null
    categoryAnalyzed: string | null
    weather: 'CALME' | 'AFFLUENTE' | 'SATUREE' | null
    barriers: string[]
    mainObservation: string | null
    pharmacistHelped: boolean | null
    seeIt: Record<string, unknown> | null
    findIt: Record<string, unknown> | null
    chooseIt: Record<string, unknown> | null
    buyIt: Record<string, unknown> | null
    goldenRules: Record<string, unknown> | null
  }
}

export function AuditWizard({ audit }: AuditWizardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [currentStep, setCurrentStep] = useState(audit.currentStep)

  const handlePrevious = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      startTransition(async () => {
        await updateAuditStep(audit.id, newStep)
      })
    }
  }

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      startTransition(async () => {
        await updateAuditStep(audit.id, newStep)
      })
    } else {
      startTransition(async () => {
        await completeAudit(audit.id)
        router.push('/')
      })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepInfo audit={audit} />
      case 1:
        return <StepSeeIt audit={audit} />
      case 2:
        return <StepFindIt audit={audit} />
      case 3:
        return <StepChooseIt audit={audit} />
      case 4:
        return <StepBuyIt audit={audit} />
      case 5:
        return <StepGoldenRules audit={audit} />
      case 6:
        return <StepExpertise audit={audit} />
      case 7:
        return <StepRecap audit={audit} />
      default:
        return null
    }
  }

  return (
    <WizardLayout
      currentStep={currentStep}
      onPrevious={handlePrevious}
      onNext={handleNext}
      isLastStep={currentStep === WIZARD_STEPS.length - 1}
    >
      {renderStep()}
    </WizardLayout>
  )
}
