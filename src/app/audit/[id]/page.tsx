import { notFound } from 'next/navigation'
import { getAuditById } from '@/app/actions/audit'
import { AuditWizard } from '@/components/wizard/AuditWizard'

interface AuditPageProps {
  params: Promise<{ id: string }>
}

export default async function AuditPage({ params }: AuditPageProps) {
  const { id } = await params
  const audit = await getAuditById(id)

  if (!audit) {
    notFound()
  }

  return <AuditWizard audit={audit} />
}
