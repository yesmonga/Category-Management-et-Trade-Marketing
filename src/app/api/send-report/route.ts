import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'
import { renderToBuffer } from '@react-pdf/renderer'
import { AuditDocument } from '@/components/pdf/AuditDocument'
import {
  CRITERIA_SEEIT,
  CRITERIA_FINDIT,
  CRITERIA_CHOOSEIT,
  CRITERIA_BUYIT,
  GOLDEN_RULES_LIST,
  BARRIERS_LIST,
} from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { auditId } = await request.json()

    if (!auditId) {
      return NextResponse.json({ error: 'Missing auditId' }, { status: 400 })
    }

    const audit = await prisma.audit.findUnique({
      where: { id: auditId },
      include: {
        seeIt: true,
        findIt: true,
        chooseIt: true,
        buyIt: true,
        goldenRules: true,
      },
    })

    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    }

    const seeIt = audit.seeIt || {}
    const findIt = audit.findIt || {}
    const chooseIt = audit.chooseIt || {}
    const buyIt = audit.buyIt || {}
    const goldenRulesData = audit.goldenRules || {}

    const seeItCriteria = CRITERIA_SEEIT.map((c) => ({
      label: c.label,
      eval: (seeIt as Record<string, unknown>)[`${c.key}Eval`] as 'OUI' | 'NON' | 'PARTIEL' | null,
      comment: (seeIt as Record<string, unknown>)[`${c.key}Comment`] as string | null,
      photo: (seeIt as Record<string, unknown>)[`${c.key}Photo`] as string | null,
    }))

    const findItCriteria = CRITERIA_FINDIT.map((c) => ({
      label: c.label,
      eval: (findIt as Record<string, unknown>)[`${c.key}Eval`] as 'OUI' | 'NON' | 'PARTIEL' | null,
      comment: (findIt as Record<string, unknown>)[`${c.key}Comment`] as string | null,
      photo: (findIt as Record<string, unknown>)[`${c.key}Photo`] as string | null,
    }))

    const chooseItCriteria = CRITERIA_CHOOSEIT.map((c) => ({
      label: c.label,
      eval: (chooseIt as Record<string, unknown>)[`${c.key}Eval`] as 'OUI' | 'NON' | 'PARTIEL' | null,
      comment: (chooseIt as Record<string, unknown>)[`${c.key}Comment`] as string | null,
      photo: (chooseIt as Record<string, unknown>)[`${c.key}Photo`] as string | null,
    }))

    const buyItCriteria = CRITERIA_BUYIT.map((c) => ({
      label: c.label,
      eval: (buyIt as Record<string, unknown>)[`${c.key}Eval`] as 'OUI' | 'NON' | 'PARTIEL' | null,
      comment: (buyIt as Record<string, unknown>)[`${c.key}Comment`] as string | null,
      photo: (buyIt as Record<string, unknown>)[`${c.key}Photo`] as string | null,
    }))

    const goldenRules = GOLDEN_RULES_LIST.map((r) => ({
      label: r.label,
      checked: !!(goldenRulesData as Record<string, boolean>)[r.key],
    }))

    const barriers = audit.barriers.map((b: string) => {
      const found = BARRIERS_LIST.find((bl) => bl.key === b)
      return found?.label || b
    })

    const pdfBuffer = await renderToBuffer(
      AuditDocument({
        audit: {
          storeName: audit.storeName,
          storeType: audit.storeType,
          auditorName: audit.auditorName,
          categoryAnalyzed: audit.categoryAnalyzed,
          weather: audit.weather,
          createdAt: audit.createdAt,
          mainObservation: audit.mainObservation,
          pharmacistHelped: audit.pharmacistHelped,
        },
        seeItCriteria,
        findItCriteria,
        chooseItCriteria,
        buyItCriteria,
        goldenRules,
        barriers,
      })
    )

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.EMAIL_TO || 'alexfaure252@gmail.com',
      subject: `Rapport d'audit - ${audit.storeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3B82F6;">Nouveau rapport d'audit</h1>
          <p><strong>Point de vente:</strong> ${audit.storeName}</p>
          <p><strong>Type:</strong> ${audit.storeType === 'PHARMACIE' ? 'Pharmacie' : 'GMS'}</p>
          <p><strong>Catégorie:</strong> ${audit.categoryAnalyzed || 'Non spécifiée'}</p>
          <p><strong>Auditeur:</strong> ${audit.auditorName}</p>
          <p><strong>Date:</strong> ${new Date(audit.createdAt).toLocaleDateString('fr-FR')}</p>
          <hr style="border: 1px solid #E5E7EB; margin: 20px 0;">
          <p style="color: #6B7280;">Le rapport PDF complet est en pièce jointe.</p>
        </div>
      `,
      attachments: [
        {
          filename: `audit-${audit.storeName?.replace(/\s+/g, '-')}-${Date.now()}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf',
        },
      ],
    })

    await prisma.audit.update({
      where: { id: auditId },
      data: { emailSent: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending report:', error)
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    )
  }
}
