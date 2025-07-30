-- CreateTable
CREATE TABLE "public"."M_Currency" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,

    CONSTRAINT "M_Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."M_Timezone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "offset" TEXT,

    CONSTRAINT "M_Timezone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."M_CheckItem" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "M_CheckItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."M_Activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "M_Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."M_Locale" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "M_Locale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nickname" TEXT,
    "localeId" TEXT,
    "currencyId" TEXT,
    "timezoneId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "purpose" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "currencyId" TEXT,
    "timezoneId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Day" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Itinerary" (
    "id" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3),
    "location" TEXT,
    "memo" TEXT,
    "activityId" TEXT,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Checklist" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChecklistItem" (
    "id" TEXT NOT NULL,
    "checklistId" TEXT NOT NULL,
    "checkitemId" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M_Currency_code_key" ON "public"."M_Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M_Timezone_name_key" ON "public"."M_Timezone"("name");

-- CreateIndex
CREATE UNIQUE INDEX "M_Activity_name_key" ON "public"."M_Activity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "M_Locale_code_key" ON "public"."M_Locale"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "public"."Profile"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_localeId_fkey" FOREIGN KEY ("localeId") REFERENCES "public"."M_Locale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."M_Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_timezoneId_fkey" FOREIGN KEY ("timezoneId") REFERENCES "public"."M_Timezone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."M_Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_timezoneId_fkey" FOREIGN KEY ("timezoneId") REFERENCES "public"."M_Timezone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Day" ADD CONSTRAINT "Day_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Itinerary" ADD CONSTRAINT "Itinerary_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "public"."Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Itinerary" ADD CONSTRAINT "Itinerary_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."M_Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Checklist" ADD CONSTRAINT "Checklist_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChecklistItem" ADD CONSTRAINT "ChecklistItem_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "public"."Checklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChecklistItem" ADD CONSTRAINT "ChecklistItem_checkitemId_fkey" FOREIGN KEY ("checkitemId") REFERENCES "public"."M_CheckItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
