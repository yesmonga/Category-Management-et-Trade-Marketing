'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { AuditStatus, StoreType, WeatherType, Evaluation, Barrier } from '@prisma/client'

// ==================== CREATE AUDIT ====================

export async function createAudit(data: {
  auditorName: string
  storeName: string
  storeType: StoreType
}) {
  const audit = await prisma.audit.create({
    data: {
      auditorName: data.auditorName,
      storeName: data.storeName,
      storeType: data.storeType,
      status: 'DRAFT',
      currentStep: 0,
      seeIt: { create: {} },
      findIt: { create: {} },
      chooseIt: { create: {} },
      buyIt: { create: {} },
      goldenRules: { create: {} },
    },
  })

  revalidatePath('/')
  return audit.id
}

// ==================== GET AUDITS ====================

export async function getAudits() {
  return prisma.audit.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      status: true,
      auditorName: true,
      storeName: true,
      storeType: true,
      currentStep: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getAuditById(id: string) {
  return prisma.audit.findUnique({
    where: { id },
    include: {
      seeIt: true,
      findIt: true,
      chooseIt: true,
      buyIt: true,
      goldenRules: true,
    },
  })
}

// ==================== UPDATE AUDIT STEP ====================

export async function updateAuditStep(
  id: string,
  step: number
) {
  await prisma.audit.update({
    where: { id },
    data: { currentStep: step },
  })
}

// ==================== UPDATE AUDIT INFO ====================

export async function updateAuditInfo(
  id: string,
  data: {
    auditorName?: string
    storeName?: string
    storeType?: StoreType
    categoryAnalyzed?: string
    weather?: WeatherType
  }
) {
  await prisma.audit.update({
    where: { id },
    data,
  })
  revalidatePath(`/audit/${id}`)
}

// ==================== UPDATE SEE IT SECTION ====================

export async function updateSeeItSection(
  auditId: string,
  field: string,
  value: Evaluation | string | null
) {
  const updateData: Record<string, Evaluation | string | null> = {}
  updateData[field] = value

  await prisma.seeItSection.update({
    where: { auditId },
    data: updateData,
  })
}

// ==================== UPDATE FIND IT SECTION ====================

export async function updateFindItSection(
  auditId: string,
  field: string,
  value: Evaluation | string | null
) {
  const updateData: Record<string, Evaluation | string | null> = {}
  updateData[field] = value

  await prisma.findItSection.update({
    where: { auditId },
    data: updateData,
  })
}

// ==================== UPDATE CHOOSE IT SECTION ====================

export async function updateChooseItSection(
  auditId: string,
  field: string,
  value: Evaluation | string | null
) {
  const updateData: Record<string, Evaluation | string | null> = {}
  updateData[field] = value

  await prisma.chooseItSection.update({
    where: { auditId },
    data: updateData,
  })
}

// ==================== UPDATE BUY IT SECTION ====================

export async function updateBuyItSection(
  auditId: string,
  field: string,
  value: Evaluation | string | null
) {
  const updateData: Record<string, Evaluation | string | null> = {}
  updateData[field] = value

  await prisma.buyItSection.update({
    where: { auditId },
    data: updateData,
  })
}

// ==================== UPDATE GOLDEN RULES ====================

export async function updateGoldenRules(
  auditId: string,
  field: string,
  value: boolean
) {
  const updateData: Record<string, boolean> = {}
  updateData[field] = value

  await prisma.goldenRules.update({
    where: { auditId },
    data: updateData,
  })
}

// ==================== UPDATE EXPERTISE ====================

export async function updateExpertise(
  id: string,
  data: {
    barriers?: Barrier[]
    mainObservation?: string
    pharmacistHelped?: boolean
  }
) {
  await prisma.audit.update({
    where: { id },
    data,
  })
}

// ==================== COMPLETE AUDIT ====================

export async function completeAudit(id: string) {
  await prisma.audit.update({
    where: { id },
    data: { status: 'COMPLETED' },
  })
  revalidatePath('/')
  revalidatePath(`/audit/${id}`)
}

// ==================== DELETE AUDIT ====================

export async function deleteAudit(id: string) {
  await prisma.audit.delete({
    where: { id },
  })
  revalidatePath('/')
}
