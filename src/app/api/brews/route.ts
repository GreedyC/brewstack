import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { brewLogSchema } from "@/lib/validations";

export async function GET() {
  const brews = await prisma.brewLog.findMany({
    orderBy: { createdAt: "desc" },
    include: { bean: true }
  });
  return NextResponse.json(brews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = brewLogSchema.safeParse({
      ...body,
      doseGrams: Number(body.doseGrams),
      yieldMl: Number(body.yieldMl),
      waterTempC: Number(body.waterTempC),
      brewTimeMin: Number(body.brewTimeMin),
      brewTimeSec: Number(body.brewTimeSec),
      rating: Number(body.rating)
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation error", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const brew = await prisma.brewLog.create({
      data: parsed.data
    });

    return NextResponse.json(brew, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
