-- CreateTable
CREATE TABLE "PdfHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "extractedText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PdfHistory_pkey" PRIMARY KEY ("id")
);
