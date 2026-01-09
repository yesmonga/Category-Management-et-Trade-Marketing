'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ClipboardList } from 'lucide-react'
import { AuditCard } from '@/components/ui/AuditCard'
import { NewAuditModal } from '@/components/NewAuditModal'
import { deleteAudit } from '@/app/actions/audit'
import { cn } from '@/lib/utils'

interface Audit {
  id: string
  status: 'DRAFT' | 'COMPLETED'
  auditorName: string | null
  storeName: string | null
  storeType: 'PHARMACIE' | 'GMS' | null
  currentStep: number
  createdAt: Date
  updatedAt: Date
}

interface DashboardProps {
  audits: Audit[]
}

export function Dashboard({ audits }: DashboardProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'DRAFT' | 'COMPLETED'>('all')

  const filteredAudits = audits.filter((audit) => {
    if (filter === 'all') return true
    return audit.status === filter
  })

  const draftCount = audits.filter((a) => a.status === 'DRAFT').length
  const completedCount = audits.filter((a) => a.status === 'COMPLETED').length

  const handleDelete = async (id: string) => {
    await deleteAudit(id)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CatMan Audit</h1>
              <p className="text-sm text-gray-500">Audits terrain pharmacie & GMS</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center',
                'bg-blue-500 text-white shadow-lg shadow-blue-500/30',
                'hover:bg-blue-600 active:scale-95 transition-all duration-200'
              )}
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Filtres */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Tous', count: audits.length },
              { key: 'DRAFT', label: 'En cours', count: draftCount },
              { key: 'COMPLETED', label: 'Terminés', count: completedCount },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key as typeof filter)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  filter === item.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Liste des audits */}
      <main className="p-4 pb-8">
        {filteredAudits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ClipboardList className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Aucun audit
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Commencez par créer votre premier audit terrain
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl',
                'bg-blue-500 text-white font-semibold',
                'hover:bg-blue-600 active:scale-95 transition-all duration-200',
                'shadow-lg shadow-blue-500/30'
              )}
            >
              <Plus className="w-5 h-5" />
              Nouvel Audit
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAudits.map((audit) => (
              <AuditCard key={audit.id} audit={audit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {/* Modal nouveau audit */}
      <NewAuditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
