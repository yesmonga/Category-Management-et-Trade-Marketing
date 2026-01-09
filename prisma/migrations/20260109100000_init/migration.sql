-- CreateEnum
CREATE TYPE "AuditStatus" AS ENUM ('DRAFT', 'COMPLETED');

-- CreateEnum
CREATE TYPE "StoreType" AS ENUM ('PHARMACIE', 'GMS');

-- CreateEnum
CREATE TYPE "WeatherType" AS ENUM ('CALME', 'AFFLUENTE', 'SATUREE');

-- CreateEnum
CREATE TYPE "Evaluation" AS ENUM ('OUI', 'NON', 'PARTIEL');

-- CreateEnum
CREATE TYPE "Barrier" AS ENUM ('AWARENESS', 'COMPREHENSION', 'PERTINENCE', 'VALEUR_PERCUE', 'USAGE');

-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL,
    "status" "AuditStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "auditorName" TEXT,
    "storeName" TEXT,
    "storeType" "StoreType",
    "categoryAnalyzed" TEXT,
    "weather" "WeatherType",
    "barriers" "Barrier"[],
    "mainObservation" TEXT,
    "pharmacistHelped" BOOLEAN,
    "pdfUrl" TEXT,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeeItSection" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "visibilityEval" "Evaluation",
    "visibilityComment" TEXT,
    "visibilityPhoto" TEXT,
    "visualBreakEval" "Evaluation",
    "visualBreakComment" TEXT,
    "visualBreakPhoto" TEXT,
    "curvesEval" "Evaluation",
    "curvesComment" TEXT,
    "curvesPhoto" TEXT,
    "movementEval" "Evaluation",
    "movementComment" TEXT,
    "movementPhoto" TEXT,
    "visualHierarchyEval" "Evaluation",
    "visualHierarchyComment" TEXT,
    "visualHierarchyPhoto" TEXT,

    CONSTRAINT "SeeItSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindItSection" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "brandingEval" "Evaluation",
    "brandingComment" TEXT,
    "brandingPhoto" TEXT,
    "segmentationEval" "Evaluation",
    "segmentationComment" TEXT,
    "segmentationPhoto" TEXT,
    "heroProductsEval" "Evaluation",
    "heroProductsComment" TEXT,
    "heroProductsPhoto" TEXT,
    "taxonomyEval" "Evaluation",
    "taxonomyComment" TEXT,
    "taxonomyPhoto" TEXT,

    CONSTRAINT "FindItSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChooseItSection" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "neuroEfficiencyEval" "Evaluation",
    "neuroEfficiencyComment" TEXT,
    "neuroEfficiencyPhoto" TEXT,
    "simplicityEval" "Evaluation",
    "simplicityComment" TEXT,
    "simplicityPhoto" TEXT,
    "concisenessEval" "Evaluation",
    "concisenessComment" TEXT,
    "concisenessPhoto" TEXT,
    "choiceHelpEval" "Evaluation",
    "choiceHelpComment" TEXT,
    "choiceHelpPhoto" TEXT,
    "readingHierarchyEval" "Evaluation",
    "readingHierarchyComment" TEXT,
    "readingHierarchyPhoto" TEXT,

    CONSTRAINT "ChooseItSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyItSection" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "ctaEval" "Evaluation",
    "ctaComment" TEXT,
    "ctaPhoto" TEXT,
    "visibleBenefitEval" "Evaluation",
    "visibleBenefitComment" TEXT,
    "visibleBenefitPhoto" TEXT,
    "hotZoneEval" "Evaluation",
    "hotZoneComment" TEXT,
    "hotZonePhoto" TEXT,
    "availabilityEval" "Evaluation",
    "availabilityComment" TEXT,
    "availabilityPhoto" TEXT,
    "priceEval" "Evaluation",
    "priceComment" TEXT,
    "pricePhoto" TEXT,

    CONSTRAINT "BuyItSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoldenRules" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "visualHierarchy" BOOLEAN NOT NULL DEFAULT false,
    "simplicity" BOOLEAN NOT NULL DEFAULT false,
    "writeRight" BOOLEAN NOT NULL DEFAULT false,
    "productHighlight" BOOLEAN NOT NULL DEFAULT false,
    "curves" BOOLEAN NOT NULL DEFAULT false,
    "movement" BOOLEAN NOT NULL DEFAULT false,
    "productInContext" BOOLEAN NOT NULL DEFAULT false,
    "shortMessage" BOOLEAN NOT NULL DEFAULT false,
    "effectiveCta" BOOLEAN NOT NULL DEFAULT false,
    "humanFaces" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GoldenRules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Audit_status_idx" ON "Audit"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SeeItSection_auditId_key" ON "SeeItSection"("auditId");

-- CreateIndex
CREATE UNIQUE INDEX "FindItSection_auditId_key" ON "FindItSection"("auditId");

-- CreateIndex
CREATE UNIQUE INDEX "ChooseItSection_auditId_key" ON "ChooseItSection"("auditId");

-- CreateIndex
CREATE UNIQUE INDEX "BuyItSection_auditId_key" ON "BuyItSection"("auditId");

-- CreateIndex
CREATE UNIQUE INDEX "GoldenRules_auditId_key" ON "GoldenRules"("auditId");

-- AddForeignKey
ALTER TABLE "SeeItSection" ADD CONSTRAINT "SeeItSection_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FindItSection" ADD CONSTRAINT "FindItSection_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChooseItSection" ADD CONSTRAINT "ChooseItSection_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyItSection" ADD CONSTRAINT "BuyItSection_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoldenRules" ADD CONSTRAINT "GoldenRules_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
