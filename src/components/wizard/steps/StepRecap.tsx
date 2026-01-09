'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  FileText, 
  Mail, 
  Share2, 
  Check, 
  X, 
  Minus,
  Loader2,
  CheckCircle
} from 'lucide-react'
import {
  CRITERIA_SEEIT,
  CRITERIA_FINDIT,
  CRITERIA_CHOOSEIT,
  CRITERIA_BUYIT,
  GOLDEN_RULES_LIST,
} from '@/lib/types'

interface StepRecapProps {
  audit: {
    id: string
    storeName: string | null
    storeType: 'PHARMACIE' | 'GMS' | null
    categoryAnalyzed: string | null
    seeIt: Record<string, unknown> | null
    findIt: Record<string, unknown> | null
    chooseIt: Record<string, unknown> | null
    buyIt: Record<string, unknown> | null
    goldenRules: Record<string, unknown> | null
    mainObservation: string | null
  }
}

type EvalValue = 'OUI' | 'NON' | 'PARTIEL' | null

function EvalBadge({ value }: { value: EvalValue }) {
  if (!value) return <span className="text-gray-400 text-sm">-</span>
  
  const config = {
    OUI: { icon: Check, bg: 'bg-green-100', text: 'text-green-600' },
    NON: { icon: X, bg: 'bg-red-100', text: 'text-red-600' },
    PARTIEL: { icon: Minus, bg: 'bg-orange-100', text: 'text-orange-600' },
  }
  
  const { icon: Icon, bg, text } = config[value]
  return (
    <span className={cn('inline-flex items-center justify-center w-6 h-6 rounded-full', bg, text)}>
      <Icon className="w-4 h-4" />
    </span>
  )
}

function SectionSummary({ 
  title, 
  criteria, 
  data 
}: { 
  title: string
  criteria: readonly { key: string; label: string }[]
  data: Record<string, unknown> | null 
}) {
  const safeData = data || {}
  const scores = criteria.map((c) => safeData[`${c.key}Eval`] as EvalValue)
  const ouiCount = scores.filter((s) => s === 'OUI').length
  const total = criteria.length

  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
        <span className={cn(
          'text-sm font-bold',
          ouiCount === total ? 'text-green-600' : ouiCount >= total / 2 ? 'text-orange-600' : 'text-red-600'
        )}>
          {ouiCount}/{total}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {criteria.map((c) => (
          <EvalBadge key={c.key} value={safeData[`${c.key}Eval`] as EvalValue} />
        ))}
      </div>
    </div>
  )
}

export function StepRecap({ audit }: StepRecapProps) {
  const router = useRouter()
  const [isSending, setIsSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSendEmail = async () => {
    setIsSending(true)
    try {
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId: audit.id }),
      })
      if (response.ok) {
        setEmailSent(true)
      }
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Audit - ${audit.storeName}`,
          text: `Rapport d'audit pour ${audit.storeName} - ${audit.categoryAnalyzed}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    }
  }

  const goldenRulesData = (audit.goldenRules as Record<string, boolean>) || {}
  const goldenRulesCount = Object.values(goldenRulesData).filter(Boolean).length

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
          <FileText className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Récapitulatif</h2>
        <p className="text-gray-500 text-sm">Synthèse de votre audit</p>
      </div>

      {/* Info magasin */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
        <h3 className="font-bold text-lg">{audit.storeName}</h3>
        <p className="text-blue-100">
          {audit.storeType === 'PHARMACIE' ? 'Pharmacie' : 'GMS'} • {audit.categoryAnalyzed}
        </p>
      </div>

      {/* Scores par section */}
      <div className="grid grid-cols-2 gap-3">
        <SectionSummary title="See It" criteria={CRITERIA_SEEIT} data={audit.seeIt} />
        <SectionSummary title="Find It" criteria={CRITERIA_FINDIT} data={audit.findIt} />
        <SectionSummary title="Choose It" criteria={CRITERIA_CHOOSEIT} data={audit.chooseIt} />
        <SectionSummary title="Buy It" criteria={CRITERIA_BUYIT} data={audit.buyIt} />
      </div>

      {/* Golden Rules Score */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900">Golden Rules</h4>
          <span className="text-2xl font-bold text-yellow-600">
            {goldenRulesCount}/{GOLDEN_RULES_LIST.length}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 rounded-full"
            style={{ width: `${(goldenRulesCount / GOLDEN_RULES_LIST.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Observation */}
      {audit.mainObservation && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-2">Observation principale</h4>
          <p className="text-gray-600 text-sm">{audit.mainObservation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3 pt-4">
        <button
          onClick={handleSendEmail}
          disabled={isSending || emailSent}
          className={cn(
            'w-full flex items-center justify-center gap-2',
            'py-4 px-6 rounded-xl font-semibold',
            'transition-all duration-200',
            emailSent
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30'
          )}
        >
          {isSending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : emailSent ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Email envoyé !
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              Envoyer le rapport par email
            </>
          )}
        </button>

        {typeof window !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleShare}
            className={cn(
              'w-full flex items-center justify-center gap-2',
              'py-4 px-6 rounded-xl font-semibold',
              'bg-gray-100 text-gray-700 hover:bg-gray-200',
              'transition-all duration-200'
            )}
          >
            <Share2 className="w-5 h-5" />
            Partager
          </button>
        )}
      </div>
    </div>
  )
}
