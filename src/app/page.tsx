import { getAudits, deleteAudit } from '@/app/actions/audit'
import { Dashboard } from '@/components/Dashboard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const audits = await getAudits()

  return <Dashboard audits={audits} />
}
