import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'

const colors = {
  darkBlue: '#1E3A5F',
  blue: '#3B82F6',
  green: '#16A34A',
  red: '#DC2626',
  orange: '#EA580C',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.darkBlue,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 9,
    color: '#94A3B8',
  },
  headerScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerScoreLabel: {
    fontSize: 8,
    color: '#94A3B8',
  },
  scorecardsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  scorecard: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  scorecardTitle: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  scorecardValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreGreen: { color: colors.green },
  scoreOrange: { color: colors.orange },
  scoreRed: { color: colors.red },
  mainGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  column: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  columnHeader: {
    backgroundColor: colors.blue,
    padding: 6,
  },
  columnTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  columnContent: {
    padding: 6,
  },
  criterionRow: {
    marginBottom: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  criterionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  criterionLabel: {
    fontSize: 7,
    color: '#374151',
    flex: 1,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 6,
    fontWeight: 'bold',
  },
  badgeOui: {
    backgroundColor: '#DCFCE7',
    color: colors.green,
  },
  badgeNon: {
    backgroundColor: '#FEE2E2',
    color: colors.red,
  },
  badgePartiel: {
    backgroundColor: '#FEF3C7',
    color: colors.orange,
  },
  badgeEmpty: {
    backgroundColor: colors.lightGray,
    color: colors.gray,
  },
  criterionComment: {
    fontSize: 6,
    color: colors.gray,
    fontStyle: 'italic',
    marginTop: 2,
  },
  criterionPhoto: {
    width: 40,
    height: 40,
    marginTop: 3,
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
  },
  footerSection: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 8,
  },
  footerTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.darkBlue,
    marginBottom: 6,
  },
  goldenRulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  goldenRuleItem: {
    fontSize: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  goldenRuleChecked: {
    backgroundColor: '#DCFCE7',
    color: colors.green,
  },
  goldenRuleUnchecked: {
    backgroundColor: colors.lightGray,
    color: '#9CA3AF',
  },
  barrierItem: {
    fontSize: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    backgroundColor: '#FEE2E2',
    color: colors.red,
  },
  observationText: {
    fontSize: 7,
    color: '#374151',
    lineHeight: 1.4,
  },
  pageFooter: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 6,
    color: '#9CA3AF',
  },
})

interface CriterionData {
  label: string
  eval: 'OUI' | 'NON' | 'PARTIEL' | null
  comment?: string | null
  photo?: string | null
}

interface AuditDocumentProps {
  audit: {
    storeName: string | null
    storeType: 'PHARMACIE' | 'GMS' | null
    auditorName: string | null
    categoryAnalyzed: string | null
    weather: string | null
    createdAt: Date
    mainObservation: string | null
    pharmacistHelped: boolean | null
  }
  seeItCriteria: CriterionData[]
  findItCriteria: CriterionData[]
  chooseItCriteria: CriterionData[]
  buyItCriteria: CriterionData[]
  goldenRules: { label: string; checked: boolean }[]
  barriers: string[]
}

function getBadgeStyle(evalValue: 'OUI' | 'NON' | 'PARTIEL' | null) {
  switch (evalValue) {
    case 'OUI': return [styles.badge, styles.badgeOui]
    case 'NON': return [styles.badge, styles.badgeNon]
    case 'PARTIEL': return [styles.badge, styles.badgePartiel]
    default: return [styles.badge, styles.badgeEmpty]
  }
}

function getScoreColor(score: number, total: number) {
  const ratio = score / total
  if (ratio >= 0.8) return styles.scoreGreen
  if (ratio >= 0.4) return styles.scoreOrange
  return styles.scoreRed
}

function CriterionItem({ criterion }: { criterion: CriterionData }) {
  return (
    <View style={styles.criterionRow}>
      <View style={styles.criterionHeader}>
        <Text style={styles.criterionLabel}>{criterion.label}</Text>
        <Text style={getBadgeStyle(criterion.eval)}>
          {criterion.eval || '-'}
        </Text>
      </View>
      {criterion.comment && (
        <Text style={styles.criterionComment}>{criterion.comment}</Text>
      )}
      {criterion.photo && (
        <Image src={criterion.photo} style={styles.criterionPhoto} />
      )}
    </View>
  )
}

