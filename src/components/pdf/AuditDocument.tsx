import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  label: {
    fontSize: 10,
    color: '#374151',
    flex: 1,
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
  },
  valueOui: {
    color: '#16A34A',
  },
  valueNon: {
    color: '#DC2626',
  },
  valuePartiel: {
    color: '#EA580C',
  },
  comment: {
    fontSize: 9,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 2,
  },
  photo: {
    width: 150,
    height: 100,
    objectFit: 'cover',
    marginTop: 5,
    borderRadius: 4,
  },
  scoreBox: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  scoreTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  goldenRulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  goldenRuleItem: {
    fontSize: 9,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  goldenRuleChecked: {
    backgroundColor: '#DCFCE7',
    color: '#16A34A',
  },
  goldenRuleUnchecked: {
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
  },
  observation: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
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

function CriterionRow({ criterion }: { criterion: CriterionData }) {
  const getValueStyle = () => {
    switch (criterion.eval) {
      case 'OUI':
        return [styles.value, styles.valueOui]
      case 'NON':
        return [styles.value, styles.valueNon]
      case 'PARTIEL':
        return [styles.value, styles.valuePartiel]
      default:
        return styles.value
    }
  }

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>{criterion.label}</Text>
        <Text style={getValueStyle()}>{criterion.eval || '-'}</Text>
      </View>
      {criterion.comment && (
        <Text style={styles.comment}>{criterion.comment}</Text>
      )}
      {criterion.photo && (
        <Image src={criterion.photo} style={styles.photo} />
      )}
    </View>
  )
}

function SectionScore({ 
  criteria, 
  title 
}: { 
  criteria: CriterionData[]
  title: string 
}) {
  const ouiCount = criteria.filter((c) => c.eval === 'OUI').length
  const total = criteria.length
  
  return (
    <View style={styles.scoreBox}>
      <Text style={styles.scoreTitle}>{title}</Text>
      <Text style={styles.scoreValue}>{ouiCount}/{total}</Text>
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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const goldenRulesScore = goldenRules.filter((r) => r.checked).length

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{audit.storeName}</Text>
          <Text style={styles.subtitle}>
            {audit.storeType === 'PHARMACIE' ? 'Pharmacie' : 'GMS'} • {audit.categoryAnalyzed}
          </Text>
          <Text style={styles.subtitle}>
            Auditeur: {audit.auditorName} • {formatDate(audit.createdAt)}
          </Text>
          {audit.weather && (
            <Text style={styles.subtitle}>Météo du rayon: {audit.weather}</Text>
          )}
        </View>

        {/* Scores Summary */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <SectionScore criteria={seeItCriteria} title="See It" />
          <SectionScore criteria={findItCriteria} title="Find It" />
          <SectionScore criteria={chooseItCriteria} title="Choose It" />
          <SectionScore criteria={buyItCriteria} title="Buy It" />
        </View>

        {/* See It Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SEE IT - Visibilité</Text>
          {seeItCriteria.map((c, i) => (
            <CriterionRow key={i} criterion={c} />
          ))}
        </View>

        {/* Find It Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FIND IT - Navigation</Text>
          {findItCriteria.map((c, i) => (
            <CriterionRow key={i} criterion={c} />
          ))}
        </View>

        {/* Choose It Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CHOOSE IT - Décision</Text>
          {chooseItCriteria.map((c, i) => (
            <CriterionRow key={i} criterion={c} />
          ))}
        </View>

        {/* Buy It Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BUY IT - Conversion</Text>
          {buyItCriteria.map((c, i) => (
            <CriterionRow key={i} criterion={c} />
          ))}
        </View>

        {/* Golden Rules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Golden Rules ({goldenRulesScore}/{goldenRules.length})
          </Text>
          <View style={styles.goldenRulesGrid}>
            {goldenRules.map((rule, i) => (
              <Text
                key={i}
                style={[
                  styles.goldenRuleItem,
                  rule.checked
                    ? styles.goldenRuleChecked
                    : styles.goldenRuleUnchecked,
                ]}
              >
                {rule.checked ? '✓ ' : '○ '}{rule.label}
              </Text>
            ))}
          </View>
        </View>

        {/* Barriers */}
        {barriers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Barrières identifiées</Text>
            <View style={styles.goldenRulesGrid}>
              {barriers.map((barrier, i) => (
                <Text
                  key={i}
                  style={[styles.goldenRuleItem, { backgroundColor: '#FEE2E2', color: '#DC2626' }]}
                >
                  {barrier}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Pharmacist helped */}
        {audit.storeType === 'PHARMACIE' && audit.pharmacistHelped !== null && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conseil Pharmacien</Text>
            <Text style={styles.label}>
              Le pharmacien a-t-il aidé ? {audit.pharmacistHelped ? 'Oui' : 'Non'}
            </Text>
          </View>
        )}

        {/* Main Observation */}
        {audit.mainObservation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observation principale</Text>
            <Text style={styles.observation}>{audit.mainObservation}</Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Rapport généré par CatMan Audit • {formatDate(new Date())}
        </Text>
      </Page>
    </Document>
  )
}