function SectionColumn({ 
  title, 
  criteria,
  color 
}: { 
  title: string
  criteria: CriterionData[]
  color: string
}) {
  return (
    <View style={styles.column}>
      <View style={[styles.columnHeader, { backgroundColor: color }]}>
        <Text style={styles.columnTitle}>{title}</Text>
      </View>
      <View style={styles.columnContent}>
        {criteria.map((c, i) => (
          <CriterionItem key={i} criterion={c} />
        ))}
      </View>
    </View>
  )
}

function Scorecard({ 
  title, 
  criteria 
}: { 
  title: string
  criteria: CriterionData[]
}) {
  const score = criteria.filter((c) => c.eval === 'OUI').length
  const total = criteria.length
  
  return (
    <View style={styles.scorecard}>
      <Text style={styles.scorecardTitle}>{title}</Text>
      <Text style={[styles.scorecardValue, getScoreColor(score, total)]}>
        {score}/{total}
      </Text>
    </View>
  )
}

export function AuditDocument({
  audit,
  seeItCriteria,
  findItCriteria,
  chooseItCriteria,
  buyItCriteria,
  goldenRules,
  barriers,
}: AuditDocumentProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date))
  }

  const allCriteria = [...seeItCriteria, ...findItCriteria, ...chooseItCriteria, ...buyItCriteria]
  const totalScore = allCriteria.filter((c) => c.eval === 'OUI').length
  const totalMax = allCriteria.length
  const goldenRulesScore = goldenRules.filter((r) => r.checked).length

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>AUDIT SHOPPER REPORT</Text>
            <Text style={styles.headerSubtitle}>
              {audit.storeName} • {audit.storeType === 'PHARMACIE' ? 'Pharmacie' : 'GMS'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {audit.categoryAnalyzed} • {formatDate(audit.createdAt)}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerScore}>{totalScore}/{totalMax}</Text>
            <Text style={styles.headerScoreLabel}>SCORE GLOBAL</Text>
            <Text style={styles.headerSubtitle}>Auditeur: {audit.auditorName}</Text>
          </View>
        </View>

        {/* Scorecards Row */}
        <View style={styles.scorecardsRow}>
          <Scorecard title="SEE IT" criteria={seeItCriteria} />
          <Scorecard title="FIND IT" criteria={findItCriteria} />
          <Scorecard title="CHOOSE IT" criteria={chooseItCriteria} />
          <Scorecard title="BUY IT" criteria={buyItCriteria} />
        </View>

        {/* Main Grid - 4 columns */}
        <View style={styles.mainGrid}>
          <SectionColumn title="SEE IT" criteria={seeItCriteria} color="#8B5CF6" />
          <SectionColumn title="FIND IT" criteria={findItCriteria} color="#3B82F6" />
          <SectionColumn title="CHOOSE IT" criteria={chooseItCriteria} color="#F59E0B" />
          <SectionColumn title="BUY IT" criteria={buyItCriteria} color="#10B981" />
        </View>

        {/* Footer - Golden Rules + Barriers + Observation */}
        <View style={styles.footer}>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>
              Golden Rules ({goldenRulesScore}/{goldenRules.length})
            </Text>
            <View style={styles.goldenRulesGrid}>
              {goldenRules.map((rule, i) => (
                <Text
                  key={i}
                  style={[
                    styles.goldenRuleItem,
                    rule.checked ? styles.goldenRuleChecked : styles.goldenRuleUnchecked,
                  ]}
                >
                  {rule.checked ? '✓' : '○'} {rule.label}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Barrières & Expertise</Text>
            {barriers.length > 0 ? (
              <View style={styles.goldenRulesGrid}>
                {barriers.map((barrier, i) => (
                  <Text key={i} style={styles.barrierItem}>{barrier}</Text>
                ))}
              </View>
            ) : (
              <Text style={styles.observationText}>Aucune barrière identifiée</Text>
            )}
            {audit.storeType === 'PHARMACIE' && audit.pharmacistHelped !== null && (
              <Text style={[styles.observationText, { marginTop: 4 }]}>
                Pharmacien: {audit.pharmacistHelped ? 'A conseillé' : 'N\'a pas conseillé'}
              </Text>
            )}
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Observation</Text>
            <Text style={styles.observationText}>
              {audit.mainObservation || 'Aucune observation'}
            </Text>
          </View>
        </View>

        {/* Page Footer */}
        <Text style={styles.pageFooter}>
          CatMan Audit • {formatDate(new Date())}
        </Text>
      </Page>
    </Document>
  )
}
